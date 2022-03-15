<template>
  <!-- 热门推荐 -->
  <div class="hotRecommend">
    <div class="hotRecommend_head">
      <div style="width: 16px; height: 16px">
        <img
          style="width: 100%; height: 100%"
          src="@/static/imgs/圆圈.png"
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
              v-lazy="item.picUrl"
              style="width: 100%; height: 100%"
              alt=""
            />
            <div class="buttom">
              <img
                style="width: 20px; height: 20px; padding: 10px"
                src="@/static/imgs/耳机.png"
                alt=""
              />
              <span style="color: #ccc; font: 20px '隶书'">{{
                filter_playCount(item.playCount)
              }}</span>
              <img
                @click="click_audioPlay(item.id)"
                class="icon_play"
                style="width: 26px; height: 26px"
                src="@/static/imgs/播放.png"
                alt=""
              />
            </div>
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  hotPlaylist,
  recommend_songs_list,
  recommend_songs,
  recommend_resource,
  song_detail,
  playlist_detail,
  dt_data,
  song_url,
  album_new,
} from "@/utils/request.js";
export default {
  props: ['filter_playCount','go_playlist_all','click_audioPlay','go_playlist'],
  data() {
    return {
      recommendSongsList: [], //推荐歌单
      selfStyleList: [], //个性化推荐
      weekData: [], //最新上架album
      singer_list: [], //热门歌手
      loading: true,
      playlist_msg: [], //歌单所有信息
      playlist_tracks: [], //每首歌信息
    };
  },
 async  created () {
    await this.Recommend_songs_list()  
  },
  methods: {
    // 推荐歌单
    async Recommend_songs_list() {
      recommend_songs_list()
        .then((res) => {
          res.result.forEach((item) => {
            item.picUrl = item.picUrl + "?param=140y140";
          });
          this.recommendSongsList = res.result;
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
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
            background: linear-gradient(rgb(167, 159, 159), rgb(246, 246, 252));
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
</style>