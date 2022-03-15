<template>
  <div class="main">
    <!-- playlist-all -->
    <div class="songplay_head">
      <span style="padding-right: 15px">{{ $route.query.cat }}</span>
      <!-- 选择分类 -->
      <el-popover
        ref="popover"
        placement="bottom-start"
        title="全部分类"
        :width="800"
        trigger="click"
        :hide-after="200"
      >
        <template #reference>
          <el-button>选择分类</el-button>
        </template>
        <div
          style="
            display: flex;
            flex-direction: row;
            padding: 20px;
            min-width: 730px;
            width: 730px;
          "
          v-for="(item, index) in catlist.categories"
          :key="item"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              width: 40px;
              padding: 10px 0px 10px 0px;
            "
          >
            <span>{{ item }}</span>
          </div>

          <div style="padding: 10px 0px 10px 20px; width: 705px">
            <span
              v-for="i in category[index]"
              :key="i"
              @click="go_playlist_all(i)"
              style="cursor: pointer"
            >
              {{ i }}
              <el-divider direction="vertical"></el-divider>
            </span>
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 歌曲列表 -->
    <div>
      <div class="hotRecommend_list">
        <ul v-for="item in playlist_hight" :key="item.id">
          <li>
            <div class="list_li">
              <img
                :key="item.coverImgUrl"
                @click="go_playlist(item.id)"
                v-lazy="item.coverImgUrl"
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

      <div>
        <el-pagination
          v-show="page.tableData.length"
          style="text-align: center"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :total="total > 500 ? 500 : total"
          :page-size="page.pagesize"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
import { useRouter } from "vue-router";
import {
  recommend_songs_list,
  playlist_hightquality,
  playlist_catlist,
  top_playlist,
  playlist_detail,
  dt_data,
  song_url,
  song_detail,
} from "../../utils/request.js";

export default {
  name: "playlist_all",
  // props: ["cat"],
  data() {
    return {
      comments: [], //最新评论
      page: {
        currentPage: 1, // 当前页码
        pagesize: 20, // 每页显示的行数
        tableData: [], // 表格数据
        pre: 0,
      },
      playlist_hight: [], //精品歌单
      query_cat: "", //'歌单类型'
      total: "", //这类型所有歌单数量
      catlist: {
        categories: [],
        sub: [],
        category: [],
        category0: [], //语种
        category1: [], //风格
        category2: [], //场景
        category3: [], //情感
        category4: [], //主体
      }, //歌单类型数据

      // 将获取的
      category: [],
      visible: false, //popover显示与隐藏

      loading: true,
      playlist_msg: [], //歌单所有信息
      playlist_tracks: [], //每首歌信息

      time1: null, //定时器
      time2: null,
      i: 1,  //当i>5 时取消列表的循环添加
    };
  },
  async created() {
    this.query_cat = this.$route.query.cat;
    await this.Top_playlist(this.query_cat);
    await this.Playlist_catlist();
  },
  methods: {
    //跳转 playlist_item
    go_playlist(id) {
      // console.log(id);
      this.$router.push({
        path: "/discover/playlist_item",
        query: {
          id: id,
        },
      });
    },
    // 点击图片中aduio所执行
    click_audioPlay(id) {
      playlist_detail({ id })
        .then((res) => {
          console.log(res + "179");
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
    //  获取网友精选歌单
    // Playlist_hightquality(cat) {
    //   playlist_hightquality({
    //     cat: cat,
    //   }).then((res) => {
    //     console.log(res);
    //     this.total = res.total;
    //     res.playlists.forEach((item) => {
    //       item.coverImgUrl = item.coverImgUrl + "?param=140y140";
    //     });
    //     this.page.tableData = res.playlists;
    //     this.playlist_hight = this.page.tableData.slice(
    //       this.page.pre,
    //       this.page.pre + 20
    //     );
    //   });

    //     let i = 0;
    //     let time2 = setInterval(async() => {
    //         await top_playlist({
    //             cat: this.query_cat,
    //             offset: 100,
    //         }).then((res) => {
    //             i += 100;
    //             // console.log(i);
    //             res.playlists.forEach((item) => {
    //                 item.coverImgUrl = item.coverImgUrl + "?param=130y130";
    //             });
    //             this.page.tableData = this.page.tableData.concat(res.playlists);
    //         });
    //         // console.log(i);
    //         if (i >= 700) {
    //             clearInterval(time2);
    //         }
    //     }, 100);
    // },
    // 格式化
    filter_playCount(value) {
      value = value + "";
      if (value > 10000) {
        return value.substring(0, value.length - 4) + "万";
      } else {
        return value;
      }
    },
    //分页组件触发事件
    async handleCurrentChange(val) {
      window.scrollTo(0, 0);
      this.page.currentPage = val;
      this.page.pre = 20 * (val - 1);
  
      this.playlist_hight = this.page.tableData.slice(
        this.page.pre,
        this.page.pre + 20
      );
    },
    // 或缺歌单分类  playlist_catlist
    async Playlist_catlist() {
      playlist_catlist().then((res) => {
        this.catlist.categories = res.categories;
        this.catlist.sub = res.sub;
        this.catlist.sub.forEach((item) => {
          if (item.category == 0) {
            this.catlist.category0.push(item.name);
            this.category[0] = this.catlist.category0;
          } else if (item.category == 1) {
            this.catlist.category1.push(item.name);
            this.category[1] = this.catlist.category1;
          } else if (item.category == 2) {
            this.catlist.category2.push(item.name);
            this.category[2] = this.catlist.category2;
          } else if (item.category == 3) {
            this.catlist.category3.push(item.name);
            this.category[3] = this.catlist.category3;
          } else if (item.category == 4) {
            this.catlist.category4.push(item.name);
            this.category[4] = this.catlist.category4;
          }
        });
      });
    },

    go_playlist_all(cat) {
      //点击后隐藏popover
      this.$refs.popover.hide();
      //跳转对应歌单页
      this.$router.push({
        name: "playlist_all",
        query: {
          cat: cat,
        },
      });
    },
    //对应类型歌单数据，默认请求类型为全部
    async Top_playlist(cat) {
      this.page.tableData = [];
      this.i = 0;
      window.scrollTo(0, 0);
      this.visible = !this.visible;
      this.page.currentPage = 1;
      //重置page
      this.page.pre = 0;
      top_playlist({
        cat: cat,
      }).then((res) => {
        this.total = res.total;
        //压缩图片
        res.playlists.forEach((item) => {
          item.coverImgUrl = item.coverImgUrl + "?param=140y140";
        });
        //设置 playlist_hight  初始数据
        this.page.tableData = res.playlists;
        this.playlist_hight = this.page.tableData.slice(
          this.page.pre,
          this.page.pre + 20
        );
        //调用延迟获取函数
        this.asyncGetList(cat);
      });
    },

    // Top_playlist 拿到数据后继续延迟获取后400项数据
    async asyncGetList(cat) {
      for (let i = 1; i <= 5; i++) {
        if (this.i > 5) {
          return;
        } else {
          await top_playlist({
            cat: cat,
            offset: 100 * i,
          }).then((res) => {
            res.playlists.forEach((item) => {
              item.coverImgUrl = item.coverImgUrl + "?param=130y130";
              this.page.tableData.push(item);
            });
          });
        }
      }
    },
  },
  mounted() {
    this.$router.afterEach(() => {
      this.i = 6   //让this.i 大于5 中止asyncGetList循环
    });
  },

  watch: {
    "$route.query.cat"(to, from) {
      if (this.$route.query.cat != undefined) {
        this.page.tableData = [];
        this.playlist_hight = [];
        this.Top_playlist(this.$route.query.cat);
      } else {
        return false;
      }
    },
  },

};
</script>

<style scoped lang="less">
.main {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .songplay_head {
    // padding: 0px 20px;
  }
  .hotRecommend_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    ul {
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
          .buttom {
            border-top: 1px solid rgb(112, 110, 110);
            height: 28px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: rgba(48, 47, 47, 0.3);
            display: flex;
            align-items: center;
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
</style>