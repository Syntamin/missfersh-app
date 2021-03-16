<template>
  <div class="shopping-wrapper">
    <div class="shopping-header">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="content-list">
      <van-checkbox-group
        v-model="resultList"
        ref="checkboxGroup"
        v-if="isGoods"
      >
        <div class="check-box" v-for="good in goodsList" :key="good.id">
          <van-checkbox class="box" :name="good.id"></van-checkbox>
          <good-card
            :goodInfo="good"
            :num="goodsMap[good.id]"
            :tips="true"
            @changeNum="changeNum"
          ></good-card>
        </div>
      </van-checkbox-group>
      <van-empty description="空空如也" v-else />
    </div>
    <div class="submit">
      <van-submit-bar
        :disabled="disabled"
        :price="allPrice"
        :button-text="`去结算${totalNum || ''}`"
      >
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import api from '@/api/index';
import { mapMutations, mapState } from 'vuex';
import { Dialog } from 'vant';

export default {
  mounted() {
    const values = Object.keys(this.goodsMap);
    api.getGoodsByIds(values.join()).then((res) => {
      this.goodsList = res.list;
    });
  },
  components: {
    GoodCard,
  },
  data() {
    return {
      resultList: [], // 复选框的结果收集
      goodsList: [], // 购物车的商品列表
      checked: false, // 全选与否
      isGoods: true, // 是否有商品
      disabled: true, // 禁用点击
    };
  },
  computed: {
    ...mapState({
      goodsMap: (state) => state.goodsMap,
    }),
    // 结算总数
    totalNum() {
      const resArr = this.goodsList.filter((item) => this.resultList.includes(item.id));
      const result = resArr.reduce((acc, item) => acc + (this.goodsMap[item.id] || 0), 0);
      return result;
    },
    // 结算总金额
    allPrice() {
      const resArr = this.goodsList.filter((item) => this.resultList.includes(item.id));
      const result = resArr.reduce(
        (acc, item) => acc + (this.goodsMap[item.id] || 0) * item.price,
        0,
      );
      return result * 100;
    },
  },
  watch: {
    goodsList: {
      handler() {
        if (this.goodsList.length === 0) {
          this.isGoods = false;
        } else {
          this.isGoods = true;
        }
      },
      immediate: true,
    },
    resultList: {
      handler() {
        if (this.resultList.length === 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (this.goodsList.length === this.resultList.length && this.goodsList.length !== 0) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(['changeGoodsMap']),
    del() {
      if (this.resultList.length === 0) {
        this.$toast('没有选中商品');
        return;
      }
      Dialog.confirm({
        title: '购物车',
        message: '是否删除商品',
      })
        .then(() => {
          this.resultList.forEach((id) => {
            // 删除localstorage
            this.changeGoodsMap({
              id,
              value: -1,
              type: -Infinity,
            });
          });
          this.goodsList = this.goodsList.filter((item) => {
            const len = this.resultList.findIndex((x) => x === item.id);
            if (len === -1) {
              return true;
            }
            this.resultList.splice(len, 1);
            return false;
          });
          if (this.goodsList.length === 0) {
            this.checked = false;
          }
        })
        .catch(() => {
          this.$toast('点击了取消');
        });
    },
    // 全选与反选
    checkAll() {
      if (this.goodsList.length === 0) {
        this.$toast('购物车没有商品');
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    // 更改数量
    changeNum(params) {
      const { id, value } = params;
      if (this.goodsMap[id] === 1 && value === -1) {
        const index = this.goodsList.findIndex((item) => item.id === id);
        const oindex = this.resultList.findIndex((item) => item.id === id);
        Dialog.confirm({
          title: '购物车',
          message: '是否删除商品',
        })
          .then(() => {
            // on confirm
            this.goodsList.splice(index, 1);
            this.resultList.splice(oindex, 1);
          })
          .catch(() => {
            // on cancel
            this.$toast('点击了取消');
          });
      }
      this.changeGoodsMap({ id, value });
    },
  },
};
</script>

<style lang='less' scoped>
.shopping-wrapper {
  .shopping-header {
    position: relative;
    top: 0;
    z-index: 100;
  }
  .content-list {
    width: 100%;
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    z-index: 0;
    .check-box {
      display: flex;
      justify-content: center;
      .box {
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
  .van-submit-bar {
    position: fixed;
    // z-index: 100;
    bottom: 50px;
  }
}
</style>
