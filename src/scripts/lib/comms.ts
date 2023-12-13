import { invariant } from '/scripts/lib/invariant';
import { uid } from '/scripts/lib/uid';

// types ---------------------------------------------------------------------------------------------------------------

/** A message sent via a chanel. */
export interface ChannelMessage {
  /** The data payload in the message. */
  data: unknown;
}

/** A listener to listen to messages on a channel. */
export type ChannelListener = (message: ChannelMessage) => void;

/** An interface to interact with channels. */
export interface ChannelManager {
  /**
   * Creates a new channel and returns the id.
   *
   * @returns the id of the newly created channel
   */
  create(): string;

  /**
   * Destroys the channel with the given id.
   *
   * @param id The id of the channel to destroy
   */
  destroy(id: string): void;

  /**
   * Sends the given message to all listeners on a channel with the given id.
   *
   * @param id The id of the channel to send the message on
   * @param message The message to send
   */
  send(id: string, message: ChannelMessage): void;

  /**
   * Subscribe to messages on a channel with the given id.
   *
   * @param id The id of the channel to subscribe to
   * @param listener The listener to subscribe with
   */
  subscribe(id: string, listener: ChannelListener): void;

  /**
   * Unsubscribe from messages on a channel with the given id.
   *
   * @param id The id of the channel to unsubscribe from
   * @param listener The listener to unsubscribe
   */
  unsubscribe(id: string, listener: ChannelListener): void;
}

// channel -------------------------------------------------------------------------------------------------------------

/** A channel represents a means of communication between different scripts.  */
export class Channel {
  // list of listeners
  _listeners = new Set<ChannelListener>();

  /** Constructs a new channel with the given id. */
  public constructor(public readonly id: string) {}

  /**
   * Sends the given message to all listeners on this channel.
   *
   * @param message The message to send
   */
  public send(message: ChannelMessage): void {
    this._listeners.forEach((listener) => listener(message));
  }

  /**
   * Subscribe to messages on this channel.
   *
   * @param listener The listener to subscribe with
   */
  public subscribe(listener: ChannelListener): void {
    this._listeners.add(listener);
  }

  /**
   * Unsubscribe from messages on this channel.
   *
   * @param listener The listener to unsubscribe
   */
  public unsubscribe(listener: ChannelListener): void {
    this._listeners.delete(listener);
  }
}

// channel manager -----------------------------------------------------------------------------------------------------

/** A factory to create a channel manager. */
export function channelManagerFactory(): ChannelManager {
  // list of channels
  const channels = (window.__bit_channels = window.__bit_channels || new Map<string, Channel>());

  // utility get a channel with the given id or throw an error if it doesn't exist
  function getChannel(id: string): Channel {
    const channel = channels.get(id);
    invariant(channel, `Channel with id ${id} does not exist`);
    return channel;
  }

  // create & return the channel manager
  return {
    create() {
      const id = uid.generate();
      channels.set(id, new Channel(id));
      return id;
    },

    destroy(id: string) {
      channels.delete(id);
    },

    send(id: string, message: ChannelMessage) {
      getChannel(id).send(message);
    },

    subscribe(id: string, listener: ChannelListener) {
      getChannel(id).subscribe(listener);
    },

    unsubscribe(id: string, listener: ChannelListener) {
      getChannel(id).unsubscribe(listener);
    },
  };
}
