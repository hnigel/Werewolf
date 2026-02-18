import { defaultRoles, NEXT_ROLE_ID_START, WITCH_ROLE_ID } from '../constants/defaultRoles';

const STORAGE_KEY = 'werewolf-game-state';
const MAX_PLAYER_COUNT = 30;
const MAX_NAME_LENGTH = 30;

function makeId() {
  return crypto.randomUUID();
}

function makePlayers(count, existingPlayers) {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push({
      id: existingPlayers?.[i]?.id || makeId(),
      name: existingPlayers?.[i]?.name || `玩家 ${i + 1}`,
      isDead: false,
      zoneId: 'zone-civilian',
    });
  }
  return players;
}

const INITIAL_POTIONS = { antidote: true, poison: true };

export const initialState = {
  phase: 'setup',
  setupStep: 1,
  playerCount: 6,
  players: makePlayers(6),
  roles: defaultRoles.map((r) => ({ ...r })),
  nextRoleId: NEXT_ROLE_ID_START,
  witchPotions: { ...INITIAL_POTIONS },
};

// SEC-1 / QUALITY-3: Full schema validation on localStorage load
function validateState(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  if (parsed.phase !== 'setup' && parsed.phase !== 'playing') return null;

  const setupStep = parsed.setupStep;
  if (!Number.isInteger(setupStep) || setupStep < 1 || setupStep > 2) return null;

  const playerCount = parsed.playerCount;
  if (!Number.isInteger(playerCount) || playerCount < 4 || playerCount > MAX_PLAYER_COUNT) return null;

  if (!Array.isArray(parsed.players)) return null;
  for (const p of parsed.players) {
    if (!p || typeof p !== 'object') return null;
    if (typeof p.id !== 'string' || typeof p.name !== 'string') return null;
    if (typeof p.isDead !== 'boolean' || typeof p.zoneId !== 'string') return null;
  }

  if (!Array.isArray(parsed.roles)) return null;
  for (const r of parsed.roles) {
    if (!r || typeof r !== 'object') return null;
    if (!Number.isFinite(r.id) || typeof r.name !== 'string') return null;
    if (!Number.isInteger(r.count) || r.count < 0) return null;
    if (typeof r.isPreset !== 'boolean') return null;
  }

  const nextRoleId = parsed.nextRoleId;
  if (!Number.isInteger(nextRoleId) || nextRoleId < NEXT_ROLE_ID_START) return null;

  if (parsed.witchPotions != null) {
    const wp = parsed.witchPotions;
    if (typeof wp !== 'object' || typeof wp.antidote !== 'boolean' || typeof wp.poison !== 'boolean') return null;
  } else {
    parsed.witchPotions = { ...INITIAL_POTIONS };
  }

  return parsed;
}

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return validateState(parsed);
    }
  } catch {
    // corrupt data
  }
  return null;
}

// QUALITY-4: Warn on save errors in development
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }
}

function getTotalRoleCount(roles) {
  return roles.reduce((sum, r) => sum + r.count, 0);
}

export function gameReducer(state, action) {
  switch (action.type) {
    // REACT-2/3: Atomic action that sets count and syncs players array
    case 'SET_PLAYER_COUNT': {
      const count = Math.min(MAX_PLAYER_COUNT, Math.max(4, action.payload));
      const players = makePlayers(count, state.players);
      return { ...state, playerCount: count, players };
    }

    // QUALITY-5: Clamp setupStep to valid range
    case 'SET_SETUP_STEP': {
      const step = Math.max(1, Math.min(2, action.payload));
      return { ...state, setupStep: step };
    }

    case 'REMOVE_PLAYER': {
      const index = action.payload;
      if (index < 0 || index >= state.players.length) return state;
      const players = state.players.filter((_, i) => i !== index);
      const playerCount = players.length;
      return { ...state, players, playerCount };
    }

    case 'SET_PLAYER_NAME': {
      // SEC-3: Enforce max name length
      const name = String(action.payload.name).slice(0, MAX_NAME_LENGTH);
      const players = state.players.map((p) =>
        p.id === action.payload.id ? { ...p, name } : p
      );
      return { ...state, players };
    }

    case 'SET_ROLE_COUNT': {
      if (state.phase !== 'setup') return state;
      const { roleId, count } = action.payload;
      const newCount = Math.max(0, count);
      const roles = state.roles.map((r) =>
        r.id === roleId ? { ...r, count: newCount } : r
      );
      const total = getTotalRoleCount(roles);
      if (total > state.playerCount) return state;
      return { ...state, roles };
    }

    case 'ADD_CUSTOM_ROLE': {
      // SEC-3: Enforce max name length
      const name = String(action.payload).trim().slice(0, MAX_NAME_LENGTH);
      if (!name) return state;
      const newRole = {
        id: state.nextRoleId,
        name,
        count: 0,
        isPreset: false,
      };
      return {
        ...state,
        roles: [...state.roles, newRole],
        nextRoleId: state.nextRoleId + 1,
      };
    }

    // STATE-3: Clear orphaned player zoneIds when removing a role
    case 'REMOVE_ROLE': {
      const removedZoneId = `zone-${action.payload}`;
      return {
        ...state,
        roles: state.roles.filter((r) => r.id !== action.payload),
        players: state.players.map((p) =>
          p.zoneId === removedZoneId ? { ...p, zoneId: 'zone-civilian' } : p
        ),
      };
    }

    case 'START_GAME': {
      const players = state.players.map((p) => ({
        ...p,
        isDead: false,
        zoneId: 'zone-civilian',
      }));
      return { ...state, phase: 'playing', players, witchPotions: { ...INITIAL_POTIONS } };
    }

    case 'MOVE_PLAYER': {
      const { playerId, toZoneId } = action.payload;
      // STATE-2: Validate roleId parse result
      if (toZoneId !== 'zone-civilian') {
        const roleId = Number(toZoneId.replace('zone-', ''));
        if (!Number.isFinite(roleId)) return state;
        const role = state.roles.find((r) => r.id === roleId);
        if (role) {
          const currentInZone = state.players.filter(
            (p) => p.zoneId === toZoneId && p.id !== playerId
          ).length;
          if (currentInZone >= role.count) return state;
        }
      }
      const players = state.players.map((p) =>
        p.id === playerId ? { ...p, zoneId: toZoneId } : p
      );
      return { ...state, players };
    }

    case 'TOGGLE_DEAD': {
      const players = state.players.map((p) =>
        p.id === action.payload ? { ...p, isDead: !p.isDead } : p
      );
      return { ...state, players };
    }

    case 'NEW_ROUND': {
      const players = state.players.map((p) => ({
        ...p,
        isDead: false,
        zoneId: 'zone-civilian',
      }));
      return { ...state, players, witchPotions: { ...INITIAL_POTIONS } };
    }

    case 'TOGGLE_WITCH_POTION': {
      const potion = action.payload;
      if (potion !== 'antidote' && potion !== 'poison') return state;
      return {
        ...state,
        witchPotions: {
          ...state.witchPotions,
          [potion]: !state.witchPotions[potion],
        },
      };
    }

    case 'RESET_GAME_KEEP_SETTINGS':
      return {
        ...state,
        phase: 'setup',
        setupStep: 1,
        players: state.players.map((p) => ({
          ...p,
          isDead: false,
          zoneId: 'zone-civilian',
        })),
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        players: makePlayers(initialState.playerCount),
        roles: defaultRoles.map((r) => ({ ...r })),
      };

    default:
      return state;
  }
}
