import * as tldjs from "tldjs";

interface UrlObject {
  href: string;
  hostname: string;
  host: string;
}
// TODO: Evaluate if this is alright for a service worker
const nodeURL: { URL: new (uri: string) => UrlObject } =
  typeof window == "undefined" ? require("url") : null;

export class UrlUtils {
  static tldEndingRegex =
    /.*\.(com|net|org|edu|uk|gov|ca|de|jp|fr|au|ru|ch|io|es|us|co|xyz|info|ly|mil)$/;
  static ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  static getDomain(uriString?: string): string | null {
    if (uriString == null) {
      return null;
    }

    uriString = uriString.trim();
    if (uriString === "") {
      return null;
    }

    if (uriString.startsWith("data:")) {
      return null;
    }

    let httpUrl = uriString.startsWith("http://") || uriString.startsWith("https://");
    if (
      !httpUrl &&
      uriString.indexOf("://") < 0 &&
      this.tldEndingRegex.test(uriString) &&
      uriString.indexOf("@") < 0
    ) {
      uriString = "http://" + uriString;
      httpUrl = true;
    }

    if (httpUrl) {
      try {
        const url = this.getUrlObject(uriString);
        const validHostname = tldjs?.isValid != null ? tldjs.isValid(url.hostname) : true;
        if (!validHostname) {
          return null;
        }

        if (url.hostname === "localhost" || this.validIpAddress(url.hostname)) {
          return url.hostname;
        }

        const urlDomain =
          tldjs != null && tldjs.getDomain != null ? tldjs.getDomain(url.hostname) : null;
        return urlDomain != null ? urlDomain : url.hostname;
      } catch (e) {
        // Invalid domain, try another approach below.
      }
    }

    try {
      const domain = tldjs != null && tldjs.getDomain != null ? tldjs.getDomain(uriString) : null;

      if (domain != null) {
        return domain;
      }
    } catch {
      return null;
    }

    return null;
  }

  static getHost(uriString: string): string {
    const url = this.getUrl(uriString);
    try {
      return url != null && url.host !== "" ? url.host : null;
    } catch {
      return null;
    }
  }

  private static getUrl(uriString: string): UrlObject {
    if (uriString == null) {
      return null;
    }

    uriString = uriString.trim();
    if (uriString === "") {
      return null;
    }

    let url = this.getUrlObject(uriString);
    if (url == null) {
      const hasHttpProtocol =
        uriString.indexOf("http://") === 0 || uriString.indexOf("https://") === 0;
      if (!hasHttpProtocol && uriString.indexOf(".") > -1) {
        url = this.getUrlObject("http://" + uriString);
      }
    }
    return url;
  }

  private static validIpAddress(ipString: string) {
    return this.ipRegex.test(ipString);
  }

  private static getUrlObject(uriString: string): UrlObject {
    try {
      if (nodeURL != null) {
        return new nodeURL.URL(uriString);
      } else if (typeof URL === "function") {
        return new URL(uriString);
      } else if (window != null) {
        const hasProtocol = uriString.indexOf("://") > -1;
        if (!hasProtocol && uriString.indexOf(".") > -1) {
          uriString = "http://" + uriString;
        } else if (!hasProtocol) {
          return null;
        }
        const anchor = window.document.createElement("a");
        anchor.href = uriString;
        return anchor;
      }
    } catch (e) {
      // Ignore error
    }

    return null;
  }
}
