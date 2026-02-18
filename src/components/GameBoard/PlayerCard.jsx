import { useDraggable } from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import './PlayerCard.css';

// REACT-8: Pure view component for DragOverlay (no useDraggable)
function PlayerCardView({ player, onDeath }) {
  return (
    <div className={`player-card ${player.isDead ? 'dead' : ''}`}>
      <span className="player-name">{player.name}</span>
      {onDeath && (
        <button
          className="death-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onDeath}
          aria-label={player.isDead ? `復活 ${player.name}` : `標記 ${player.name} 死亡`}
          aria-pressed={player.isDead}
        >
          {player.isDead ? '💀' : '❤️'}
        </button>
      )}
    </div>
  );
}

export function PlayerCardOverlay({ player }) {
  return (
    <div className={`player-card overlay ${player.isDead ? 'dead' : ''}`}>
      <span className="player-name">{player.name}</span>
    </div>
  );
}

export default function PlayerCard({ player }) {
  const { dispatch } = useGame();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: player.id,
  });

  const handleDeath = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_DEAD', payload: player.id });
  };

  return (
    <div
      ref={setNodeRef}
      style={isDragging ? { opacity: 0.3 } : undefined}
      {...listeners}
      {...attributes}
    >
      <PlayerCardView player={player} onDeath={handleDeath} />
    </div>
  );
}
