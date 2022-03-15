<template>
  <div class="hotRecommend">
    <div class="hotRecommend_head">
      <div style="width: 16px; height: 16px">
        <img
          @click="go_album_item(item.id)"
          style="width: 100%; height: 100%"
          src="@/static/imgs/圆圈.png"
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
</template>

<script>
import {

  album_new,
} from "@/utils/request.js";
export default {
  props: ["go_album_item", "go_album"],
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
  async created() {
    await this.Album_new()
  },
  methods: {
    async Album_new() {
      album_new().then((res) => {
        this.weekData = res.albums.splice(0, 10);
        this.weekData.forEach((item) => {
          item.picUrl = item.picUrl + "?param=100y100";
        });
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