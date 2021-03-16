import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边栏数据
    slideBar: [],
    // 商品列表
    goodsList: [],
    // 是否正在刷新
    isLoading: false,
    // 侧边栏点击的类目的存储
    category: '',
    // 侧边栏点击的类目的查询条数
    size: 6,
    // 购物车商品
    goodsMap: {},
  },
  mutations: {
    // 获取侧边栏数据
    getSlideBar(state, dataList) {
      state.slideBar = dataList;
    },
    // 获取商品列表
    getGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    // 刷新页面
    setIsLoding(state, data) {
      state.isLoading = data;
    },
    // 置空商品列表
    refreshGoodsList(state) {
      state.goodsList = [];
    },
    // 设置侧边栏点击后的参数
    setGoodsType(state, category) {
      state.category = category;
    },
    // 设置购物车商品
    setGoodsMap(state, goods) {
      state.goodsMap = goods;
    },
    // 更改购物车商品
    changeGoodsMap(state, params) {
      const { id, value } = params;
      const { type } = params || 0;
      const { goodsMap } = state;
      if (goodsMap[id]) {
        if ((goodsMap[id] === 1 && value === -1) || type === -Infinity) {
          Vue.delete(goodsMap, id);
        } else {
          Vue.set(goodsMap, id, goodsMap[id] + value);
        }
      } else {
        Vue.set(goodsMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(goodsMap));
    },
  },
  actions: {
    // 获取侧边栏数据
    async getSlideBar({ commit }, type) {
      commit('setIsLoding', false);
      const res = await api.getsidebar({ type });
      commit('getSlideBar', res);
      // 侧边栏加载后自动获取商品信息
      this.dispatch('getGoodsList', {
        type: res[0],
        page: 1,
        sort: 'all',
      });
      commit('setIsLoding', true);
    },
    // 获取商品列表
    async getGoodsList({ commit, state }, params) {
      const { type } = params;
      commit('setGoodsType', type); // 存储当前点击的侧边栏类目
      const res = await api.getGoodsList({
        ...params,
        size: state.size,
      });
      commit('getGoodsList', res.list);
      if (res.total > state.goodsList.length) {
        return true;
      }
      return false;
    },
    // 刷新商品列表
    refreshGoodsList({ commit }) {
      commit('refreshGoodsList');
    },
    // 设置购物车商品
    setGoodsMap({ commit }, goods) {
      commit('setGoodsMap', goods);
    },
  },
  modules: {
  },
});
