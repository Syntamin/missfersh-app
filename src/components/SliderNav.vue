<template>
  <div class="slider-wrapper" ref="slideItem">
    <div
      class="slider-item"
      v-for="(item, itemIndex) in slideBar"
      :key="item"
      :class="{ active: index === itemIndex }"
      @touchend="handleTouchEnd(itemIndex, item, $event)"
      @touchstart="isMove === false"
      @touchmove="isMove === true"
    >
      {{ itemIndex === 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import tools from '@/utils/tools';

export default {
  data() {
    return {
      index: 0,
      isMove: false,
    };
  },
  computed: {
    ...mapState(['slideBar']),
    ...mapState(['size']),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapActions(['refreshGoodsList']),
    handleTouchEnd(itemIndex, item, e) {
      this.index = itemIndex;
      if (!this.isMove) {
        const oTop = e.target.getBoundingClientRect().top;
        const oHeight = e.target.getBoundingClientRect().height / 2;
        const pTop = this.$refs.slideItem.getBoundingClientRect().top;
        const pHeight = this.$refs.slideItem.getBoundingClientRect().height / 2;
        const result = oTop + oHeight - pTop - pHeight;
        tools.move(this.$refs.slideItem.scrollTop, result, this.$refs.slideItem, 'scrollTop');
        this.refreshGoodsList();
        this.getGoodsList({
          type: item,
          page: 1,
          size: this.size,
          sort: 'all',
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.slider-wrapper {
  width: 79px;
  position: fixed;
  left: 0px;
  top: 135px;
  bottom: 1.333rem;
  overflow: auto;
  background: #f8f8f8;
  div {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
  }
  .active {
    font-weight: bold;
    color: #ff1a99;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    background-color: #ff1a99;
  }
}
.slider-wrapper::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
