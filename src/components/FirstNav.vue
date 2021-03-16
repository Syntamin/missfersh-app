<template>
  <div class="nav-wrapper" ref="scroll">
    <div
      class="nav-item"
      v-for="(item, index) in menuList"
      :key="item.title"
      :class="{ active: index == itemIndex }"
      @touchstart="isMove = false"
      @touchend="handleChange(index, item.title, $event)"
      @touchmove="isMove = true"
    >
      <div class="img-wrapper">
        <img :src="item.imgURL" :alt="item.title" />
      </div>
      <div class="img-desc">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import tools from '@/utils/tools';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      itemIndex: 0,
      isMove: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  mounted() {
    // this.$store.dispatch('getSlideBar', this.menuList[0]);
    this.getSlideBar(this.menuList[0]);
  },
  methods: {
    ...mapActions(['getSlideBar']),
    ...mapActions(['refreshGoodsList']),
    // 点击分类子元素时触发的事件
    handleChange(index, type, e) {
      if (!this.isMove) {
        this.itemIndex = index;
        const targetLeft = e.target.getBoundingClientRect().left;
        const targetWidth = e.target.getBoundingClientRect().width / 2;
        const viewWidth = document.documentElement.clientWidth / 2;
        const moveWidth = targetLeft + targetWidth - viewWidth;
        tools.move(this.$refs.scroll.scrollLeft, moveWidth, this.$refs.scroll, 'scrollLeft');
        this.refreshGoodsList();
        this.getSlideBar(type);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.nav-wrapper {
  width: 100%;
  height: 104px;
  display: flex;
  overflow-x: auto;
  .nav-item {
    padding: 10px 5px;
    width: 80px;
    height: 70px;
    font-size: 12px;
    .img-wrapper {
      width: 100%;
      height: 50px;
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-radius: 23px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    .img-desc {
      margin-top: 5px;
      text-align: center;
    }
  }
  .active {
    .img-wrapper {
      border-color: #d13193;
    }
    .img-desc {
      border-radius: 60px;
      font-weight: bold;
      color: #fff;
      background-color: #d13193;
    }
  }
}
// 使滚动条消失
.nav-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
