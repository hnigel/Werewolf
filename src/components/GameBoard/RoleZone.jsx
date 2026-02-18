import { useDroppable } from '@dnd-kit/core';
import PlayerCard from './PlayerCard';

export default function RoleZone({ zoneId, label, capacity, players, potions, onTogglePotion }) {
  const { setNodeRef, isOver } = useDroppable({ id: zoneId });

  const currentCount = players.length;
  const isFull = capacity !== null && currentCount >= capacity;
  // DND-4: Only apply 'over' when not full, 'full-warning' when full
  const showOver = isOver && !isFull;
  const showWarning = isOver && isFull;

  return (
    <div
      ref={setNodeRef}
      className={`role-zone ${showOver ? 'over' : ''} ${showWarning ? 'full-warning' : ''}`}
    >
      <div className="zone-header">
        <span className="zone-label">{label}</span>
        {capacity !== null && (
          <span className={`zone-capacity ${isFull ? 'at-cap' : ''}`}>
            {currentCount}/{capacity}
          </span>
        )}
      </div>
      {potions && (
        <div className="witch-potions">
          <button
            className={`potion-btn antidote ${!potions.antidote ? 'used' : ''}`}
            onClick={() => onTogglePotion('antidote')}
          >
            解藥{potions.antidote ? '' : '（已使用）'}
          </button>
          <button
            className={`potion-btn poison ${!potions.poison ? 'used' : ''}`}
            onClick={() => onTogglePotion('poison')}
          >
            毒藥{potions.poison ? '' : '（已使用）'}
          </button>
        </div>
      )}
      <div className="zone-players">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </div>
  );
}
