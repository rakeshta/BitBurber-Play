import { React } from '/ui/lib/react';
import { storage } from '/ui/lib/storage';
import { TabId } from '/ui/models/types/TabId';

const STORAGE_KEY = 'selectedTab';

export type SelectedTabState = TabId;

export interface SelectedTabAction {
  action: 'set';
  id: TabId;
}

function reducer(state: SelectedTabState, action: SelectedTabAction): SelectedTabState {
  switch (action.action) {
    case 'set':
      storage.set(STORAGE_KEY, action.id);
      return action.id;
  }
}

export function useSelectedTab(): [SelectedTabState, React.Dispatch<SelectedTabAction>] {
  return React.useReducer(reducer, storage.get(STORAGE_KEY, TabId.Hack));
}
