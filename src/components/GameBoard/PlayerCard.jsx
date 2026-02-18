import { useCallback } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import { AntidoteIcon, PoisonIcon } from './PotionIcons';
import './PlayerCard.css';

function PotionIndicator({ potion, playerId }) {
  const { dispatch } = useGame();

  const handleRemove = (e) => {
    e.stopPropagation();
    // Toggle potion back to available (which also clears the target)
    dispatch({ type: 'TOGGLE_WITCH_POTION', payload: potion });
  };

  const Icon = potion === 'antidote' ? AntidoteIcon : PoisonIcon;
  const label = potion === 'antidote' ? '移除解藥' : '移除毒藥';

  return (
    <button
      className={`potion-indicator ${potion}`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={handleRemove}
      aria-label={label}
    >
      <Icon size={16} />
    </button>
  );
}

// REACT-8: Pure view component for DragOverlay (no useDraggable)
function PlayerCardView({ player, onDeath, potionEffects, isOver }) {
  return (
    <div className={`player-card ${player.isDead ? 'dead' : ''} ${isOver ? 'potion-target-over' : ''}`}>
      <span className="player-name">{player.name}</span>
      <div className="card-actions">
        {potionEffects?.map((potion) => (
          <PotionIndicator key={potion} potion={potion} playerId={player.id} />
        ))}
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
  const { state, dispatch } = useGame();
  const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({
    id: player.id,
    data: { type: 'player' },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `player-${player.id}`,
    data: { type: 'playerTarget', playerId: player.id },
  });

  // Merge drag + drop refs
  const setNodeRef = useCallback(
    (node) => {
      setDragRef(node);
      setDropRef(node);
    },
    [setDragRef, setDropRef]
  );

  const handleDeath = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_DEAD', payload: player.id });
  };

  // Compute potion effects on this player
  const potionEffects = [];
  if (state.witchPotionTargets.antidote === player.id) potionEffects.push('antidote');
  if (state.witchPotionTargets.poison === player.id) potionEffects.push('poison');

  return (
    <div
      ref={setNodeRef}
      style={isDragging ? { opacity: 0.3 } : undefined}
      {...listeners}
      {...attributes}
    >
      <PlayerCardView
        player={player}
        onDeath={handleDeath}
        potionEffects={potionEffects.length > 0 ? potionEffects : null}
        isOver={isOver}
      />
    </div>
  );
}
