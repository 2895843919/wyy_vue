<template>
  <div>
    <div>
      <div>
        <el-table
          :row-class-name="tableRowClassName"
          @row-click="onRowClick"
          :data="playlist_tracks"
          style="width: 100%"
          :row-style="{ height: '30px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column type="index" width="54" height="25">
          </el-table-column>
          <!-- 播放 -->
          <el-table-column type="" width="45" height="30">
            <!-- <tamplate> -->
            <!-- <tamplate> -->
              <el-icon
                style="width: 25px; height: 40px; cursor: pointer"
                class="icon"
                @click="Song_detail(playlist_tracks)"
              >
                <VideoPlay style="width: 100%; height: 100%;vertical-align: middle"></VideoPlay>
              </el-icon>
            <!-- </tamplate> -->
          </el-table-column>

          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            label="歌曲标题"
            width="235"
            height="30"
          >
          </el-table-column>
          <el-table-column prop="duration" label="时长" width="110" height="30">
          </el-table-column>

          <el-table-column
            prop="artists[0].name"
            :show-overflow-tooltip="true"
            label="歌手"
            width="90"
            height="30"
          >
          </el-table-column>
          <el-table-column
            prop="album.name"
            :show-overflow-tooltip="true"
            label="专辑"
            height="30"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="floor">
      <footer_> </footer_>
    </div>
  </div>
</template>

<script>
import { search, song_url, dt_data, song_detail } from "../../utils/request.js";
import { VideoPlay } from "@element-plus/icons";
import footer_ from "../../components/footer_/index.vue";
export default {
  name: "search",

  data() {
    return {
      s: "", //搜索关键字
      type: 1,
      playlist_msg: [], //歌单所有信息
      playlist_tracks: [], //每首歌信息
      currentRowIndex: "", //el-table索引
    };
  },
  async created() {
    this.s = this.$route.query.s;
    await this.Search(this.s);
  },
  components: {
    video: VideoPlay,
  },

  methods: {
    Search(s) {
      search({ keywords: s, type: this.type }).then((res) => {

        this.playlist_msg = res;
        this.playlist_tracks = res.result.songs;
        console.log(this.playlist_tracks);
        this.$store.commit("saveSong_list", this.playlist_tracks);
        this.playlist_tracks.forEach((item) => {
          item.duration = dt_data(item.duration);
        });
      });
    },
    //
    //歌曲详情
    Song_detail(playlist_tracks) {
      setTimeout(() => {
        // 获取歌曲url
        song_url({ id: playlist_tracks[this.currentRowIndex].id }).then(
          (res) => {
            this.$store.commit("saveSong_url", res.data[0].url);
          }
        );
        this.$store.commit("saveNow_index", this.currentRowIndex);
        song_detail({
          ids: playlist_tracks[this.currentRowIndex].id,
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
    // el-table index
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 获取el-table index
    onRowClick(row) {
      this.currentRowIndex = row.index;
      this.$store.commit("saveNow_index", this.currentRowIndex);
    },
  },
  components: {
    footer_,
  },
  watch: {
    // 在所有页搜索更新搜索页
    "$route.query.s"(newv,oldv){
      // console.log(newv);
        search({ keywords: newv, type: this.type }).then((res) => {
        // console.log(res);
        this.playlist_msg = res;
        this.playlist_tracks = res.result.songs;
        console.log(this.playlist_tracks);
        this.$store.commit("saveSong_list", this.playlist_tracks);

        this.playlist_tracks.forEach((item) => {
          item.duration = dt_data(item.duration);
        });
      });
    }
  }
};
</script>

<style scoped>
</style>