import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';

export interface Props {
  className?: string;
}

export function ToolsTabContent({ className }: Props) {
  return <div className={clsx('bui-tab-content', className)}>Tools Tab Content</div>;
}
