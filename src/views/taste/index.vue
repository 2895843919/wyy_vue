// 每日推荐歌单
<template>
  <div class="main">
    <!-- 歌曲列表 -->
    <div class="playlist">
      <div>
        <div class="song_form_head">
          <span style="font-size: 28px; font-weight: 200; padding-right: 20px">
            歌曲列表
          </span>
          <!-- {{ playlist_msg}}首歌 -->
        </div>
        <div class="song_form">
          <el-table
            :data="playlist_tracks"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            style="width: 100%"
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
                  key=""
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
  recommend_songs,
  dt_data,
  song_detail,
  song_url,
} from "../../utils/request.js";
import { Location, VideoPlay, Back } from "@element-plus/icons";

export default {
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

      currentRowIndex: "", //el-table索引
    };
  },
  components: {
    video_play: VideoPlay,
  },

  async created() {
    await this.Recommend_songs();
  },

  methods: {
    // 推荐歌单详情
    Recommend_songs() {
      recommend_songs({ cookie: this.$store.state.login_cookie })
        .then((res) => {
          // console.log(res);
          this.playlist_msg = res;
          this.playlist_tracks = res.data.dailySongs;
          this.$store.commit("saveSong_list", this.playlist_tracks);
          this.playlist_tracks.forEach((item) => {
            item.dt = dt_data(item.dt);
          });
          // console.log(this.playlist_tracks);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //歌曲详情
    Song_detail(playlist_msg) {
      setTimeout(() => {
        // console.log(playlist_msg.data.dailySongs[this.currentRowIndex].id);
        // 获取歌曲url
        song_url({
          id: playlist_msg.data.dailySongs[this.currentRowIndex].id,
        }).then((res) => {
          this.$store.commit("saveSong_url", res.data[0].url);
        });
        // 当前播放歌曲在列表的index
        this.$store.commit("saveNow_index", this.currentRowIndex);
        song_detail({
          ids: playlist_msg.data.dailySongs[this.currentRowIndex].id,
        }).then((res) => {
          // console.log(res);
          this.$store.commit("saveSong_img", res.songs[0].al.picUrl);
          this.$store.commit("saveSong_name", res.songs[0].name);
          this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
          this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));

          this.$store.commit("saveSong_time", res.songs[0].dt);
        });
      }, 0);
    },
    //
    onRowClick(row) {
      this.currentRowIndex = row.index;
      // console.log(this.currentRowIndex);
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  width: 770px;
  .playlist {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    .song_form_head {
      display: flex;
      justify-content: space-between;
      // height: 40px;
      line-height: 40px;
    }
    .song_form {
      display: flex;
      .el-table {
        border: 1px solid #dddddd;
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
</style>