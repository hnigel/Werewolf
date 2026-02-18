import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import RoleZone from './RoleZone';
import PlayerCard from './PlayerCard';
import './GameBoard.css';

export default function GameBoard() {
  const { state, dispatch } = useGame();
  const [activeId, setActiveId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeRoles = state.roles.filter((r) => r.count > 0);

  const getPlayersInZone = (zoneId) =>
    state.players.filter((p) => p.zoneId === zoneId);

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

  const handleConfirm = () => {
    if (confirmAction === 'newRound') {
      dispatch({ type: 'NEW_ROUND' });
    } else if (confirmAction === 'reset') {
      dispatch({ type: 'RESET_GAME_KEEP_SETTINGS' });
    }
    setConfirmAction(null);
  };

  const confirmMessages = {
    newRound: '確定要再來一局嗎？所有玩家將回到平民區域並復活。',
    reset: '確定要重新設定嗎？將回到設定畫面（保留玩家名字與角色配置）。',
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
            <p>{confirmMessages[confirmAction]}</p>
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
      >
        <div className="zones-container">
          {activeRoles.map((role) => (
            <RoleZone
              key={role.id}
              zoneId={`zone-${role.id}`}
              label={role.name}
              capacity={role.count}
              players={getPlayersInZone(`zone-${role.id}`)}
            />
          ))}

          <RoleZone
            zoneId="zone-civilian"
            label="平民"
            capacity={null}
            players={getPlayersInZone('zone-civilian')}
          />
        </div>

        <DragOverlay>
          {activePlayer ? (
            <PlayerCard player={activePlayer} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
