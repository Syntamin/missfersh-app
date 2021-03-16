<template>
  <div class="search-wrapper">
    <div class="search-header">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.goback()" />
      <van-search
        class="search-input"
        v-model="searchValue"
        show-action
        :placeholder="placeholder"
        @input="onInput"
        @focus="onFocus"
      >
        <template #action>
          <div @click="onSearch" v-if="isIcon" class="search-icon">搜索</div>
          <van-icon
            v-else
            name="shopping-cart-o"
            id="shopping-car"
            :badge="badge"
            @click="$router.push({name: 'Shopping'})"
          />
        </template>
      </van-search>
    </div>
    <div class="search-result">
      <van-list
        v-if="showResult"
        class="showResult"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <van-cell
          class="result-item"
          v-for="item in searchResult"
          :key="item"
          :title="item"
          @click="onClickGood(item)"
        />
      </van-list>
      <goods-history
        v-if="isHistory"
        :goodsHistory="goodsHistory"
        @search="historySearch"
      ></goods-history>
    </div>
    <div class="search-content">
      <van-list
        v-if="isContent"
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad()"
      >
        <template v-if="isGoods">
          <good-card
            v-for="good in goodsList"
            :key="good.id"
            :goodInfo="good"
            :num="goodsMap[good.id]"
          ></good-card>
        </template>
        <!-- v-else -->
        <van-empty v-else description="该类目没有商品"></van-empty>
      </van-list>
    </div>
  </div>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import GoodsHistory from '@/components/GoodsHistory.vue';
import plugins from '@/utils/plugins';
import api from '@/api/index';
import { mapState } from 'vuex';

export default {
  mounted() {
    this.isBlur = true;
  },
  components: { GoodCard, GoodsHistory },
  data() {
    return {
      placeholder: '水',
      searchValue: '',
      showResult: false, // 控制展示搜索项
      loading: false,
      finished: false,
      searchResult: [],
      isContent: false, // 控制展示搜索结果
      isIcon: true, // 控制搜索框是否失焦
      isGoods: true, // 判断是否具有商品
      isHistory: true, // 展示历史记录
      page: 1,
      goodsList: [],
      goodsHistory: [],
    };
  },
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
  created() {
    const result = JSON.parse(localStorage.getItem('goodsHistory')) || [];
    this.goodsHistory = result;
  },
  watch: {},
  methods: {
    /*eslint-disable*/
    input: plugins.debounce((target) => {
      api.getLikeSearch({ likeValue: target.searchValue }).then((res) => {
        target.searchResult = res.result;
      });
    }, 500),
    // 监听输入框变化
    onInput() {
      if (this.searchValue) {
        this.searchResult = [];
        this.showResult = true;
        this.isHistory = false;
        this.input(this);
      } else {
        this.isHistory = true;
        this.showResult = false;
      }
    },
    // 聚焦
    onFocus() {
      this.isIcon = true;
      this.isContent = false;
      this.isHistory = true;
    },
    historySearch(value) {
      this.searchValue = value;
      this.onSearch();
    },
    // 点击搜索
    onSearch() {
      this.isContent = true;
      this.showResult = false;
      this.isHistory = false;
      this.goodsList = [];
      // if (!this.searchValue) {
      //   this.isHistory = false;
      //   if (typeof value === 'string') {
      //     this.searchValue = value;
      //   } else {
      //     this.searchValue = this.placeholder;
      //   }
      // }
      // 存储搜索历史
      const result = this.goodsHistory.find((item) => item.value === this.searchValue);
      if (result) {
        result.time = new Date().getTime();
        this.goodsHistory.sort((a, b) => {
          b.time - a.time;
        });
      } else {
        this.goodsHistory.unshift({
          value: this.searchValue,
          time: new Date().getTime(),
        });
        if (this.goodsHistory > 10) {
          this.goodsHistory.pop();
        }
      }
      localStorage.setItem('goodsHistory', JSON.stringify(this.goodsHistory));
      api
        .getSearch({
          type: this.searchValue,
          page: 1,
          size: 6,
        })
        .then((res) => {
          if (res.list.length > 0) {
            this.isGoods = true;
            this.goodsList = res.list;
          } else {
            this.isGoods = false;
          }
          this.isIcon = false;
        });
    },
    // 点击模糊搜索的商品
    onClickGood(item) {
      this.searchValue = item;
      this.isContent = true;
      this.showResult = false;
      this.isHistory = false;
      this.goodsList = [];
      api
        .getSearch({
          type: item,
          page: 1,
          size: 6,
        })
        .then((res) => {
          if (res.list.length > 0) {
            this.isGoods = true;
            this.goodsList = res.list;
          } else {
            this.isGoods = false;
          }
          this.isIcon = false;
        });
    },
    // 商品列表滚动
    onLoad() {
      this.loading = true;
      this.page += 1;
      api
        .getSearch({
          type: this.searchValue,
          page: this.page,
          size: 6,
        })
        .then((res) => {
          if (this.goodsList.length < res.total) {
            this.goodsList = [...this.goodsList, ...res.list];
            this.loading = false;
          } else {
            this.loading = false;
            this.finished = true;
          }
        });
    },
    // 返回上一页
    goBack() {
      window.history.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .search-header {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arrow-left {
      font-size: 22px;
    }
    .search-input {
      flex: 1;
      .search-icon {
        width: 40px;
        font-size: 16px;
      }
      #shopping-car {
        width: 40px;
        vertical-align: middle;
        font-size: 24px;
      }
    }
  }
  .search-result {
    position: fixed;
    left: 0;
    top: 50px;
    height: 100px;
    // overflow: auto;
    z-index: 100;
    .result-item {
      padding-left: 50px;
    }
  }
  .search-content {
    position: relative;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
