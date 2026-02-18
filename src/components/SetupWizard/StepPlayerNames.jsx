import { useGame } from '../../context/GameContext';

export default function StepPlayerNames() {
  const { state, dispatch } = useGame();


  const addPlayer = () => {
    dispatch({ type: 'SET_PLAYER_COUNT', payload: state.playerCount + 1 });
  };

  const removePlayer = (index) => {
    dispatch({ type: 'REMOVE_PLAYER', payload: index });
  };

  const decrementCount = () => {
    if (state.playerCount <= 4) return;
    dispatch({ type: 'SET_PLAYER_COUNT', payload: state.playerCount - 1 });
  };

  return (
    <div className="step">
      <img src="/hero.webp" alt="狼人殺" className="hero-img" width="800" height="436" fetchPriority="high" />
      <h1 className="app-title">狼人殺記憶助手</h1>
      <p className="app-desc">
        追蹤每位玩家的角色與存活狀態，讓你專心推理、不再忘記誰是誰。
      </p>
      <h2>輸入玩家名字</h2>
      <div className="stepper compact">
        <button
          className="stepper-btn small"
          onClick={decrementCount}
          disabled={state.playerCount <= 4}
          aria-label="減少玩家"
        >
          -
        </button>
        <span className="stepper-value small-value">{state.playerCount} 人</span>
        <button
          className="stepper-btn small"
          onClick={addPlayer}
          aria-label="增加玩家"
        >
          +
        </button>
      </div>
      <div className="name-list">
        {state.players.map((player, i) => (
          <div key={player.id} className="name-row">
            <label htmlFor={`name-${player.id}`}>{i + 1}.</label>
            <input
              id={`name-${player.id}`}
              type="text"
              value={player.name}
              maxLength={30}
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
                onClick={() => removePlayer(i)}
                aria-label={`移除 ${player.name}`}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <div className="add-player-row">
          <span className="add-spacer" />
          <button className="add-player-btn" onClick={addPlayer}>
            + 新增玩家
          </button>
          {state.players.length > 4 && <span className="add-spacer-end" />}
        </div>
      </div>
    </div>
  );
}
