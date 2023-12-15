import { ChannelMessage } from '/scripts/lib/comms';
import { Context } from '/scripts/lib/context';

export interface RunParams {
  /** The context to use for the run. */
  ctx: Context;

  /** The path to the executable to run. */
  exePath: string;

  /** The arguments to pass to the executable. */
  args: string[];

  /** Callback to handle message events */
  onMessage: (message: ChannelMessage) => void;
}

/**
 * Helper to execute a module exe script and collect the messages.
 *
 * @see {@link RunParams}
 */
export async function run({ ctx, exePath, args, onMessage }: RunParams): Promise<void> {
  // create communication channel
  const channelId = ctx.channels.create();

  // connect to channel & run script asynchronously
  return new Promise<void>((resolve) => {
    // hook up event listeners on the channel
    ctx.channels.on(channelId, 'message', onMessage);
    ctx.channels.on(channelId, 'close', resolve);

    // run the scan script
    ctx.ns.run(exePath, undefined, channelId, ...args);
  }).finally(() => {
    // destroy communication channel
    ctx.channels.destroy(channelId);
  });
}
