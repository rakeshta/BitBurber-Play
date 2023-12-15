import { modules } from '/scripts/modules/index';

import { useAppContext } from '/ui/bit-app/AppContext';
import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';

const { useEffect } = React;

export interface Props {
  className?: string;
}

export function HackTabContent({ className }: Props) {
  const ctx = useAppContext();

  //
  useEffect(() => {
    void (async () => {
      const host = ctx.ns.getHostname();
      console.log('--debug host', host);
      const servers = await modules.scan(ctx, host);
      console.log('--debug servers', servers);
    })();
  }, []);

  // render
  return <div className={clsx('bui-tab-content', className)}>Hack Tab Content</div>;
}
