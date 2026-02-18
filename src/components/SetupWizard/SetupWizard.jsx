import { useGame } from '../../context/GameContext';
import StepPlayerNames from './StepPlayerNames';
import StepRoles from './StepRoles';
import './SetupWizard.css';

export default function SetupWizard() {
  const { state, dispatch } = useGame();
  const { setupStep } = state;

  const totalSpecial = state.roles.reduce((sum, r) => sum + r.count, 0);
  const civilianCount = state.playerCount - totalSpecial;

  const goNext = () => {
    if (setupStep === 1) {
      dispatch({ type: 'SET_SETUP_STEP', payload: 2 });
    } else if (setupStep === 2) {
      if (civilianCount < 0) return;
      dispatch({ type: 'START_GAME' });
    }
  };

  const goBack = () => {
    dispatch({ type: 'SET_SETUP_STEP', payload: setupStep - 1 });
  };

  return (
    <div className="setup-wizard">
      <div className="wizard-progress">
        {[1, 2].map((n) => (
          <div key={n} className={`progress-dot ${setupStep >= n ? 'active' : ''}`}>
            {n}
          </div>
        ))}
      </div>

      {setupStep === 1 && <StepPlayerNames />}
      {setupStep === 2 && <StepRoles />}

      <div className="wizard-actions">
        {setupStep > 1 && (
          <button className="btn-secondary" onClick={goBack}>
            上一步
          </button>
        )}
        <button
          className="btn-primary"
          onClick={goNext}
          disabled={setupStep === 2 && civilianCount < 0}
        >
          {setupStep === 2 ? '開始遊戲' : '下一步'}
        </button>
      </div>
    </div>
  );
}
