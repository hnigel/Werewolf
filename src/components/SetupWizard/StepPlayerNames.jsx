import { useGame } from '../../context/GameContext';

export default function StepPlayerNames() {
  const { state, dispatch } = useGame();

  const changeCount = (delta, removeIndex) => {
    const newCount = state.playerCount + delta;
    if (newCount < 4) return;
    dispatch({ type: 'SET_PLAYER_COUNT', payload: newCount });
    if (delta < 0 && removeIndex !== undefined) {
      dispatch({ type: 'REMOVE_PLAYER', payload: removeIndex });
    } else {
      dispatch({ type: 'INIT_PLAYERS' });
    }
  };

  return (
    <div className="step">
      <img src="/hero.webp" alt="狼人殺" className="hero-img" />
      <h1 className="app-title">狼人殺記憶助手</h1>
      <p className="app-desc">
        追蹤每位玩家的角色與存活狀態，讓你專心推理、不再忘記誰是誰。
      </p>
      <h2>輸入玩家名字</h2>
      <div className="stepper compact">
        <button
          className="stepper-btn small"
          onClick={() => changeCount(-1)}
          disabled={state.playerCount <= 4}
        >
          -
        </button>
        <span className="stepper-value small-value">{state.playerCount} 人</span>
        <button
          className="stepper-btn small"
          onClick={() => changeCount(1)}
        >
          +
        </button>
      </div>
      <div className="name-list">
        {state.players.map((player, i) => (
          <div key={player.id} className="name-row">
            <label>{i + 1}.</label>
            <input
              type="text"
              value={player.name}
              onFocus={(e) => e.target.select()}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PLAYER_NAME',
                  payload: { id: player.id, name: e.target.value },
                })
              }
              placeholder={`玩家 ${i + 1}`}
            />
            {state.players.length > 4 && (
              <button
                className="remove-player-btn"
                onClick={() => changeCount(-1, i)}
                title="移除"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button className="add-player-btn" onClick={() => changeCount(1)}>
          + 新增玩家
        </button>
      </div>
    </div>
  );
}
