<template>
  <!-- {{$route.query.id}} -->
  <div class="container">
    <div class="left" style="display:flex;flex-direction:column;padding:10px">
      <!-- 歌手信息 -->
      <div style="display:flex;flex-direction:column;">
        <!-- 歌手名字  -->
        <div style="width: 100%; height: 100%">
          <span style="font-size: 26px">{{ $route.query.name }}</span>
          <span style="padding: 0px 12px; color: #ccc">{{
            $route.query.nick
          }}</span>
        </div>
        <!-- 图片 -->
        <div style="width:100%;posit " >
          <img
            style="width: 100%; height: 100%; padding-top: 10px"
            :src="$route.query.img"
            alt=""
          />
          <!--  -->
        </div>
      </div>
      <!-- 列表 -->
      <div class="song_form">
        <el-table
          ref="test"
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
            <tamplate>
              <el-icon
                style="width: 25px; height: 40px; cursor: pointer"
                class="icon"
                @click="Song_detail(playlist_tracks)"
              >
                <VideoPlay
                  style="width: 100%; height: 100%; vertical-align: middle"
                ></VideoPlay>
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

        <!-- {{item.name}} -->
      </div>
    </div>
    <div class="right" style="display:flex;flex-direction:column;padding:20px 10px">
      <div style="padding: 10px 10px;border-bottom: 1px dotted #ccc;" >相似歌手</div>

      <div
        style="
        
          display: flex;
          flex-direction: row;
          flex-flow: wrap;
        "
      >
        <div
          v-for="(item, index) in simi_list"
          :key="index"
          style="
            padding: 5px 10px;
            display: flex;
            flex-direction: column;
            cursor: pointer;
          "
          @click="
            go_singer_item(item.id, item.name, item.alias[0], item.picUrl)
          "
        >
          <div style="">
            <img :src="item.picUrl" alt="" />
          </div>

          <p
            style="
              width: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #666666;
              font-size: 12px;
            "
          >
            {{ item.name }}
          </p>

          <!-- </div>              -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 歌曲详情，相似歌手
import {
  Artist_detail,
  song_url,
  dt_data,
  song_detail,
  artists,
  simi_artist,
} from "../../utils/request.js";
export default {
  data() {
    return {
      id: "",
      singer_info: [],
      head_img: "",

      playlist_msg: [], //歌单所有信息
      playlist_tracks: [],
      currentRowIndex: "", //el-table索引
      simi_list: [], //相似歌手
      a: 123,
    };
  },
  async created() {
    window.scrollTo(0,0)
    this.id = this.$route.query.id;
    this.head_img = this.$route.query.img;

    await this.Artists(this.id);
    await this.Simi_artist();
  },
  methods: {
    // 歌单详情
    Artists(id) {
      artists({ id: id })
        .then((res) => {
          // console.log(res);
          this.playlist_msg = res;
          this.playlist_tracks = res.hotSongs;
          this.$store.commit("saveSong_list", this.playlist_tracks);

          this.playlist_tracks.forEach((item) => {
            item.dt = dt_data(item.dt);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //歌曲详情
    Song_detail(playlist_tracks) {
      setTimeout(() => {
        // 获取歌曲url
        //  console.log(playlist_tracks[this.currentRowIndex].privilege.id);
        song_url({
          id: playlist_tracks[this.currentRowIndex].privilege.id,
        }).then((res) => {
          console.log(res);
          this.$store.commit("saveSong_url", res.data[0].url);

          song_detail({
            ids: playlist_tracks[this.currentRowIndex].privilege.id,
          }).then((res) => {
            console.log(res);
            this.$store.commit("saveSong_img", res.songs[0].al.picUrl);
            this.$store.commit("saveSong_name", res.songs[0].name);
            this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
            this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));
            this.$store.commit("saveSong_time", res.songs[0].dt);
          });
        });
      }, 0);
      this.$store.commit("saveNow_index", this.currentRowIndex);
    },
    // el-table index
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 获取el-table index
    onRowClick(row) {
      this.currentRowIndex = row.index;
      this.$store.commit("saveNow_index", this.currentRowIndex);
      // console.log(this.currentRowIndex);
    },
    //相似歌手
    Simi_artist() {
      simi_artist({ id: this.id }).then((res) => {
        this.simi_list = res.artists.slice(0, 6);
        this.simi_list.forEach((item) => {
          item.picUrl = item.picUrl + "?param=50y50";
        });
        console.log(this.simi_list);
      });
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

  watch: {
    "$route.query.id"(newv, oldv) {
      // this.Artists(newv)
      console.log(newv);
      // location.reload()

      artists({ id: newv })
        .then((res) => {
          this.playlist_msg = res;
          this.playlist_tracks = res.hotSongs;

          this.$store.commit("saveSong_list", this.playlist_tracks);

          this.playlist_tracks.forEach((item) => {
            item.dt = dt_data(item.dt);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
  align-content: center;

  .left {
    flex: 1;
    justify-content: center;
    align-content: center;
    // background-color: red;
    border-right: 1px solid #ddd;
  }
  .right {
    // background-color: red;
    width: 270px;
    max-width: 270px;
    height: 200px;
    // line-height: 200px;
    display: flex;
    flex-direction: row;
  }
}
</style>