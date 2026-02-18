import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { gameReducer, initialState, loadState, saveState } from '../hooks/useGameReducer';

const GameStateContext = createContext(null);
const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, () => {
    return loadState() || { ...initialState };
  });

  // Debounce localStorage saves (200ms)
  const saveTimer = useRef(null);
  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(state), 200);
    return () => clearTimeout(saveTimer.current);
  }, [state]);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const state = useContext(GameStateContext);
  if (state === null) throw new Error('useGameState must be used within GameProvider');
  return state;
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);
  if (dispatch === null) throw new Error('useGameDispatch must be used within GameProvider');
  return dispatch;
}

// Convenience hook for components that need both
export function useGame() {
  return { state: useGameState(), dispatch: useGameDispatch() };
}
