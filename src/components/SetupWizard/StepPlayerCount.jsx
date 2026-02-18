import { useGame } from '../../context/GameContext';

export default function StepPlayerCount() {
  const { state, dispatch } = useGame();

  return (
    <div className="step">
      <h2>設定玩家人數</h2>
      <div className="stepper">
        <button
          className="stepper-btn"
          onClick={() =>
            dispatch({ type: 'SET_PLAYER_COUNT', payload: state.playerCount - 1 })
          }
          disabled={state.playerCount <= 4}
        >
          -
        </button>
        <span className="stepper-value">{state.playerCount}</span>
        <button
          className="stepper-btn"
          onClick={() =>
            dispatch({ type: 'SET_PLAYER_COUNT', payload: state.playerCount + 1 })
          }
        >
          +
        </button>
      </div>
      <p className="hint">最少 4 人</p>
    </div>
  );
}
