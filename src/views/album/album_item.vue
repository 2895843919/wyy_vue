<template>
  <!-- 歌单里  -->    
  <div class="main">
    <!-- {{$route.query.id}} -->
    
    <!-- 歌单信息  图片，标题 标签 -->
    <div class="head">
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
        <!-- 标签 -->
      
        <!-- 介绍 -->
        <div v-if="description != ''">介绍： {{ description }}</div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="playlist">
      <div class="song_form_head">
        <div>
          <span style="font-size: 28px; font-weight: 200; padding-right: 20px">
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
                style="width: 25px; height: 40px;cursor:pointer"
                class="icon"
                @click="Song_detail(playlist_tracks)"
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

        <!-- {{item.name}} -->
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <div class="comment_head">
        <!-- 评论头部 -->
        <div>
          <span style="font-size: 28px; font-weight: 200; padding-right: 20px"
            >评论</span
          >
          共{{ commentCount }} 条评论
        </div>
      </div>
      <!-- 我的评论 -->
      <div></div>
      <!-- 最新评论 -->
      <div class="new_comment" style="border-bottom: 1px solid #ddd">
        <!-- <div class="new_comment_head">最新评论()</div> -->
        <div class="new_comment_main" v-for="item in page.show_comment" :key="item">
          <div style="width: 50px; height: 50px">
            <img
              style="widht: 100%; height: 100%"
              :src="item.user.avatarUrl"
              alt=""
            />
          </div>
          <div class="context">
            <div class="name">
              <span style="color:#0c73c2;font-size:12px">{{ item.user.nickname }}</span>
               : 
               <span style="font-size:12px"> {{ item.content }}</span>
              
            </div>
            <div class="time">{{ item.timeStr }}</div>
          </div>
        </div>
        <el-pagination
          style="text-align: center"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          
          :current-page="page.currentPage"
          :total="page.tableData.length"
          :page-size="page.pagesize"
         
        >
        </el-pagination>
      </div>
    </div>
  </div>
  <div class="aside"></div>
</template>

<script> 
import {
  playlist_detail,
  comment_playlist,
  recommend_resource,
  song_detail,
  dt_data,
  song_url,
  album_new,
  top_album_list,
  Comment_album
} from "../../utils/request.js";
import { VideoPlay} from "@element-plus/icons";

export default {
    name:'album_item',
//   props: ["id"],
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
      comments: [], //最新评论

      page: {
        currentPage: 1, // 当前页码
        pagesize: 20, // 每页显示的行数
        tableData: [], // 表格数据
        show_comment: [],  //table依赖的评论数据
        pre: 0,           
      },
      currentRowIndex: "", //el-table索引
      id:''   //album传过来的id
    };
  },
  async created() {
      this.id=this.$route.query.id
    await this.top_album_list(this.id);   //获取专辑内容
    await this.Comment_album(this.id)  //获取评论内容
  },
  components: {
    video_play: VideoPlay,
  },
  methods: {
    // 歌单详情
    top_album_list(id) {
      top_album_list({ id })
        .then((res) => {
            // console.log(res);
          this.playlist_msg = res.album;
          this.playlist_img = res.album.picUrl;
          // 歌曲列表 data
          this.playlist_tracks = res.songs;  
 
          this.$store.commit('saveSong_list',this.playlist_tracks)
          this.playlist_title = res.album.name;        
          this.description = res.album.description;

          this.commentCount = res.album.info.commentCount;
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
        console.log(playlist_tracks[0].al.id);
      setTimeout(() => {
          // 获取歌曲url
        song_url({id:playlist_tracks[this.currentRowIndex].id}).then(res=>{
          this.$store.commit("saveSong_url", res.data[0].url);
        })
        this.$store.commit('saveNow_index',this.currentRowIndex)
        song_detail({
          ids: playlist_tracks[this.currentRowIndex].id,
        }).then((res) => {
            // console.log(res);
          this.$store.commit("saveSong_img", res.songs[0].al.picUrl);
          this.$store.commit("saveSong_name", res.songs[0].name);
          this.$store.commit("saveSong_singer", res.songs[0].ar[0].name);
          this.$store.commit("saveSong_dt", dt_data(res.songs[0].dt));            
          this.$store.commit("saveSong_time",res.songs[0].dt);  
          
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
      this.$store.commit("saveNow_index",this.currentRowIndex);   
    },
    // 获取歌单评论
    Comment_album(id) { 
      Comment_album({ id }).then((res) => {
        this.page.tableData = res.comments;    
        this.comments = res.comments;
        this.page.show_comment = this.comments.slice(
          this.page.pre,
          this.page.pre + 20
        );
      });
    },

    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.page.pre = 20 * (val - 1);
      this.page.show_comment = this.comments.slice(
        this.page.pre,
        this.page.pre + 20
      );
    },
    
    handleSizeChange(val) {
      this.page.pagesize = val;
    },
  },

  watch: {
  },
};
</script>

<style scoped lang="less">
.main {
  // border-right:1px solid #dddddd;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 770px;
  .head {
    width: 100%;
    display: flex;
    padding: 50px 0px;
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
    display: flex;
    width: 100%;
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

  .comment {
    padding: 30px 0px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;

    .comment_head {
      padding: 5px 0px;
      border-bottom: 3px solid red;
    }

    .new_comment {
      margin: 20px 0px;
      padding: 5px 0px;

      .new_comment_head {
      }
      .new_comment_main {
        border-top: 1px dotted #ddd;
        padding: 10px 0px;
        display: flex;
        .context {
           padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>