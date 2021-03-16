<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" :to="{name: 'Search'}">
      <van-icon name="search" />
      <div>荔枝水果9.99</div>
    </router-link>
    <first-nav />
    <template v-if="isLoading">
      <slider-nav />
      <goods-list class="goods-list"></goods-list>
    </template>
    <van-loading size="24px" vertical v-else>加载中...</van-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FirstNav from '../components/FirstNav.vue';
import SliderNav from '../components/SliderNav.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  components: {
    FirstNav,
    SliderNav,
    GoodsList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['isLoading']),
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.classify-wrapper {
  width: 375px;
  .search-btn {
    margin: 10.76px auto 0px;
    width: 355px;
    height: 31.5px;
    line-height: 31.5px;
    text-align: center;
    border-radius: 10px;
    background-color: #eee;
    font-size: 14px;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .goods-list {
    position: fixed;
    top: 135px;
    right: 0;
    width: 296px;
    bottom: 50px;
    overflow: auto;
  }
}
</style>
