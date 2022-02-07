// 发现音乐的推荐页面/推荐首页
<template>
  <!-- <div>推荐</div> -->
  <div
    class="top_banner"
    :style="{
      'background-image': `url(${banner_background[activeIndex]})`,
      'background-size': '30000px',
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
  <!-- 热门推荐 新碟 榜单 -->
  <div class="container">
    <div class="left">
      <!-- 热门推荐 -->
      <div class="hotRecommend">
        <div class="hotRecommend_head">
          <div style="width: 16px; height: 16px">
            <img
              style="width: 100%; height: 100%"
              src="../../static/imgs/圆圈.png"
              alt=""
            />
          </div>
          <span class="headLine" @click="go_playlist_all('')">热门推荐</span>
          <span @click="go_playlist_all('华语')">华语</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="go_playlist_all('流行')">流行</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="go_playlist_all('摇滚')">摇滚</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="go_playlist_all('民谣')">民谣</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="go_playlist_all('电子')">电子</span>
          <span class="more" @click="go_playlist_all()">更多</span>
        </div>

        <div class="hotRecommend_list">
          <ul v-for="item in recommendSongsList" :key="item.id">
            <li>
              <div class="list_li">
                <img
                  @click="go_playlist(item.id)"
                  :src="item.picUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
                <div class="buttom">
                  <img
                    style="width: 20px; height: 20px; padding: 10px"
                    src="../../static/imgs/耳机.png"
                    alt=""
                  />
                  <span style="color: #ccc; font: 20px '隶书'">{{
                    filter_playCount(item.playCount)
                  }}</span>
                  <img
                  @click="click_audioPlay(item.id)"
                    class="icon_play"
                    style="width: 26px; height: 26px"
                    src="../../static/imgs/播放.png"
                    alt=""
                  />
                </div>
              </div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 个性化推荐 -->
      <div class="hotRecommend">
        <div class="hotRecommend_head">
          <div style="width: 16px; height: 16px">
            <img
              style="width: 100%; height: 100%"
              src="../../static/imgs/圆圈.png"
              alt=""
            />
          </div>
          <span class="headLine">个性化推荐</span>
        </div>
        <div class="hotRecommend_list">
          <li @click="go_taste()">
            <div class="list_li">
              <div class="calendar">
                <div class="week">星期{{ new Date().getDay() }}</div>
                <div class="day">{{ new Date().getDate() }}</div>
              </div>
            </div>
            <span>每日歌单推荐</span>
          </li>

          <ul v-for="item in selfStyleList" :key="item.id">
            <li>
              <div class="list_li">
                <img
                  @click="go_playlist(item.id)"
                  :src="item.picUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
                <div class="buttom">
                  <img
                    style="width: 20px; height: 20px; padding: 10px"
                    src="../../static/imgs/耳机.png"
                    alt=""
                  />
                  <span style="color: #ccc; font: 20px '隶书'">{{
                    filter_playCount(item.playcount)
                  }}</span>
                  <img
                  @click="click_audioPlay()"
                    class="icon_play"
                    style="width: 26px; height: 26px"
                    src="../../static/imgs/播放.png"
                    alt=""
                  />
                </div>
              </div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 新碟上架 -->
      <div class="hotRecommend">
        <div class="hotRecommend_head">
          <div style="width: 16px; height: 16px">
            <img
              @click="go_album_item(item.id)"
              style="width: 100%; height: 100%"
              src="../../static/imgs/圆圈.png"
              alt=""
            />
          </div>
          <span class="headLine">新碟上架</span>
          <span class="more" @click="go_album()">更多</span>
        </div>

        <div style="padding: 20px">
          <div
            style="
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              border: 1px solid #ddd;
              justify-content: center;
            "
          >
            <ul v-for="item in weekData" :key="item.id">
              <li style="margin: 10px 15px">
                <div class="list_li" style="width: 120px; height: 120px">
                  <img
                    @click="go_album_item(item.id)"
                    :src="item.picUrl"
                    style="width: 100%; height: 100%"
                    alt=""
                  />
                </div>
                <p
                  style="
                    width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 5px 0px;
                  "
                >
                  {{ item.name }}
                </p>
                <p
                  style="
                    width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #666666;
                    font-size: 12px;
                  "
                >
                  {{ item.artists[0].name }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <!-- 账户信息 -->
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
              style="
                padding-top: 5px;
                color: #999999;
                width: 50px;
                text-align: center;
                border-radius: 15px;
                border: 1px solid #ccc;
              "
            >
              lv.{{ $store.state.account_lever }}
            </p>
          </div>

          <div></div>
        </div>
      </div>

      <div class="right_top" v-else>未登录</div>

      <div class="right_main">
        <!-- 入驻歌手 -->
        <div class="hotRecommend">
          <div class="hotRecommend_head">
            <span >入驻歌手</span>
            <span >查看全部</span>
          </div>
          <!-- 100位热门歌手前20名 -->
          <div class="hotRecommend_list" v-loading="loading">
            <ul v-for="item in singer_list.slice(0, 10)" :key="item.id">
              <li    @click="
                      go_singer_item(
                        item.id,
                        item.name,
                        item.alias[0],
                        item.picUrl
                      )
                    ">
                <div class="list_li">
                  <div class="img">
                       <img
                 
                    :src="item.picUrl"
                    style="width: 100%; height: 100%"
                    alt=""
                  />
                  </div>
               
                  <div class="information"> 
                    <p style="font-size:14px;color:#333333">{{ item.name }}</p>
                   <p style="font-size:12px;color:#666666">{{ item.alias[0] }}</p></div>
                 
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
  
} from "../../utils/request.js";

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
      recommendSongsList: [], //推荐歌单
      selfStyleList: [], //个性化推荐
      weekData: [], //最新上架album
      singer_list: [], //热门歌手
      
      loading: true,
      playlist_msg: [], //歌单所有信息
      playlist_tracks: [], //每首歌信息
     
    };
  },

  async created() {
    await this.Banner();
    await this.Top_album();
    await this.Recommend_songs_list();
    await this.Recommend();
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
    Banner() {
      banner()
        .then((res) => {
          this.banners = res.banners;
          this.banners.forEach((item) => {
            this.banner_background.push(
              // item.imageUrl + "?imageView&quality=89"
              item.imageUrl
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
          this.Song_detail(this.playlist_msg)
        })
        .catch((err) => {
          console.log(err);
        });
    },
      //歌曲详情
    Song_detail(playlist_msg) {
      setTimeout(() => {
        // 获取歌曲url
        song_url({ id: playlist_msg.privileges[0].id }).then(
          (res) => {
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
          }
        );
      }, 0);
    },
    // 推荐歌单
    async Recommend_songs_list() {
      recommend_songs_list()
        .then((res) => {
          console.log(res);
          res.result.forEach((item) => {
            item.picUrl = item.picUrl + "?param=140y140";
          });
          this.recommendSongsList = res.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新碟上架   **月初可能会没有weekdata只有monthdata
    async Top_album() {
      await top_album().then((res) => {
        this.weekData = res;
        this.weekData.forEach((item) => {
          item.picUrl = item.picUrl + "?param=100y100";
        });
      });
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
    Recommend() {
      recommend_resource({ cookie: this.$store.state.login_cookie }).then(
        (res) => {
          // 选择每日歌单推荐的前3个做为个性化推荐
          this.selfStyleList = res.recommend.splice(0, 3);
        }
      );
    },
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
      padding:5px 10px;
      .hotRecommend_head {        
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 1px solid gray;
        span{
          font-size:12px;
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
            .img {
              width: 62px;
              height: 62px;
              cursor: pointer;
            }
            .information{
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            }
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