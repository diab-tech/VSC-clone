import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';

// List of actions to block
const BLOCKED_ACTIONS = [''];

export const actionInterceptor = (store: { getState: () => RootState }) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  
  console.log("قبل");
  if (BLOCKED_ACTIONS.includes(action.type)) {
    console.log(`Action ${action.type} is blocked`);
    return;
  }
  console.log("بعد");
  return next(action);
};
