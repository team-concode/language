import EventEmitter from 'events';
import bundle from "../Config/StringBundle.json";
import sf from 'sf';

class StringBundleService {
  ee = new EventEmitter();

  constructor() {
    this.load();

    let lang = localStorage.getItem('lang');
    if (lang !== null && lang !== undefined) {
      this._setLang(lang);
    } else {
      this._setLang('en');
      this._setLang(this.getSystemLang());
    }
  }

  getSystemLang = () => {
    let systemLang = navigator.language || navigator.userLanguage;
    let dash = systemLang.indexOf("-");
    if (dash > 0) {
      systemLang = systemLang.substr(0, dash);
    }

    return systemLang;
  };

  load = () => {
    this.sb = new Map();
    for (let index = 0; index < bundle.length; index++) {
      let item = bundle[index];
      this.sb.set(item.key.toLowerCase(), item);
    }
  };

  changeLang = (lang) => {
    this._setLang(lang);
    this.ee.emit('updated');
  };

  _setLang = (lang) => {
    if (lang === 'ko') {
      this.lang = lang;
      this.language = '한국어';
    } else {
      this.lang = 'en';
      this.language = 'English';
    }

    localStorage.setItem('lang', this.lang);
  };

  addEventHandler = async(key, event) => {
    this.ee.on(key, event);
  };

  removeEventHandler = async(key, event) => {
    this.ee.off(key, event);
  };

  get = (key) => {
    if (key == null) {
      return '';
    }

    key = key.toLowerCase();
    let res = this.sb.get(key);
    if (res === undefined || res == null) {
      return key;
    }

    let value = this.getWithLang(key, this.lang);
    if (value === undefined || value == null || value === "") {
      value = this.getWithLang(key, 'en');
      if (value === undefined || value == null) {
        return key;
      }
    }

    value = value.replace('\n', ' ');
    return value;
  };

  format = (key, ...args) => {
    let res = this.get(key);
    if (res == null) {
      return key;
    }
    return sf(res, args);
  };

  getWithLang = (key, lang) => {
    let res = this.sb.get(key);
    if (res != null) {
      if (lang === 'en') {
        return res.en;
      }

      if (lang === 'ko') {
        return res.ko;
      }
    }

    return "";
  };
}

export default new StringBundleService();