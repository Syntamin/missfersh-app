<template>
  <div class="good-card">
    <div class="img-wrapper">
      <img :src="goodInfo.images[0]" alt="" ref="goodImg" />
    </div>
    <div class="good-content">
      <div class="title additional">{{ goodInfo.title }}</div>
      <div class="desc additional">{{ goodInfo.desc }}</div>
      <div class="tags">
        <div v-for="tag in goodInfo.tags" :key="tag">{{ tag }}</div>
      </div>
      <div class="price">￥{{ goodInfo.price }}</div>
      <div class="num-operate">
        <div @touchend="changeNum(goodInfo.id, -1)" v-if="num">
          <img
            src="http://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
            alt=""
          />
        </div>
        <div class="num">{{ num || 0 }}</div>
        <div @touchend="changeNum(goodInfo.id, 1)">
          <img
            src="http://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '@/tools/Animate/index';

export default {
  props: ['goodInfo', 'num', 'tips'],
  methods: {
    ...mapMutations(['changeGoodsMap']),
    changeNum(id, value) {
      if (this.tips) {
        this.$emit('changeNum', { id, value });
      } else {
        this.changeGoodsMap({ id, value, tips: false });
      }
      if (value === -1) {
        return;
      }
      const { left: oLeft, top: oTop } = this.$refs.goodImg.getBoundingClientRect();
      const { width: oWidth, height: oHeight } = this.$refs.goodImg;
      const shoppingCar = document.getElementById('shopping-car');
      const {
        left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight,
      } = shoppingCar.getBoundingClientRect();
      const endX = targetLeft + targetWidth / 2;
      const endY = targetTop + targetHeight / 2;
      Animate({
        src: this.goodInfo.images[0],
        width: oWidth,
        height: oHeight,
        startX: oLeft,
        startY: oTop,
        endX,
        endY,
      });
    },
  },
};
</script>

<style lang='less' scoped>
.good-card {
  width: 296px;
  height: 100px;
  display: flex;
  box-sizing: border-box;
  .img-wrapper {
    width: 110px;
    height: 100px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .good-content {
    position: relative;
    flex: 1;
    .title {
      width: 170px;
      margin-top: 5px;
      font-size: 13px;
      color: #1a1a1a;
    }
    .desc {
      margin-top: 5px;
      color: #aaa;
      font-size: 11px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        margin-right: 4px;
        padding: 1px 2px 2px 2px;
        border: 2px solid #eee;
        border-radius: 3px;
        font-size: 10px;
        color: #aaa;
      }
    }
    .price {
      margin-top: 4px;
      font-size: 14px;
      font-weight: bold;
      color: #ff1a90;
    }
    .additional {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .num-operate {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      bottom: 12px;
      right: 15px;
      > :not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
</style>
