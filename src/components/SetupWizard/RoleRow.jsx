import { useGame } from '../../context/GameContext';
import RoleIcon from '../GameBoard/RoleIcons';

export default function RoleRow({ role }) {
  const { dispatch } = useGame();

  return (
    <div className="role-row">
      <span className="role-name">
        <RoleIcon roleId={role.id} size={18} />
        {role.name}
      </span>
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
          aria-label={`減少 ${role.name}`}
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
          aria-label={`增加 ${role.name}`}
        >
          +
        </button>
        {!role.isPreset && (
          <button
            className="remove-btn"
            onClick={() => dispatch({ type: 'REMOVE_ROLE', payload: role.id })}
            aria-label={`移除 ${role.name}`}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
