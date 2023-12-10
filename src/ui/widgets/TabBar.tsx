import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';

export interface TabItem<Id extends string> {
  id: Id;
  label: string;
}

export interface Props<Id extends string> {
  className?: string;
  items?: TabItem<Id>[];
  selectedId?: Id;
  onSelect?: (id: Id) => void;
}

export function TabBar<Id extends string = string>({ className, items, selectedId, onSelect }: Props<Id>) {
  return (
    <div className={clsx('bui-tab-bar', className)}>
      {items?.map((item) => (
        <div
          key={item.id}
          className={clsx('bui-tab-item', {
            'bui-active': item.id === selectedId,
          })}
          onClick={onSelect && (() => onSelect(item.id))}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
