import { Channel } from '/scripts/lib/comms';

declare global {
  interface Window {
    __bit_channels: Map<string, Channel>;
    __bit_uids: Set<string>;
  }
}

export {};
