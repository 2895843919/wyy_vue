<template>
<div>123</div>
<div>123</div>
<div>123</div>
<div>123</div>
<div>123</div>
<div>123</div>
  <!-- <div class="right">

    <div class="right_top" v-if="$store.state.account_id">
      <div style="padding: 10px; display: flex">
        <div style="width: 90px; height: 90px; border: 1px solid #ccc">
          <img
            style="width: 100%; height: 100%; padding: 5px"
            :src="$store.state.login_img"
            alt=""
          />
        </div>
        <div style="padding-left: 20px">
          <p>{{ $store.state.account_nickname }}</p>
          <p
            style="
              padding-top: 5px;
              color: #999999;
              width: 50px;
              text-align: center;
              border-radius: 15px;
              border: 1px solid #ccc;
            "
          >
            <span v-show="$store.state.account_lever">
              lv.{{ $store.state.account_lever }}
            </span>
          </p>
        </div>

        <div></div>
      </div>
    </div>

    <div class="right_top" v-else>未登录</div>

    <div class="right_main">

      <div class="hotRecommend" style="margin: 5px 10px">
        <div class="hotRecommend_head">
          <span>入驻歌手</span>
          <span
            @click="$router.push('/discover/singer')"
            style="cursor: pointer"
            >查看全部</span
          >
        </div>
       
        <div class="hotRecommend_list" v-loading="loading">
          <ul v-for="item in singer_list.slice(0, 10)" :key="item.id">
            <li
              @click="
                go_singer_item(item.id, item.name, item.alias[0], item.picUrl)
              "
            >
              <div class="list_li">
                <div class="img">
                  <img
                    :src="item.picUrl"
                    style="width: 100%; height: 100%"
                    alt=""
                  />
                </div>

                <div class="information">
                  <p style="font-size: 14px; color: #333333">
                    {{ item.name }}
                  </p>
                  <p style="font-size: 12px; color: #666666">
                    {{ item.alias[0] }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import {
  Artist_list,

} from "@/utils/request.js";
export default {
  props: ["go_singer_item"],
  data() {
    return {
      singer_list: [],
    };
  },
  async create() {
    // await Artist_list({}).then((res) => {
    //     console.log(res);
    //   res.artists.forEach((item) => {
    //     item.picUrl = item.picUrl + "?param=130y130";
    //   });
    //   this.singer_list = res.artists;
    //   if (this.singer_list.length) {
    //     this.loading = !this.loading;
    //   }
    // });
  },
};
</script>

<style scoped lang="less">
.right {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  height: 100%;
  .right_top {
    padding: 20px;
    border-bottom: 1px solid #ccc;
  }
  right_main {
    padding: 20px;
  }
  .hotRecommend {
    box-sizing: border-box;
    padding: 5px 10px;
    .hotRecommend_head {
      display: flex;
      justify-content: space-between;
      height: 30px;
      border-bottom: 1px solid gray;
      span {
        font-size: 12px;
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
      justify-content: center;
      flex-direction: column;
      flex-wrap: wrap;
      li {
        margin: 10px 0px;
        height: 62px;
        list-style: none;

        .list_li {
          width: 100%;
          height: 100%;
          border: 1px solid rgb(224, 224, 224);
          display: flex;
          cursor: pointer;
          .img {
            // width: 62px;
            // height: 62px;
            width: 25%;
            height: 100%;
            // cursor: pointer;
          }
          .information {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: center;
          }
        }
        .list_li:hover {
          background-color: rgb(245, 241, 241);
        }
      }
    }
  }
}
</style>