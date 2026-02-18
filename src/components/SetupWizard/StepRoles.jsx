import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import RoleRow from './RoleRow';

export default function StepRoles() {
  const { state, dispatch } = useGame();
  const [customName, setCustomName] = useState('');

  const totalSpecial = state.roles.reduce((sum, r) => sum + r.count, 0);
  const civilianCount = state.playerCount - totalSpecial;

  const handleAddCustom = () => {
    if (customName.trim()) {
      dispatch({ type: 'ADD_CUSTOM_ROLE', payload: customName });
      setCustomName('');
    }
  };

  return (
    <div className="step">
      <h2>配置角色</h2>
      <div className="role-list">
        {state.roles.map((role) => (
          <RoleRow key={role.id} role={role} />
        ))}
      </div>

      <div className="add-custom">
        <input
          type="text"
          value={customName}
          maxLength={30}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="自訂角色名稱"
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
        />
        <button className="btn-secondary" onClick={handleAddCustom}>
          新增
        </button>
      </div>

      <div className="role-summary">
        <span>特殊角色: {totalSpecial}</span>
        <span>總人數: {state.playerCount}</span>
        <span className={civilianCount < 0 ? 'error' : ''}>
          平民: {civilianCount}
        </span>
      </div>
    </div>
  );
}
