import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';

export interface Props {
  className?: string;
}

export function HackTabContent({ className }: Props) {
  return <div className={clsx('bui-tab-content', className)}>Hack Tab Content</div>;
}
