<template>
  <!-- 个性化推荐 -->
  <div class="hotRecommend" v-if="$store.state.login_cookie">
    <div class="hotRecommend_head">
      <div style="width: 16px; height: 16px">
        <img
          style="width: 100%; height: 100%"
          src="@/static/imgs/圆圈.png"
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
                src="@/static/imgs/耳机.png"
                alt=""
              />
              <span style="color: #ccc; font: 20px '隶书'">{{
                filter_playCount(item.playcount)
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
  props: ["click_audioPlay",'go_taste','go_playlist','filter_playCount'],
  data() {
    return {
      recommendSongsList: [],
      selfStyleList: [],
      playlist_msg: [], //歌单所有信息
      playlist_tracks: [], //每首歌信息
    };
  },
  async created() {
    if(this.$store.state.login_cookie.trim()!=''){-
        await this.Recommend();
    } 
  
  },
  methods: {
    // 个性化  每日歌曲推荐+个性化推荐
  async  Recommend() {    
    await  recommend_resource({ cookie: this.$store.state.login_cookie }).then(
        (res) => {
          // 选择每日歌单推荐的前3个做为个性化推荐
          // console.log(res);
          this.selfStyleList = res.recommend.splice(0, 3);
        }
      );
    },
 
  },
    //   watch: {
    //   "$store.state.login_cookie" :(newv,oldv)=>{
    //     console.log(newv);
    //     if(newv.trim()!=''){
    //       console.log(newv);
    //       this.Recommend();
    //     }       
    //   }
    // }
};
</script>

<style lang="less" scoped>
.hotRecommend {
  box-sizing: border-box;

  .hotRecommend_head {
    display: flex;
    padding: 5px 20px;
    align-items: flex-end;
    align-items: center;
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