<template>
  <!-- <div>推荐</div> -->
  <div
    class="top_banner"
    :style="{
      'background-image': `url(${banner_background[activeIndex]})`,
      'background-size': '50000px',
      'background-position': 'top top',
    }"
  >
    <!-- banner -->
    <div class="banner" ref="banner_back_ref">
      <el-carousel
        trigger="click"
        :autoplay="false"
        arrow="always"
        @change="carousel_change()"
        ref="carousel"
      >
        <el-carousel-item
          style="width: 100%; height: 350px"
          v-for="(item, index) in banners"
          :key="index"
        >
          <img style="width: 100%; height: 100%" :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

import {
  banner,

} from "@/utils/request.js";
export default {
  // props: ["carousel_change"],
  data() {
    return {
      banners: [
        {
          id: "1",
          imageUrl:
            "https://puui.qpic.cn/vcover_hz_pic/0/o8mbrpo92gni5uc1614137102933/0",
        },
      ],
      banner_background: [],
      banner_back: "",
      activeIndex: 0, //轮播图索引
      loading: true,
    };
  },
  async created() {
    await this.Banner();
  },
  methods: {
    Banner() {
      banner()
        .then((res) => {
          this.banners = res.banners;
          this.banners.forEach((item) => {
            this.banner_background.push(item.imageUrl);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    carousel_change() {
      this.activeIndex = this.$refs.carousel.data.activeIndex;
    },
  },
};
</script>

<style scoped lang="less">
.top_banner {
  position: absolute;
  left: 0;
  top: 110px;
  width: 100%;
  max-width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  .banner {
    display: flex;
    width: 1100px;
    min-width: 1100px;
    // height: 350px;
    .el-carousel {
      width: 1100px;
      img {
        width: 100%;
        height: 350px;
      }
    }
  }
}
</style>