<template>
  <div class="container">
    <div class="left">
      <!-- 推荐 -->
      <div>
        <div
          v-for="(item, index) in singer_type_list"
          :key="index"
          style="border-bottom: 1px dotted #ccc; padding: 10px 0px"
        >
          <h3 style="padding: 0px 20px; color: #666666">{{ item.title }}</h3>
          <ul
            style="padding: 5px 30px"
            v-for="(i, size) in item.item_type"
            :key="size"
          >
            <li
              style="
                padding: 5px 5px;
                list-style-type: square;
                color: #333333;
                font-size: 14px;
                cursor: pointer;
              "
              @click="click_singer_list(item.area, size + 1)"
            >
              {{ i }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="hotRecommend">
        <div class="hotRecommend_head">
          <span class="headLine">入驻歌手</span>
        </div>
        <!-- 100位热门歌手前20名 -->
        <div class="hotRecommend_list" v-loading="loading">
          <ul v-for="item in singer_list.slice(20, 30)" :key="item.id">
            <li>
              <div class="list_li">
                <img
                  @click="
                    go_singer_item(
                      item.id,
                      item.name,
                      item.alias[0],
                      item.picUrl
                    )
                  "
                  :src="item.picUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>

        <div class="hotRecommend_head">
          <span class="headLine">热门推荐</span>
        </div>

        <div class="hotRecommend_list" v-loading="loading">
          <ul v-for="item in singer_list.slice(0, 10)" :key="item.id">
            <li>
              <div class="list_li">
                <img
                  @click="
                    go_singer_item(
                      item.id,
                      item.name,
                      item.alias[0],
                      item.picUrl
                    )
                  "
                  :src="item.picUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>

        <!--100喂热门歌手后80位名字 -->
        <div class="hotRecommend_list_name">
          <ul v-for="(item,index) in singer_list" :key="index">
            <li>
              <span
                style="cursor: pointer"
                @click="
                  go_singer_item(item.id, item.name, item.alias[0], item.picUrl)
                "
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Artist_list } from "../../utils/request.js";

export default {
  data() {
    return {
      singer_list: [], //热门歌手
      singer_type_list: [
        { title: "推荐", item_type: ["推荐歌手"] },
        {
          title: "华语",
          item_type: ["华语男歌手", "华语女歌手", "华语组合/乐队"],
          area: 7,
        },
        {
          title: "欧美",
          item_type: ["欧美男歌手", "欧美女歌手", "欧美组合/乐队"],
          area: 96,
        },
        {
          title: "日本",
          item_type: ["日本男歌手", "日本女歌手", "日本组合/乐队"],
          area: 8,
        },
        {
          title: "韩国",
          item_type: ["韩国男歌手", "韩国女歌手", "韩国组合/乐队"],
          area: 16,
        },
      ], //推荐，欧美等类型
      loading:true
    };
  },
  async mounted() {
    await Artist_list({}).then((res) => {
      res.artists.forEach((item) => {
        item.picUrl = item.picUrl + "?param=130y130";
       
      });
      this.singer_list = res.artists;
      if(this.singer_list.length){
        this.loading=!this.loading
      }
    });
  },
  methods: {
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
    //
    async click_singer_list(area, type) {
      await Artist_list({ area: area, type: type }).then((res) => {
        res.artists.forEach((item) => {
          item.picUrl = item.picUrl + "?param=130y130";
        });
        this.singer_list = res.artists;
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  .left {
    width: 200px;
    padding: 30px 10px;
    border-right: 1px solid #ddd;
  }
  .right {
    flex: 1;
    padding: 30px;
    .hotRecommend {
      box-sizing: border-box;
      .hotRecommend_head {
        display: flex;
        height: 40px;
        border-bottom: 3px solid red;

        .headLine {
          font-size: 23px;
          font-weight: lighter;
        }
        //   span {
        //     cursor: pointer;
        //   }
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
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          margin: 10px 22px;
          width: 110px;
          height: 170px;
          list-style: none;

          .list_li {
            img {
              cursor: pointer;
            }
          }
        }
      }

      .hotRecommend_list_name {
        border-top: 1px dotted #ccc;
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          padding: 10px 20px;
          width: 110px;
          list-style: none;
        }
      }
    }
  }
}
</style>