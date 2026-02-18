import { useDraggable } from '@dnd-kit/core';
import { useGameState, useGameDispatch } from '../../context/GameContext';
import { AntidoteIcon, PoisonIcon } from './PotionIcons';

function DraggablePotion({ potion, available, label }) {
  const dispatch = useGameDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `potion-${potion}`,
    disabled: !available,
    data: { type: 'potion', potion },
  });

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_WITCH_POTION', payload: potion });
  };

  const Icon = potion === 'antidote' ? AntidoteIcon : PoisonIcon;

  return (
    <button
      ref={setNodeRef}
      className={`potion-btn ${potion} ${!available ? 'used' : ''}`}
      style={isDragging ? { opacity: 0.3 } : undefined}
      onClick={handleClick}
      onPointerDown={(e) => {
        // Let dnd-kit handle pointer events when available
        if (available && listeners?.onPointerDown) {
          listeners.onPointerDown(e);
        }
      }}
      {...(available ? attributes : {})}
    >
      <Icon size={24} />
      <span>{available ? label : '已使用'}</span>
    </button>
  );
}

export default function WitchPotions() {
  const state = useGameState();

  return (
    <div className="witch-potions">
      <DraggablePotion
        potion="antidote"
        available={state.witchPotions.antidote}
        label="解藥"
      />
      <DraggablePotion
        potion="poison"
        available={state.witchPotions.poison}
        label="毒藥"
      />
    </div>
  );
}

export function PotionOverlay({ potion }) {
  const Icon = potion === 'antidote' ? AntidoteIcon : PoisonIcon;
  const label = potion === 'antidote' ? '解藥' : '毒藥';

  return (
    <div className={`potion-btn ${potion} potion-overlay`}>
      <Icon size={24} />
      <span>{label}</span>
    </div>
  );
}
