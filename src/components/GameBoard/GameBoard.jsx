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
import WitchPotions, { PotionOverlay } from './WitchPotions';
import './GameBoard.css';

// REACT-5: Hoist static object to module scope
const CONFIRM_MESSAGES = {
  newRound: '確定要再來一局嗎？所有玩家將回到平民區域並復活。',
  reset: '確定要重新設定嗎？將回到設定畫面（保留玩家名字與角色配置）。',
};

export default function GameBoard() {
  const { state, dispatch } = useGame();
  const [activeDrag, setActiveDrag] = useState(null); // { id, type }
  const [confirmAction, setConfirmAction] = useState(null);

  // DND-1: Add TouchSensor alongside PointerSensor
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const activeRoles = state.roles.filter((r) => r.count > 0);
  const hasWitch = activeRoles.some((r) => r.id === WITCH_ROLE_ID);

  // REACT-6: Pre-compute playersByZone map
  const playersByZone = useMemo(() => {
    const map = {};
    for (const p of state.players) {
      if (!map[p.zoneId]) map[p.zoneId] = [];
      map[p.zoneId].push(p);
    }
    return map;
  }, [state.players]);

  const activePlayer = activeDrag?.type === 'player'
    ? state.players.find((p) => p.id === activeDrag.id)
    : null;

  const handleDragStart = (event) => {
    const dragType = event.active.data.current?.type || 'player';
    setActiveDrag({ id: event.active.id, type: dragType });
  };

  const handleDragEnd = (event) => {
    const dragType = activeDrag?.type;
    setActiveDrag(null);
    const { active, over } = event;
    if (!over) return;

    if (dragType === 'potion') {
      // Potion dropped on a player target
      const overData = over.data.current;
      if (overData?.type === 'playerTarget') {
        const potion = active.data.current?.potion;
        dispatch({ type: 'APPLY_POTION', payload: { potion, playerId: overData.playerId } });
      }
    } else {
      // Player dropped on a zone
      const playerId = active.id;
      const toZoneId = over.id;
      const player = state.players.find((p) => p.id === playerId);
      if (player && player.zoneId !== toZoneId) {
        dispatch({ type: 'MOVE_PLAYER', payload: { playerId, toZoneId } });
      }
    }
  };

  // DND-3: Handle drag cancel to clear overlay
  const handleDragCancel = () => {
    setActiveDrag(null);
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
        {hasWitch && <WitchPotions />}

        <div className="zones-container">
          {activeRoles.map((role) => (
            <RoleZone
              key={role.id}
              zoneId={`zone-${role.id}`}
              label={role.name}
              capacity={role.count}
              players={playersByZone[`zone-${role.id}`] || []}
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
          {activeDrag?.type === 'potion' ? (
            <PotionOverlay potion={activeDrag.id.replace('potion-', '')} />
          ) : activePlayer ? (
            <PlayerCardOverlay player={activePlayer} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
