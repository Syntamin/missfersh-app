<template>
  <div id="app">
    <transition
      :name="transitionName"
      :mode="$router.back ? 'in-out' : 'out-in'"
    >
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  computed: {
    ...mapState(['goodsMap']),
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Classify' && from.name === 'Search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.back = false;
    },
  },
  created() {
    const result = JSON.parse(localStorage.getItem('goods')) || {};
    if (result) {
      this.setGoodsMap(result);
    }
  },
  methods: {
    ...mapActions(['setGoodsMap']),
  },
};
</script>
<style lang="less">
.view {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  transition: transform 0.3s linear;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
