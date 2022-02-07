<template>
  <div
    class="main"
    style="display: flex; justify-content: center"
    v-if="$store.state.login_cookie.trim() == ''"
  >
    <el-empty description="未登录"></el-empty>
  </div>
  <div v-else class="main">
    <div class="left">
      <el-collapse @change="handleChange">
        <el-collapse-item title="创建的歌单" name="1">
          <div
            v-for="item in my_playlist"
            :key="item.name"
            class="my_playlist"
            @click="Playlist_detail(item.id)"
          >
            <div style="width: 40px; height: 40px; padding: 5px 0px">
              <img
                style="width:100%;height：100%"
                :src="item.coverImgUrl"
                alt=""
              />
            </div>
            <div
              style="display: flex; flex-direction: column; padding-left: 10px"
            >
              <span> {{ item.name }}</span>
              <span style="color: #ccc">{{ item.trackCount }}首</span>
            </div>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item title="收藏的歌单" name="2">
          <div>2</div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
    <div class="right">
      <div class="head" style="padding-left: 40px">
        <div class="img" v-cloak>
          <img :src="playlist_img" />
        </div>
        <div class="inform">
          <!-- 歌单 歌单名 -->
          <div class="song_name_div">
            <div style="width: 50px; height: 50px">
              <img
                style="width: 100%; height: 100%"
                src="../../static/imgs/歌单.png"
                alt=""
              />
            </div>
            <div class="song_name">{{ playlist_title }}</div>
          </div>
          <!-- 创始人 -->
          <div></div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="playlist">
        <div class="song_form_head">
          <div>
            <span
              style="
                font-size: 28px;
                font-weight: 200;
                padding-right: 20px;
                padding-left: 20px;
              "
            >
              歌曲列表
            </span>
            {{ playtrackCount }}首歌
          </div>
          <div>
            播放: <span style="color: red">{{ playlist_count }}</span> 次
          </div>
        </div>

        <div class="song_form">
          <el-table
            :data="playlist_tracks"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            :row-style="{ height: '30px' }"
            :cell-style="{ padding: '0px' }"
          >
            <el-table-column type="index" width="54" height="25">
            </el-table-column>
            <!-- 播放 -->
            <el-table-column type="" width="45" height="30">
              <tamplate>
                <el-icon
                  style="width: 25px; height: 40px; cursor: pointer"
                  class="icon"
                  @click="Song_detail(playlist_msg)"
                >
                  <video_play style="width: 100%; height: 100%"></video_play>
                </el-icon>
              </tamplate>
            </el-table-column>

            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              label="歌曲标题"
              width="235"
              height="30"
            >
            </el-table-column>
            <el-table-column prop="dt" label="时长" width="110" height="30">
            </el-table-column>

            <el-table-column
              prop="ar[0].name"
              :show-overflow-tooltip="true"
              label="歌手"
              width="90"
              height="30"
            >
            </el-table-column>
            <el-table-column
              prop="al.name"
              :show-overflow-tooltip="true"
              label="专辑"
              height="30"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  playlist_detail,
  comment_playlist,
  dt_data,
  user_playlist,
  song_detail,
  song_url,
} from "../../utils/request.js";
import { VideoPlay } from "@element-plus/icons";
export default {
  name: "my",
  props: ["id"],
  data() {
    return {
      playlist_msg: [], //歌单所有信息
      playlist_img: "", //歌单图片
      playlist_title: "", //歌单title
      playlist_tracks: [], //每首歌信息
      playlist_count: "", //播放次数
      playtrackCount: "", //歌曲数量
      playlist_tags: [], //歌曲标签
      description: "", //介绍
      commentCount: "", //歌单评论总数
      my_playlist: [], //我创建的歌单
      currentRowIndex: "", //el-table索引

      a: 132,
    };
  },
  components: {
    video_play: VideoPlay,
  },
  async created() {
    // 根据歌单id获取歌单数据
    if (this.$store.state.account_id) {
      await this.User_playlist(this.$store.state.account_id);
    }
  },
  methods: {
    Playlist_detail(id) {
      //登录后获得我的信息 我的歌单
      playlist_detail({
        id: id,
        cookie: this.$store.state.login_cookie,
      })
        .then((res) => {
          console.log(res);
          this.playlist_msg = res;
          this.playlist_img = res.playlist.coverImgUrl + "?param=130y130";
          // 获取歌单信息
          this.playlist_tracks = res.playlist.tracks;
          //vuex存储歌单信息，audio组件el-drawer使用
          this.$store.commit("saveSong_list", this.playlist_tracks);

          this.playlist_title = res.playlist.name;
          this.playlist_count = res.playlist.playCount;
          this.playtrackCount = res.playlist.trackCount;
          this.playlist_tags = res.playlist.tags;
          this.description = res.playlist.description;
          this.commentCount = res.playlist.commentCount;

          this.playlist_tracks.forEach((item) => {
            item.dt = dt_data(item.dt);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // el-collapse函数
    handleChange(val) {
      console.log(val);
    },
    // 获取用户歌单
    User_playlist(id) {
      user_playlist(id).then((res) => {
        this.my_playlist = res.playlist;
        this.Playlist_detail(res.playlist[0].id);
      });
    },

    //歌曲详情
    Song_detail(playlist_msg) {
      setTimeout(() => {
        song_url({ id: playlist_msg.privileges[this.currentRowIndex].id }).then(
          (res) => {
            // vuex存歌曲url
            this.$store.commit("saveSong_url", res.data[0].url);

            song_detail({
              ids: playlist_msg.privileges[this.currentRowIndex].id,
            }).then((res) => {
              //点击播放后 vuex存取歌曲图片，名字，时间，歌手 在audio组件显示
              this.$store.commit(
                "saveSong_img",
                res.songs[0].al.picUrl + "?param=34y34"
              );
              this.$store.commit("saveSong_name", res.songs[0].name);
              this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
              this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));
              this.$store.commit("saveSong_time", res.songs[0].dt);
            });
          }
        );
      }, 0);
      this.$store.commit("saveNow_index", this.currentRowIndex);
    },

    // 获取el-table index
    onRowClick(row) {
      this.currentRowIndex = row.index;
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
  mounted() {},
  watch: {
    "$store.state.account_id"(newv, oldv) {
      // console.log(newv,oldv);
      if (newv) {
        this.User_playlist(this.$store.state.account_id);
      }
    },
  },
};
</script>

<style scoped lang="less">
.red_cline {
  min-width: 1000px;
  text-align: center;
  display: flex;
  justify-content: center;
  height: 5px;
  background-color: red;
}

.main {
  // min-height: 100vh-20px;
  line-height: 100%;
  border-right: 0;
  margin: 0px  auto 70px  auto;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
  display: flex;

  .left {
    box-sizing: border-box;
    padding: 20px 0px 0px 20px;
    border-right: 1px solid #dddddd;
    width: 250px;
    .my_playlist {
      display: flex;
      cursor: pointer;
    }
    .my_playlist:hover {
      background-color: white;
    }
  }
  .right {
    flex: 1;
    box-sizing: border-box;
    .head {
      box-sizing: border-box;
      width: 850px;
      min-width: 850px;
      display: flex;
      padding: 40px 0px;
      .img {
        box-sizing: border-box;
        width: 208px;
        height: 208px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 95%;
          height: 95%;
        }
      }
      .inform {
        padding: 0 20px;
        width: 500px;
        display: flex;
        flex-direction: column;
        div {
          padding: 10px 0;
          width: 100%;
        }
        .tags {
          span {
            cursor: pointer;
            border-radius: 15px;
            border: 1px solid #ddd;
            padding: 5px;
            margin: 5px;
          }
        }
        // 歌单 name
        .song_name_div {
          height: 50px;
          display: flex;
          align-items: center;
          .song_name {
            font-size: 20px;
          }
        }
      }
    }
    .playlist {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .song_form_head {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
      }
      .song_form {
        display: flex;
        .el-table {
          border-top: 4px solid red;
          .el-table-column {
            padding: 10px 0px;
          }
          .icon {
            display: flex;
            color: darkgrey;
          }
        }
      }
    }
  }
}
</style>