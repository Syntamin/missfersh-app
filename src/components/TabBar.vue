<template>
  <div class="tab-bar">
    <van-tabbar route fixed>
      <van-tabbar-item icon="wap-home-o" :to="{ name: 'Home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="apps-o" :to="{ name: 'Classify' }"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'Shopping' }"
      :badge="badge"
      id="shopping-car"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" :to="{ name: 'My' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      goodsMap: (state) => state.goodsMap,
    }),
    badge() {
      const result = Object.values(this.goodsMap).length;
      if (result === 0) {
        return null;
      }
      return result;
    },
  },
};
</script>

<style>
</style>
