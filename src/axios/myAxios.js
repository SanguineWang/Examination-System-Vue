import axios from "axios";
import store from "../store/index";
import { author } from "../store/type";
axios.defaults.baseURL = "/api/";

axios.interceptors.request.use(
  function(req) {
    let auth = sessionStorage.getItem(author);
    if (auth != null) {
      //必须全小写
      req.headers["authorization"] = auth;
    }
    return req;
  },
  function(error) {
    // 全局异常处理
    // store.commit(SHOW_EXCEPTION, { message: error });
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  resp => resp,
  error => {
    let resp = error.response;
    if (resp) {
      switch (resp.status) {
        case 401:
          // 可基于响应码，声明单独的处理
          break;
        case 500:
          break;
      }
      // 此时为同步事件，统一将任意异常信息，置于store
      // store.commit(SHOW_EXCEPTION, { message: resp.data.message });
    }
    // 可以阻止调用方法继续执行。但控制台有异常信息
    return Promise.reject();
  }
);
export default axios;
