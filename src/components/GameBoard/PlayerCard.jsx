import { useDraggable } from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import './PlayerCard.css';

export default function PlayerCard({ player, isOverlay }) {
  const { dispatch } = useGame();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: player.id,
  });

  const handleDeath = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_DEAD', payload: player.id });
  };

  const style = isDragging && !isOverlay ? { opacity: 0.3 } : undefined;

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      className={`player-card ${player.isDead ? 'dead' : ''} ${isOverlay ? 'overlay' : ''}`}
      style={style}
      {...(isOverlay ? {} : { ...listeners, ...attributes })}
    >
      <span className="player-name">{player.name}</span>
      <button
        className="death-btn"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={handleDeath}
        title={player.isDead ? '復活' : '死亡'}
      >
        {player.isDead ? '💀' : '❤️'}
      </button>
    </div>
  );
}
