import { HackTabContent } from '/ui/bit-app/tabs/hack/HackTabContent';
import { ToolsTabContent } from '/ui/bit-app/tabs/tools/ToolsTabContent';
import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';
import { useSelectedTab } from '/ui/models/state/useSelectedTab';
import { TabId } from '/ui/models/types/TabId';
import { TabBar, TabItem } from '/ui/widgets/TabBar';

// config --------------------------------------------------------------------------------------------------------------

interface TabItemEx extends TabItem<TabId> {
  component: React.ComponentType<{ className?: string }>;
}

const TAB_ITEMS: TabItemEx[] = [
  { id: TabId.Hack, label: 'Hack', component: HackTabContent },
  { id: TabId.Tools, label: 'Tools', component: ToolsTabContent },
];

const TAB_LOOKUP = TAB_ITEMS.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: item,
  }),
  {} as Record<TabId, TabItemEx>,
);

// component -----------------------------------------------------------------------------------------------------------

export interface Props {
  className?: string;
}

export function TabManager({ className }: Props) {
  // tab reducer
  const [selectedId, dispatchSelectedId] = useSelectedTab();

  // selected tab component
  const SelectedTabComponent = TAB_LOOKUP[selectedId].component;

  // render
  return (
    <div className={clsx('bui-tab-manager bui-flex-1 bui-flex-row', className)}>
      <TabBar items={TAB_ITEMS} selectedId={selectedId} onSelect={(id) => dispatchSelectedId({ action: 'set', id })} />
      <SelectedTabComponent />
    </div>
  );
}
