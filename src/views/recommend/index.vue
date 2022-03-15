// 发现音乐的推荐页面/推荐首页
<template>
  <!-- Banner -->
  <banner-div></banner-div>
  <!-- 热门推荐 新碟 榜单 -->
  <div class="container">
    <div class="left">
      <!-- 热门推荐 -->
      <hotRecommend
        :click_audioPlay="click_audioPlay"
        :go_playlist="go_playlist"
        :go_playlist_all="go_playlist_all"
        :filter_playCount="filter_playCount"
      ></hotRecommend>

      <!-- 个性化推荐 -->
      <selfStyle
        :click_audioPlay="click_audioPlay"
        :go_taste="go_taste"
        :go_playlist="go_playlist"
        :filter_playCount="filter_playCount"
      >
      </selfStyle>

      <!-- 新碟上架 -->
      <album :go_album_item="go_album_item" :go_album="go_album"></album>
    </div>

    <!-- asideRight -->
    <!-- <aside :go_singer_item="go_singer_item"></aside> -->

    <div class="right">
      <div class="right_top" v-if="$store.state.account_id">
        <div style="padding: 10px; display: flex">
          <div style="width: 90px; height: 90px; border: 1px solid #ccc">
            <img
              style="width: 100%; height: 100%; padding: 5px"
              :src="$store.state.login_img"
              alt=""
            />
          </div>
          <div style="padding-left: 20px">
            <p>{{ $store.state.account_nickname }}</p>
            <p
            v-if="$store.state.account_lever"
              style="
                padding-top: 5px;
                color: #999999;
                width: 50px;
                text-align: center;
                border-radius: 15px;
                border: 1px solid #ccc;
              "
            >
         <span >  lv.{{ $store.state.account_lever }}</span>    
            </p>
          </div>

          <div></div>
        </div>
      </div>

      <div class="right_top" v-else>未登录</div>

      <div class="right_main">

        <div class="hotRecommend" style="margin: 5px 10px">
          <div class="hotRecommend_head">
            <span>入驻歌手</span>
            <span
              @click="$router.push('/discover/singer')"
              style="cursor: pointer"
              >查看全部</span
            >
          </div>
      
          <div class="hotRecommend_list" v-loading="loading">
            <ul v-for="item in singer_list.slice(0, 10)" :key="item.id">
              <li
                @click="
                  go_singer_item(item.id, item.name, item.alias[0], item.picUrl)
                "
              >
                <div class="list_li">
                  <div class="img">
                    <img
                      :src="item.picUrl"
                      style="width: 100%; height: 100%"
                      alt=""
                    />
                  </div>

                  <div class="information">
                    <p style="font-size: 14px; color: #333333">
                      {{ item.name }}
                    </p>
                    <p style="font-size: 12px; color: #666666">
                      {{ item.alias[0] }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  banner,
  hotPlaylist,
  recommend_songs_list,
  recommend_songs,
  recommend_resource,
  song_detail,
  top_album,
  Artist_list,
  playlist_detail,
  dt_data,
  song_url,
  album_new,
} from "@/utils/request.js";

import selfStyle from "./selfStyle/index.vue";
import hotRecommend from "./hotRecommend/hotRecommend.vue";
import album from "./album/album.vue";
import bannerDiv from "./banner/bannerDiv.vue";
import aside from './asideRight/aside.vue'
export default {
  name: "recommend",
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
      // recommendSongsList: [], //推荐歌单
      // selfStyleList: [], //个性化推荐
      // weekData: [], //最新上架album
      singer_list: [], //热门歌手

      loading: true,
      // playlist_msg: [], //歌单所有信息
      // playlist_tracks: [], //每首歌信息
 
    };
  },
  components: {
    selfStyle,
    hotRecommend,
    album,
    bannerDiv,
    aside
  },

  async created() {
    // await this.Banner();
    // await this.Top_album();
    // await this.Album_new();
    // await this.Recommend_songs_list();
    // await this.Recommend();
  },
  async mounted() {
    await Artist_list({}).then((res) => {
      res.artists.forEach((item) => {
        item.picUrl = item.picUrl + "?param=130y130";
      });
      this.singer_list = res.artists;
      if (this.singer_list.length) {
        this.loading = !this.loading;
      }
    });
  },
  methods: {
    // 获取轮播图即titleColor
    // Banner() {
    //   banner()
    //     .then((res) => {
    //       this.banners = res.banners;
    //       this.banners.forEach((item) => {
    //         this.banner_background.push(
    //           item.imageUrl
    //         );
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 轮播图
    carousel_change() {
      this.activeIndex = this.$refs.carousel.data.activeIndex;
    },

    // 点击图片中aduio所执行
    click_audioPlay(id) {
      playlist_detail({ id })
        .then((res) => {
          this.playlist_msg = res;
          this.playlist_tracks = res.playlist.tracks;
          //点击播放后添加audio歌单列表
          this.$store.commit("saveSong_list", this.playlist_tracks);
          this.playlist_tracks.forEach((item) => {
            item.dt = dt_data(item.dt);
          });
          this.Song_detail(this.playlist_msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //歌曲详情
    Song_detail(playlist_msg) {
      setTimeout(() => {
        // 获取歌曲url
        song_url({ id: playlist_msg.privileges[0].id }).then((res) => {
          this.$store.commit("saveSong_url", res.data[0].url);
          song_detail({
            ids: playlist_msg.privileges[0].id,
          }).then((res) => {
            this.$store.commit("saveSong_img", res.songs[0].al.picUrl);
            this.$store.commit("saveSong_name", res.songs[0].name);
            this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
            this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));
            this.$store.commit("saveSong_time", res.songs[0].dt);
          });
        });
      }, 0);
    },

    // 跳转对应专辑页面
    go_album_item(id) {
      this.$router.push({
        path: "/album_item",
        query: {
          id: id,
        },
      });
    },

    //more
    go_album() {
      this.$router.push({
        path: "/discover/album",
      });
    },
    // 个性化  每日歌曲推荐+个性化推荐
    // Recommend() {
    //   recommend_resource({ cookie: this.$store.state.login_cookie }).then(
    //     (res) => {
    //       // 选择每日歌单推荐的前3个做为个性化推荐
    //       console.log(res);
    //       this.selfStyleList = res.recommend.splice(0, 3);
    //     }
    //   );
    // },

    // 跳转歌单页
    go_playlist(id) {
      this.$router.push({
        path: "/discover/playlist_item",
        query: {
          id: id,
        },
      });
    },
    // 跳转该类型歌单页
    go_playlist_all(cat) {
      this.$router.push({
        path: "/discover/playlist",
        query: {
          cat: cat || "全部",
        },
      });
    },
    // 去每日推荐歌单
    go_taste() {
      this.$router.push({
        name: "taste",
      });
    },

    filter_playCount(value) {
      value = value + "";
      if (value > 10000) {
        return value.substring(0, value.length - 4) + "万";
      } else {
        return value;
      }
    },
    // 跳转到item
    go_singer_item(id, name, nick, img) {
      let index = img.indexOf("?");
      this.$router.push({
        path: "/discover/singer_item",
        query: {
          id: id,
          name: name,
          nick: nick,
          img: img.substring(0, index) + "?param=640y330",
        },
      });
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
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin-top: 350px;
  margin-bottom: 90px;
  .left {
    box-sizing: border-box;
    width: 816px;

    border-right: 1px solid #ddd;
    .hotRecommend {
      box-sizing: border-box;

      .hotRecommend_head {
        display: flex;
        padding: 5px 20px;
        align-items: flex-end;
        // align-content: center;
        align-items: center;
        // justify-content: center;
        margin: 10px;
        height: 40px;
        border-bottom: 3px solid red;

        .headLine {
          font-size: 23px;
          font-weight: lighter;
          padding: 0 20px;
        }
        span {
          cursor: pointer;
        }
        span:not(.headLine) {
          color: rgb(43, 64, 66);
        }
        span:not(.headLine):hover {
          text-decoration: underline;
        }
        .more {
          cursor: pointer;
          margin-left: auto;
          // margin-left: 300px;
        }
      }
      .hotRecommend_list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          margin: 10px 22px;
          box-sizing: border-box;
          width: 158px;
          height: 240px;
          list-style: none;
          .list_li {
            position: relative;
            box-sizing: border-box;
            width: 156px;
            height: 156px;

            .calendar {
              width: 100%;
              height: 100%;
              border: 1px solid black;
              border-radius: 15px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              .week {
                border-radius: 15px 15px 0px 0px;
                text-align: center;
                color: #fed9d9;
                background-color: red;
              }
              .day {
                height: 100px;
                border-radius: 0px 0px 15px 15px;
                flex: 1;
                display: flex;
                justify-content: center;
                font-size: 100px;
                background: linear-gradient(
                  rgb(167, 159, 159),
                  rgb(246, 246, 252)
                );
              }
            }

            .buttom {
              border-top: 1px solid rgb(112, 110, 110);
              height: 28px;
              width: 100%;
              position: absolute;
              bottom: 0;
              background-color: rgba(48, 47, 47, 0.3);

              display: flex;
              align-items: center;
              // filter:blur(0.6px)
              .icon_play {
                position: absolute;
                right: 5px;
              }
            }
          }
        }
      }
    }
  }

  .right {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    height: 100%;
    .right_top {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    right_main {
      padding: 20px;
    }
    .hotRecommend {
      box-sizing: border-box;
      padding: 5px 10px;
      .hotRecommend_head {
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 1px solid gray;
        span {
          font-size: 12px;
        }
        span:not(.headLine) {
          color: rgb(43, 64, 66);
        }
        span:not(.headLine):hover {
          text-decoration: underline;
        }
        .more {
          cursor: pointer;
          margin-left: 300px;
        }
      }
      .hotRecommend_list {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        li {
          margin: 10px 0px;
          height: 62px;
          list-style: none;

          .list_li {
            width: 100%;
            height: 100%;
            border: 1px solid rgb(224, 224, 224);
            display: flex;
            cursor: pointer;
            .img {
              // width: 62px;
              // height: 62px;
              width: 25%;
              height: 100%;
              // cursor: pointer;
            }
            .information {
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              // align-items: center;
            }
          }
          .list_li:hover {
            background-color: rgb(245, 241, 241);
          }
        }
      }
    }
  }
}
.el-carousel .is-animating {
  transition: transform 0s ease-in-out;
}
</style>