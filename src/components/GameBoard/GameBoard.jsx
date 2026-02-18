import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import { WITCH_ROLE_ID } from '../../constants/defaultRoles';
import RoleZone from './RoleZone';
import { PlayerCardOverlay } from './PlayerCard';
import './GameBoard.css';

// REACT-5: Hoist static object to module scope
const CONFIRM_MESSAGES = {
  newRound: '確定要再來一局嗎？所有玩家將回到平民區域並復活。',
  reset: '確定要重新設定嗎？將回到設定畫面（保留玩家名字與角色配置）。',
};

export default function GameBoard() {
  const { state, dispatch } = useGame();
  const [activeId, setActiveId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // DND-1: Add TouchSensor alongside PointerSensor
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const activeRoles = state.roles.filter((r) => r.count > 0);

  // REACT-6: Pre-compute playersByZone map
  const playersByZone = useMemo(() => {
    const map = {};
    for (const p of state.players) {
      if (!map[p.zoneId]) map[p.zoneId] = [];
      map[p.zoneId].push(p);
    }
    return map;
  }, [state.players]);

  const activePlayer = activeId
    ? state.players.find((p) => p.id === activeId)
    : null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const playerId = active.id;
    const toZoneId = over.id;
    const player = state.players.find((p) => p.id === playerId);
    if (player && player.zoneId !== toZoneId) {
      dispatch({ type: 'MOVE_PLAYER', payload: { playerId, toZoneId } });
    }
  };

  // DND-3: Handle drag cancel to clear overlay
  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleConfirm = () => {
    if (confirmAction === 'newRound') {
      dispatch({ type: 'NEW_ROUND' });
    } else if (confirmAction === 'reset') {
      dispatch({ type: 'RESET_GAME_KEEP_SETTINGS' });
    }
    setConfirmAction(null);
  };

  return (
    <div className="game-board">
      <div className="board-header">
        <h1>狼人殺記憶助手</h1>
        <div className="header-actions">
          <button
            className="btn-new-round"
            onClick={() => setConfirmAction('newRound')}
          >
            再來一局
          </button>
          <button
            className="btn-reset"
            onClick={() => setConfirmAction('reset')}
          >
            重新設定
          </button>
        </div>
      </div>

      {confirmAction && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>{CONFIRM_MESSAGES[confirmAction]}</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setConfirmAction(null)}>
                取消
              </button>
              <button className="btn-danger" onClick={handleConfirm}>
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="zones-container">
          {activeRoles.map((role) => (
            <RoleZone
              key={role.id}
              zoneId={`zone-${role.id}`}
              label={role.name}
              capacity={role.count}
              players={playersByZone[`zone-${role.id}`] || []}
              {...(role.id === WITCH_ROLE_ID && {
                potions: state.witchPotions,
                onTogglePotion: (potion) =>
                  dispatch({ type: 'TOGGLE_WITCH_POTION', payload: potion }),
              })}
            />
          ))}

          <RoleZone
            zoneId="zone-civilian"
            label="平民"
            capacity={null}
            players={playersByZone['zone-civilian'] || []}
          />
        </div>

        <DragOverlay>
          {activePlayer ? (
            <PlayerCardOverlay player={activePlayer} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
