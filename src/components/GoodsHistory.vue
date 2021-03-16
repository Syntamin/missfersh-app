<template>
  <div class="goods-history">
    <div class="header">历史记录：</div>
    <div
      class="history-item"
      v-for="item in goodsHistory"
      :key="item.time"
      @touchend="onClick(item.value)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['goodsHistory'],
  methods: {
    onClick(item) {
      this.$emit('search', item);
    },
  },
};
</script>

<style lang="less" scoped>
.goods-history {
  width: 350px;
  position: relative;
  top: 30px;
  left: 30px;
  .header {
    margin: 0px 0px 10px 0px;
    font-weight: bold;
  }
  .history-item {
    padding: 15px;
    background: #eee;
    border-radius: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
</style>
