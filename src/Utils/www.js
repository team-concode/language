import axios from 'axios/index';
import util from "./util";
import {SimpleLoader} from "../Containers";

class WWW {
  constructor() {
  }

  async post(path, data, loading) {
    await util.sleep(1);
    if (loading) {
      SimpleLoader.show();
    }

    try {
      let res = await axios.post(path, data, {
        headers: {
          "Content-type": "application/json",
        }
      });

      if (this.isFailed(res.status)) {
        let message = "Can not load data.";
        let error = res.data;
        if (error != null) {
          message = error.message;
        }
        console.error(message);
      }

      return res.data;
    } catch (e) {
      console.error(e);
    } finally {
      if (loading) {
        SimpleLoader.hide();
      }
    }
  }

  async get(path, loading, headers) {
    await util.sleep(1);
    if (loading) {
      SimpleLoader.show();
    }

    if (headers == null) {
      headers = {
        "Content-type": "application/json",
        "version": '1.1.0',
      };
    }

    try {
      let res = await axios.get(path, {
        headers: headers
      });

      if (this.isFailed(res.status)) {
        let message = "Can not load data.";
        let error = res.data;
        if (error != null) {
          message = error.message;
        }
        console.error(message);
      }

      return res.data;
    } catch (e) {
      console.error(e);
    } finally {
      if (loading) {
        SimpleLoader.hide();
      }
    }
  }

  isSuccess = (resCode) => {
    return resCode / 100 === 2 || resCode === 304;
  };

  isFailed = (resCode) => {
    return !this.isSuccess(resCode);
  };
}

export default new WWW();