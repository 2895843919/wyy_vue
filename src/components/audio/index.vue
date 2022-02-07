<template>
  <div class="audio">
    <div class="audio_box">
      <div class="audio_box_left">
        <!-- 上一曲，下一曲，暂停，播放 -->
        <div class="control" style="width: 150px">
          <img
            style="cursor: pointer"
            src="../../static/imgs/上一曲.png"
            alt=""
            @click="
              Song_detail(
                song_list_copy[
                  $store.state.now_index != 0
                    ? --$store.state.now_index
                    : $store.state.now_index
                ].id,
                this.$store.state.now_index++
              )
            "
          />
          <img
            style="width: 35px; height: 35px; cursor: pointer"
            ref="play_pause"
            @click="play_pause()"
            v-if="flag"
            src="../../static/imgs/播放_bottom.png"
            alt=""
          />
          <img
            style="width: 35px; height: 35px; cursor: pointer"
            ref="play_pause"
            @click="play_pause()"
            v-else
            src="../../static/imgs/暂停.png"
            alt=""
          />
          <img
            style="cursor: pointer"
            src="../../static/imgs/下一曲.png"
            alt=""
            @click="
              Song_detail(
                song_list_copy[
                  $store.state.now_index < $store.state.song_list.length - 1
                    ? ++$store.state.now_index
                    : $store.state.now_index
                ].id,
                this.$store.state.now_index--
              )
            "
          />
        </div>
        <!-- 歌曲图片 歌名  音乐时长-->
        <div class="song_msg" style="padding-left: 20px">
          <div
            style="
              width: 40px;
              height: 40px;
              min-width: 40px;
              min-height: 40px;
              border-radius: 15%;
            "
          >
            <img
              style="width: 100%; height: 100%; border-radius: 15%"
              :src="$store.state.song_img"
              alt=""
            />
          </div>

          <!--  -->
          <div class="block" style="width: 500px; padding-left: 10px">
            <div
              class="span"
              style="
                width: 500px;
                height: 32px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <span style="color: #e8e8e8; font-size: 16px; font-family: Arial"
                >{{ $store.state.song_name }}
              </span>
              <span
                style="padding: 0px 20px; color: #9b9b9b; font-family: Arial"
                >{{ $store.state.song_singer }}</span
              >
            </div>
            <el-slider
              ref="slider"
              @change="change_slider()"
              style="transform: translateY(-5px)"
              v-model="value"
            ></el-slider>
          </div>

          <div
            style="
              display: flex;
              height: 100%;
              transform: translateY(23px);
              padding-left: 20px;
            "
          >
            {{ dt_data(currentTime * 1000) }} / {{ $store.state.song_dt }}
          </div>
        </div>
      </div>

      <div
        class="audio_box_right"
        style="
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
        "
      >
        <!-- volumn_div -->
        <div style="display: flex; justify-content: center; padding-left: 20px">
          <div class="volumn" v-if="flag2">
            <el-slider
              @change="changed_volumn()"
              v-model="value1"
              vertical
              height="100px"
            >
            </el-slider>
          </div>

          <img
            @click="c_volumn()"
            style="width: 20; height: 20px; cursor: pointer"
            src="../../static/imgs/音量.png"
            alt=""
          />

          <img
            @click="drawer = true"
            style="width: 23; height: 23px; cursor: pointer; padding-left: 10px"
            src="../../static/imgs/音乐列表.png"
            alt=""
          />
          <span style="color: #aaa">{{ songs_list.length }}</span>

          <el-drawer title="播放列表" v-model="drawer">
            <div
              v-for="(item, index) in song_list_copy"
              :key="index"
              style="padding: 10px"
            >
              <div
                @mouseenter="mouseenter(index)"
                @mouseleave="mouseleave(index)"
              >
                <!-- 如果item hover -->
                <div style="display: flex" v-if="song_index == index">
                  <div
                    style="
                      height: 50px;
                      min-height: 50px;
                      width: 140px;
                      min-width: 140px;
                      justify-content: space-between;
                    "
                  >
                    <p
                      style="
                        width: 80px;
                        min-width: 80px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ item.name }}
                    </p>
                    <p
                      style="
                        width: 80px;
                        min-width: 80px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ item.ar[0].name }}
                    </p>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding-left: 10px;
                    "
                  >
                    <img
                      style="width: 30px; height: 30px"
                      src="../../static/imgs/播放.png"
                      alt=""
                      @click="Song_detail(item.id, index)"
                    />
                    <!-- <img style="width:25px;height:25px" src="../../static/imgs/播放.png" alt="">         -->
                  </div>
                </div>
                <!-- 如果没有hover -->
                <div style="height: 50px; min-height: 50px" v-else>
                  <p
                    style="
                      width: 150px;
                      min-width: 150px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.name }}
                  </p>
                  <p style="display: flex; justify-content: space-between">
                    <span style="color: #aaa">{{ item.ar[0].name }}</span>
                    <span style="color: #ccc">{{ item.dt }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { song_url, song_detail, dt_data } from "../../utils/request.js";
export default {
  data() {
    return {
      audio: new Audio(),
      flag: true, //播放和暂停
      flag2: false, //volumn的显示
      value: 0, //slider
      value1: 50, //音量
      oldvalue: 0,
      slider: "",
      step: 1,
      currentTime: 0,
      time: null,
      time2: null,
      timeout: 0, //

      audio_oldv: this.$store.state.song_url, //拿到song_url 避免created报错url
      audio_time: this.$store.state.song_time,
      songs_list: [], //歌单列表
      drawer: false,
      drawer_song_list_hover: true, //当歌单列表没有hover时显示的div
      song_index: null, //hover的歌曲
      song_list_copy: [], //原数据和vuex绑定，会改变其他页面值所以拷贝一下
      now_index: 0, //当前播放歌曲在歌单的index
    };
  },

  created() {
    //当网页刷新后点击上一次保存的歌曲
    this.currentTime = 0;
    this.flag = true;
    this.value = 0;
    this.timeout = Math.floor(
      (this.$store.state.song_time / 1000 / 100) * 1000
    );
    this.audio.currentTime = 0;
  },
  mounted() {    
    this.audio.src = sessionStorage.getItem('audio_oldv')
    console.log(this.audio.src);
    this.slider = this.$refs.slider;
    this.now_index = this.$store.state.now_index;
  },
  methods: {
    Song_url(id) {
      song_url(id).then((res) => {
        console.log(res);
      });
    },
    //   点击播放与暂停
    play_pause() {
      this.flag = !this.flag;
      this.step = 1;
      //清除定时器
      clearInterval(this.time);
      clearInterval(this.time2);
      
      this.songs_list = this.$store.state.song_list;
      //this.song_list_copy在没有点击任何列表歌曲 点击上一次保存的音乐时触发
      this.song_list_copy = JSON.parse(JSON.stringify(this.songs_list));

      //如果是暂停状态触发
      if (!this.flag) {
        this.audio.play();
        this.audio.volume = this.value1 / 100;
        this.time2 = setInterval(() => {
          this.value += this.step;
        }, this.timeout);

        this.time = setInterval(() => {
          this.currentTime += this.step;
          // 当播放时间介绍调用当前函数
          if (
            Math.floor(this.currentTime) + 1 >
            Math.floor(this.$store.state.song_time / 1000)
          ) {
            // this.flag = !this.flag;
            clearInterval(this.time);
            clearInterval(this.time2);

            this.audio.src = this.$store.state.song_url;
            this.currentTime = 0;
            this.flag = true;
            this.value = 0;
            this.audio.currentTime = 0;
            this.play_pause();
          }
        }, 1000);
      } else {
        // 播放状态点击触发
        this.step = 0;
        this.audio.pause();
      }
    },
    // 改变slider 同时改变audio的currentTime
    change_slider() {
      this.audio.currentTime =
        (Math.floor(this.$store.state.song_time / 1000) / 100) * this.value; // currentTime = 当前slider value
      this.currentTime =
        (this.$store.state.song_time / 1000 / 100) * this.value;
      console.log(this.currentTime);
    },
    // 显示volumn slider
    c_volumn() {
      this.flag2 = !this.flag2;
    },
    //改变value后对音乐音量做出修改
    changed_volumn() {
      this.audio.volume = this.value1 / 100;
      console.log(this.value1);
    },
    //上一曲
    preSong() {},
    //下一曲
    nextSong() {},
    //
    //歌曲详情
    Song_detail(i, index) {
      // this.$store.commit('saveNow_index',this.now_index)
      song_url({ id: i }).then((r) => {
        this.$store.commit("saveSong_url", r.data[0].url);
        //在获取url之后获取歌曲信息，避免watch url时出现time先执行导致audio报错
      });
      setTimeout(() => {
        // 在el-drawer 中改变now_index
        this.$store.commit("saveNow_index", index);
        song_detail({ ids: i }).then((res) => {
          // console.log(res);
          this.$store.commit("saveSong_img", res.songs[0].al.picUrl);
          this.$store.commit("saveSong_name", res.songs[0].name);
          this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
          this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));
          this.$store.commit("saveSong_time", res.songs[0].dt);

          // 获取歌曲url
        });
      }, 0);
    },
    //格式化时间
    dt_data(t) {
      let n = t / 1000;
      let number =
        (Math.floor(n / 60) < 10 ? "0" + Math.floor(n / 60) : "") +
        ":" +
        (Math.floor(n % 60) < 10
          ? "0" + Math.floor(n % 60)
          : Math.floor(n % 60));
      return number;
    },
    mouseenter(index) {
      this.song_index = index;
      // this.now_index=index
    },
    mouseleave() {
      this.song_index = null;
    },
  },

  watch: {
    //对audio_url监听
    "$store.state.song_url"(newv, oldv) {
      this.currentTime = 0;
      this.flag = true;
      this.value = 0;
      this.audio.src = newv;
     
      sessionStorage.setItem('audio_oldv',oldv)

       this.audio_oldv = sessionStorage.getItem('audio_oldv')
      // console.log(this.audio_oldv);
      this.audio.currentTime = 0;
      //  this.timeout = Math.floor((newv / 1000 / 100) * 1000);
    },
    //监听歌曲时间的更新
    "$store.state.song_time"(newv, oldv) {
      this.timeout = Math.floor((newv / 1000 / 100) * 1000);
      this.play_pause();
    },
  },
};
</script>

<style  lang="less">
.audio {
  //   opacity: 0.99;

  width: 100%;
  min-width: 1100px;
  display: flex;
  justify-content: center;
  background-color: #333333;
  position: fixed;
  bottom: 0px;
  height: 50px;

  .audio_box {
    width: 1100px;
    height: 100%;
    display: flex;
    // justify-content: space-between;
    .audio_box_left {
      display: flex;
      flex-direction: row;
      // background-color: red;
      .control {
        height: 100%;
        //   background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          padding: 0 5px;
          width: 30px;
          height: 30px;
          //   width: 20%;
          //   height: 20%;
        }
      }
      .song_msg {
        height: 100%;
        // width: 800px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .block {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          .span {
            transform: translateY(15px);
          }
        }
      }
    }
    .audio_box_right {
      position: relative;

      .volumn {
        height: 130px;
        // line-height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 95px;
        background-color: #333333;
        opacity: 0.8;
        transform: translateY(-135px);
      }
    }
  }
}

.el-drawer {
  overflow: scroll;
}
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>