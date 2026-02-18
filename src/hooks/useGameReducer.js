import { defaultRoles, NEXT_ROLE_ID_START } from '../constants/defaultRoles';

const STORAGE_KEY = 'werewolf-game-state';

function makePlayers(count) {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push({
      id: `player-${i + 1}`,
      name: `玩家 ${i + 1}`,
      isDead: false,
      zoneId: 'zone-civilian',
    });
  }
  return players;
}

export const initialState = {
  phase: 'setup',
  setupStep: 1,
  playerCount: 6,
  players: makePlayers(6),
  roles: defaultRoles.map((r) => ({ ...r })),
  nextRoleId: NEXT_ROLE_ID_START,
};

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.phase) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function getTotalRoleCount(roles) {
  return roles.reduce((sum, r) => sum + r.count, 0);
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_COUNT': {
      const count = Math.max(4, action.payload);
      return { ...state, playerCount: count };
    }

    case 'SET_SETUP_STEP':
      return { ...state, setupStep: action.payload };

    case 'INIT_PLAYERS': {
      const players = [];
      for (let i = 0; i < state.playerCount; i++) {
        players.push({
          id: `player-${i + 1}`,
          name: state.players[i]?.name || `玩家 ${i + 1}`,
          isDead: false,
          zoneId: 'zone-civilian',
        });
      }
      return { ...state, players };
    }

    case 'REMOVE_PLAYER': {
      const index = action.payload;
      const players = state.players
        .filter((_, i) => i !== index)
        .map((p, i) => ({ ...p, id: `player-${i + 1}` }));
      return { ...state, players };
    }

    case 'SET_PLAYER_NAME': {
      const players = state.players.map((p) =>
        p.id === action.payload.id ? { ...p, name: action.payload.name } : p
      );
      return { ...state, players };
    }

    case 'SET_ROLE_COUNT': {
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
      const name = action.payload.trim();
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

    case 'REMOVE_ROLE': {
      return {
        ...state,
        roles: state.roles.filter((r) => r.id !== action.payload),
      };
    }

    case 'START_GAME': {
      const players = state.players.map((p) => ({
        ...p,
        isDead: false,
        zoneId: 'zone-civilian',
      }));
      return { ...state, phase: 'playing', players };
    }

    case 'MOVE_PLAYER': {
      const { playerId, toZoneId } = action.payload;
      // Check capacity for non-civilian zones
      if (toZoneId !== 'zone-civilian') {
        const roleId = Number(toZoneId.replace('zone-', ''));
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
      return { ...state, players };
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
