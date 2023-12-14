/** A deconstructed path object with helper to manipulate it. */
export interface Path {
  /** The directory path. */
  directory?: string;

  /** Filename (includes extension) */
  fileName?: string;

  /** Filename without the extension */
  baseName?: string;

  /** File extension */
  ext?: string;

  /** Joins the given component to create a new path. */
  join(comp: string): Path;

  /** Converts the path to a string. */
  toString(): string;

  [Symbol.toStringTag](): string;
}

/**
 * Parses the given string into a path object.
 *
 * @param str The path string.
 * @returns A `Path` object parsed from the given path string.
 */
export function path(str: string): Path {
  // break down path into components & its characteristics
  const isAbsolute = str.startsWith('/');
  const isDirectory = str.endsWith('/');
  const comps = str.split('/').filter((v) => v.length);

  // split components into directory & file name
  const [dirComps, fileName] = isDirectory ? [comps, undefined] : [comps.slice(0, -1), comps[comps.length - 1]];
  const dirPrefix = isAbsolute ? '/' : undefined;
  const dirPath = dirComps.length ? dirComps.join('/') + '/' : undefined;
  const directory = dirPrefix && dirPath ? dirPrefix + dirPath : dirPrefix ?? dirPath;

  // split filename into base name & extension
  let baseName: string | undefined;
  let ext: string | undefined;

  if (fileName) {
    const dotIndex = fileName.lastIndexOf('.');
    [baseName, ext] = dotIndex > -1 ? [fileName.substring(0, dotIndex), fileName.substring(dotIndex + 1)] : [fileName];
    if (!ext) {
      ext = undefined;
    }
  }

  // toString function
  function toString(): string {
    return directory && fileName ? directory + fileName : directory || fileName || '';
  }

  // join function
  function join(comp: string): Path {
    let str = toString();
    if (str && comp) {
      str += fileName ? '/' + comp : comp;
    }
    return path(str);
  }

  // compose path object
  return {
    directory,
    fileName,
    baseName,
    ext,
    join,
    toString,
    [Symbol.toStringTag]: toString,
  };
}
