import Config from '../config.json';

class LocalStorage {
  static getJSON() {
    if (typeof window === 'undefined') {
      return {};
    }
    if (!window.localStorage) {
      console.error('browser does not support local storage');
      return {};
    }
    var appData =
        window.localStorage.getItem(Config.localStorageKey) || '{}';
    return JSON.parse(appData);
  }

  static get(key) {
    var appData = this.getJSON();
    return appData[key];
  }

  static set(key, value) {
    var appData = this.getJSON();
    appData[key] = value;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(Config.localStorageKey,
                                  JSON.stringify(appData));
    }
  }

  static delete(key) {
    var appData = this.getJSON();
    delete appData[key];
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(Config.localStorageKey,
                                  JSON.stringify(appData));
    }
  }
}

export default LocalStorage;