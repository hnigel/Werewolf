import { GameProvider, useGame } from './context/GameContext';
import SetupWizard from './components/SetupWizard/SetupWizard';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function AppContent() {
  const { state } = useGame();

  return (
    <div className="app">
      {state.phase === 'setup' ? <SetupWizard /> : <GameBoard />}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
