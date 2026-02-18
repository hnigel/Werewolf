import { useDroppable } from '@dnd-kit/core';
import PlayerCard from './PlayerCard';

export default function RoleZone({ zoneId, label, capacity, players }) {
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
      <div className="zone-players">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </div>
  );
}
