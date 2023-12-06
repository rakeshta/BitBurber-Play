import { NS } from '@ns';

/** ANSI terminal color / style escape sequences. */
// prettier-ignore
export const style = {
  reset:      '\x1b[0m',
  bright:     '\x1b[1m',
  dim:        '\x1b[2m',
  underscore: '\x1b[4m',
  // blink:      '\x1b[5m',
  reverse:    '\x1b[7m',
  hidden:     '\x1b[8m',

  black:      '\x1b[30m',
  red:        '\x1b[31m',
  green:      '\x1b[32m',
  yellow:     '\x1b[33m',
  blue:       '\x1b[34m',
  magenta:    '\x1b[35m',
  cyan:       '\x1b[36m',
  white:      '\x1b[37m',
  grey:       '\x1b[90m',

  bgBlack:    '\x1b[40m',
  bgRed:      '\x1b[41m',
  bgGreen:    '\x1b[42m',
  bgYellow:   '\x1b[43m',
  bgBlue:     '\x1b[44m',
  bgMagenta:  '\x1b[45m',
  bgCyan:     '\x1b[46m',
  bgWhite:    '\x1b[47m',
  bgGray:     '\x1b[100m',
};

const levelStyles = {
  debug: style.black,
  info: style.bright + style.white,
  warn: style.yellow,
  error: style.red,
} as const;

export type LogLevel = keyof typeof levelStyles;
export type Logger = (...args: unknown[]) => void;

/** wraps a NS logger */
const wrapLogger =
  (level: LogLevel, logger: Logger) =>
  (...args: unknown[]) =>
    logger(levelStyles[level], ...args, style.reset);

/** creates wrapped loggers for all log levels */
const levelWrappers = (logger: Logger) =>
  Object.keys(levelStyles).reduce(
    (acc, level) => ({ ...acc, [level]: wrapLogger(level as LogLevel, logger) }),
    {} as Record<LogLevel, Logger>
  );

/** Creates level loggers for the terminal and console (tail). */
export function createLoggers(ns: NS) {
  return {
    term: levelWrappers(ns.tprint),
    log: levelWrappers(ns.print),
  };
}
