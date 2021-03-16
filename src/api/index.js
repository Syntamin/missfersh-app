import axios from 'axios';
import baseURL, { URLS } from './URLS';

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => ({
  ...config,
  params: {
    appkey: 'white-also_1611728678350',
    ...config.params,
  },
}), (error) => {
  Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
}, (error) => Promise.reject(error));

export default {
  // 获取侧边栏数据
  getsidebar(params) {
    return instance.get(URLS.getsidebar, { params });
  },
  // 获取商品列表
  getGoodsList(params) {
    return instance.get(URLS.getGoodsList, { params });
  },
  // 模糊搜索
  getLikeSearch(params) {
    return instance.get(URLS.likeSearch, { params });
  },
  // 具体搜索
  getSearch(params) {
    return instance.get(URLS.search, { params });
  },
  // 购物车根据产品id获取产品列表
  getGoodsByIds(value) {
    // console.log(params);
    return instance.get(URLS.getGoodsByIds, { params: { value } });
  },
};
