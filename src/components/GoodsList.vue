<template>
  <div class="goods-wrapper">
    <div class="goods-header van-hairline--top van-hairline--bottom">
      <div :class="{ active: type === 'all' }" @touchend="handleChange('all')">
        综合
      </div>
      <div
        :class="{ active: type === 'sale' }"
        @touchend="handleChange('sale')"
      >
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type === 'price-up',
          'price-down': type === 'price-down',
        }"
        @touchend="handleChange('price')"
      >
        价格
      </div>
    </div>
    <div class="goods-content">
      <van-pull-refresh
        class="refresh"
        @refresh="onRefresh"
        v-model="refreshing"
      >
        <van-list
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <template v-if="goodsList.length > 0">
            <good-card
              v-for="good in goodsList"
              :key="good.id"
              :goodInfo="good"
              :num="goodsMap[good.id]"
            ></good-card>
          </template>
          <van-empty description="该类目没有商品" v-else></van-empty>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      type: 'all',
      page: 1,
      refreshing: false, // 加载中状态
      finished: false, // 是否已加载完成
      loading: false, // 是否处于加载过程中
    };
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      category: (state) => state.category,
      goodsMap: (state) => state.goodsMap,
    }),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapActions(['refreshGoodsList']),
    // 更改头部点击样式
    handleChange(type) {
      this.finished = false;
      this.page = 1;
      this.refreshGoodsList();
      if (type === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
          this.getGoodsList({
            type: this.category,
            page: this.page,
            sort: 'price-down',
          });
        } else {
          this.type = 'price-up';
          this.getGoodsList({
            type: this.category,
            page: this.page,
            sort: 'price-up',
          });
        }
      } else {
        this.type = type;
        this.getGoodsList({
          type: this.category,
          page: this.page,
          sort: type,
        });
      }
    },
    // 刷新事件
    onRefresh() {
      this.page = 1;
      this.refreshing = true;
      this.refreshGoodsList();
      this.getGoodsList({
        type: this.category,
        page: this.page,
        sort: this.type,
      });
      this.refreshing = false;
    },
    // 下拉加载事件
    async onLoad() {
      this.loading = true;
      this.page += 1;
      // ...
      const result = await this.getGoodsList({
        type: this.category,
        page: this.page,
        sort: this.type,
      });
      if (result) {
        this.loading = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.goods-wrapper {
  width: 296px;
  .goods-header {
    width: 280px;
    height: 25px;
    line-height: 25px;
    padding: 0 2.5px;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    text-align: center;
    background-color: #fff;
    z-index: 100;
    > div {
      width: 50px;
      height: 100%;
      color: #aaa;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }

    .price-down::after {
      border-top-color: #ff1a90;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
  }
  .goods-content {
    margin-top: 25px;
    .van-pull-refresh {
      overflow: none !important;
    }
  }
}
</style>
