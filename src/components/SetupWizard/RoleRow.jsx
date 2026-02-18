import { useGame } from '../../context/GameContext';

export default function RoleRow({ role }) {
  const { dispatch } = useGame();

  return (
    <div className="role-row">
      <span className="role-name">{role.name}</span>
      <div className="role-controls">
        <button
          className="stepper-btn small"
          onClick={() =>
            dispatch({
              type: 'SET_ROLE_COUNT',
              payload: { roleId: role.id, count: role.count - 1 },
            })
          }
          disabled={role.count <= 0}
        >
          -
        </button>
        <span className="role-count">{role.count}</span>
        <button
          className="stepper-btn small"
          onClick={() =>
            dispatch({
              type: 'SET_ROLE_COUNT',
              payload: { roleId: role.id, count: role.count + 1 },
            })
          }
        >
          +
        </button>
        {!role.isPreset && (
          <button
            className="remove-btn"
            onClick={() => dispatch({ type: 'REMOVE_ROLE', payload: role.id })}
            title="移除"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
