import { AnyAction, Dispatch } from '@reduxjs/toolkit';
// Removed unused import as part of build optimization
// import { RootState } from '../store';

// List of actions to block
const BLOCKED_ACTIONS = [''];

// Removed unused parameter as part of build optimization
export const actionInterceptor = (/* store: { getState: () => RootState } */) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  
  console.log("قبل");
  if (BLOCKED_ACTIONS.includes(action.type)) {
    console.log(`Action ${action.type} is blocked`);
    return;
  }
  console.log("بعد");
  return next(action);
};
