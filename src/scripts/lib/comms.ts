import { global } from '/scripts/lib/global';
import { invariant } from '/scripts/lib/invariant';
import { uid } from '/scripts/lib/uid';

// types ---------------------------------------------------------------------------------------------------------------

/** Channel state */
export type ChannelState = 'open' | 'closed';

/** A message sent via a chanel. */
export interface ChannelMessage {
  /** The data payload in the message. */
  data: unknown;
}

/** Listener type for channel message event. */
export type ChannelMessageListener = (message: ChannelMessage) => void;

/** Listener type for channel close event. */
export type ChannelCloseListener = () => void;

/** Listener types by channel event type. */
export interface ChannelListeners {
  message: ChannelMessageListener;
  close: ChannelCloseListener;
}

/** Possible events on a channel */
export type ChannelEventType = keyof ChannelListeners;

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
   * Tests if the channel with the given id is open.
   *
   * @param id The id of the channel to test.
   * @returns `true` if the channel is open.
   */
  isOpen(id: string): boolean;

  /**
   * Subscribe to events on a channel.
   *
   * @param id The id of the channel to subscribe to
   * @param type The type of event to subscribe to
   * @param listener The listener to subscribe with
   */
  on<Type extends ChannelEventType>(id: string, type: Type, listener: ChannelListeners[Type]): void;

  /**
   * Unsubscribe from events on a channel.
   *
   * @param id The id of the channel to unsubscribe from
   * @param type The type of event to unsubscribe from
   * @param listener The listener to unsubscribe
   */
  off<Type extends ChannelEventType>(id: string, type: Type, listener: ChannelListeners[Type]): void;

  /**
   * Sends the given message to all listeners on a channel with the given id.
   *
   * @param id The id of the channel to send the message on
   * @param message The message to send
   */
  send(id: string, message: ChannelMessage): void;

  /**
   * Closes the channel with the given id.
   *
   * @param id The id of the channel to close
   */
  close(id: string): void;
}

// channel -------------------------------------------------------------------------------------------------------------

/** A channel represents a means of communication between different scripts.  */
export class Channel {
  // channel state
  private _state: ChannelState = 'open';

  // list of listeners
  private _listeners: {
    [key in keyof ChannelListeners]: Set<ChannelListeners[key]>;
  } = {
    message: new Set(),
    close: new Set(),
  };

  /** Constructs a new channel with the given id. */
  public constructor(public readonly id: string) {}

  /** Channel state */
  get state(): ChannelState {
    return this._state;
  }

  /**
   * Subscribe to events on this channel.
   *
   * @param type The type of event to subscribe to
   * @param listener The listener to subscribe with
   */
  public on<Type extends ChannelEventType>(type: Type, listener: ChannelListeners[Type]): void {
    this._listeners[type].add(listener);
  }

  /**
   * Unsubscribe from events on this channel.
   *
   * @param type The type of event to unsubscribe from
   * @param listener The listener to unsubscribe
   */
  public off<Type extends ChannelEventType>(id: string, type: Type, listener: ChannelListeners[Type]): void {
    this._listeners[type].delete(listener);
  }

  /**
   * Sends the given message to all listeners on this channel.
   *
   * @param message The message to send
   */
  public send(message: ChannelMessage): void {
    invariant(this._state === 'open', 'Cannot send message on closed channel');
    this._listeners.message.forEach((listener) => listener(message));
  }

  /** Closes this channel. */
  public close(): void {
    // abort if already closed
    if (this._state === 'closed') {
      return;
    }

    // close channel & notify listeners
    this._state = 'closed';
    this._listeners.close.forEach((listener) => listener());
  }
}

// channel manager -----------------------------------------------------------------------------------------------------

/** A factory to create a channel manager. */
export function channelManagerFactory(): ChannelManager {
  // list of channels
  const channels = (global.__bit_channels = global.__bit_channels || new Map<string, Channel>());

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

    destroy(id) {
      channels.delete(id);
    },

    isOpen(id) {
      return getChannel(id).state === 'open';
    },

    on(id, type, listener) {
      getChannel(id).on(type, listener);
    },

    off(id, type, listener) {
      getChannel(id).off(id, type, listener);
    },

    send(id, message) {
      getChannel(id).send(message);
    },

    close(id) {
      getChannel(id).close();
    },
  };
}
