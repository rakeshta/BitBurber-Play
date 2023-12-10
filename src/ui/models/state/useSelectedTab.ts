import { React } from '/ui/lib/react';
import { TabId } from '/ui/models/types/TabId';

export type SelectedTabState = TabId;

export interface SelectedTabAction {
  action: 'set';
  id: TabId;
}

function reducer(state: SelectedTabState, action: SelectedTabAction): SelectedTabState {
  switch (action.action) {
    case 'set':
      return action.id;
  }
}

export function useSelectedTab(): [SelectedTabState, React.Dispatch<SelectedTabAction>] {
  return React.useReducer(reducer, TabId.Hack);
}
