<template>
  <div class="main">
    <div class="hotRecommend">
      <div>
        <div>
          <!-- 热门推荐 -->
          <div class="hotRecommend_head">
            <div style="width: 16px; height: 16px">
              <img
                style="width: 100%; height: 100%"
                src="../../static/imgs/圆圈.png"
                alt=""
              />
            </div>
            <span class="headLine">热门推荐</span>
          </div>
          <div class="hotRecommend_list">
            <ul v-for="item in weekData" :key="item.id">
              <li>
                <div class="list_li">
                  <img
                    @click="go_playlist(item.id)"
                    :src="item.picUrl"
                    style="width: 100%; height: 100%"
                    alt=""
                  />
                </div>
                <p
                  style="
                    width: 150px;
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
                    width: 150px;
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
        <!-- 全部新碟 -->
        <div class="hotRecommend_head">
          <div style="width: 16px; height: 16px">
            <img
              style="width: 100%; height: 100%"
              src="../../static/imgs/圆圈.png"
              alt=""
            />
          </div>
          <span class="headLine">全部新碟</span>
        </div>
        <div class="hotRecommend_list">
          <ul v-for="item in playlist_hight" :key="item.id">
            <li>
              <div class="list_li">
                <img
                  @click="go_playlist(item.id)"
                  :src="item.picUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
              <p
                style="
                  width: 150px;
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
                  width: 150px;
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
        <div>
          <el-pagination
            style="text-align: center"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :total="300"
            :page-size="page.pagesize"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { top_album, album_new, album_new_offset } from "../../utils/request.js";
export default {
  name: "album",
  data() {
    return {
      weekData: [], //
      totalData: [],
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
      playlist_imgs: [],
    };
  },
  async created() {
    window.scrollTo(0,0)
    await this.Top_album();
    await this.Album_new();
  },
  methods: {
    //新碟上架
    Top_album() {
      top_album().then((res) => {
        console.log("top");
        this.weekData = res;
        console.log(res);
        this.weekData.forEach((item) => {
          item.picUrl = item.picUrl + "?param=130y130";
        });
      });
    },
    Album_new() {
      album_new().then((res) => {
        this.totalData = res.albums;
        this.total = res.total;
        this.page.tableData = res.albums;
        this.page.tableData.forEach((item) => {
          item.picUrl = item.picUrl + "?param=130y130";
        });
        this.playlist_hight = this.page.tableData.slice(
          this.page.pre,
          this.page.pre + 20
        );
      });
      //先给几页数据页面加载，渲染过程中继续请求并concat
      let i = 0;
      let time1 = setInterval(async () => {
        await album_new_offset({
          offset: 100,
        }).then((res) => {
          i += 100;
                  this.page.tableData = this.page.tableData.concat(res.albums);
                  this.page.tableData.forEach(item=>{
              item.picUrl=item.picUrl+"?param=130y130"
                  })
        });
        console.log(i);
        if (i >= 300) {
          clearInterval(time1);
        }
      }, 300);
    },

    // 跳转对应专辑页面
    go_playlist(id) {
      console.log(id);
      this.$router.push({
        // name:'album_item',
        path: "/album_item",
        query: {
          id: id,
        },
      });
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
      console.log(val, this.page.currentPage);
      // if (this.page.currentPage >= this.page.tableData.length / 20) {
      //   let page = Math.ceil(this.page.currentPage / 5);
      //   // for 循环解决el-pagination 的逆向数组添加/解决只能顺序点击page触发的concat，通过页码判断执行几次接口请求，添加几次数组
      //   for (let i = 0; i < page-1; i++) {
      //     await album_new_offset({
      //       s
      //     })
      //       .then((res) => {
      //         console.log(res);
      //         this.page.tableData = this.page.tableData.concat(res.albums);
      //         this.page.tableData.forEach(item=>{
      //     item.picUrl=item.picUrl+"?param=130y130"
      //   })
      //         this.playlist_hight = this.page.tableData.slice(
      //           this.page.pre,
      //           this.page.pre + 20
      //         );

      //   // console.log(this.playlist_imgs[0]);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   }
      // }
    },
    //
  },
};
</script>

<style scoped lang="less">
.hotRecommend {
  box-sizing: border-box;

  .hotRecommend_head {
    display: flex;
    padding: 10px 20px;
    align-items: flex-end;
    align-items: center;
    margin: 20px;
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
      margin-left: 300px;
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
          .week {
            height: 20px;
            width: 100%;
            text-align: center;
          }
          .day {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
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