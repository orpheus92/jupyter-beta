// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JSONObject
} from '@phosphor/coreutils';

import * as urlparse
 from 'url-parse';

/**
 * The namespace for URL-related functions.
 */
export
namespace URLExt {
  /**
   * Parse a url into a URL object.
   *
   * @param urlString - The URL string to parse.
   *
   * @returns A URL object.
   */
  export
  function parse(url: string): IUrl {
    if (typeof document !== 'undefined') {
      let a = document.createElement('a');
      a.href = url;
      return a;
    }
    return urlparse(url);
  }

  /**
   * Join a sequence of url components and normalizes as in node `path.join`.
   *
   * @param parts - The url components.
   *
   * @returns the joined url.
   */
  export
  function join(...parts: string[]): string {
    // Adapted from url-join.
    // Copyright (c) 2016 José F. Romaniello, MIT License.
    // https://github.com/jfromaniello/url-join/blob/v1.1.0/lib/url-join.js
    let str = [].slice.call(parts, 0).join('/');

    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');

    // remove consecutive slashes
    str = str.replace(/([^:\s])\/+/g, '$1/');

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    str = str.replace(/(\?.+)\?/g, '$1&');

    return str;
  }

  /**
   * Encode the components of a multi-segment url.
   *
   * @param url - The url to encode.
   *
   * @returns the encoded url.
   *
   * #### Notes
   * Preserves the `'/'` separators.
   * Should not include the base url, since all parts are escaped.
   */
  export
  function encodeParts(url: string): string {
    return join(...url.split('/').map(encodeURIComponent));
  }

  /**
   * Return a serialized object string suitable for a query.
   *
   * @param object - The source object.
   *
   * @returns an encoded url query.
   *
   * #### Notes
   * From [stackoverflow](http://stackoverflow.com/a/30707423).
   */
  export
  function objectToQueryString(value: JSONObject): string {
    return '?' + Object.keys(value).map(key =>
      encodeURIComponent(key) + '=' + encodeURIComponent(String(value[key]))
    ).join('&');
  }

  /**
   * Test whether the url is a local url.
   */
  export
  function isLocal(url: string): boolean {
    switch (parse(url).host) {
    case location.host:
    case '':
      return true;
    default:
      return false;
    }
  }

  /**
   * The interface for a URL object
   */
  export interface IUrl {
    /**
     * The full URL string that was parsed with both the protocol and host
     * components converted to lower-case.
     */
    href?: string;

    /**
     * Identifies the URL's lower-cased protocol scheme.
     */
    protocol?: string;

    /**
     * The full lower-cased host portion of the URL, including the port if
     * specified.
     */
    host?: string;

    /**
     * The lower-cased host name portion of the host component without the
     * port included.
     */
    hostname?: string;

    /**
     * The numeric port portion of the host component.
     */
    port?: string;

    /**
     * The entire path section of the URL.
     */
    pathname?: string;

    /**
     * The "fragment" portion of the URL including the leading ASCII hash
     * `(#)` character
     */
    hash?: string;


    /**
     * The search element, including leading question mark (`'?'`), if any,
     * of the URL.
     */
    search?: string;
  }
}
