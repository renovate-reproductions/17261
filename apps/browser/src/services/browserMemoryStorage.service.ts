import AbstractChromeStorageService from "./abstractChromeStorageApi.service";

export default class BrowserMemoryStorageService extends AbstractChromeStorageService {
  protected chromeStorageApi: chrome.storage.StorageArea = (chrome.storage as any).session;
}
