<template>
  <div class="headBox">
    <div class="m_top">
      <div class="wrap">
        <div class="wrap_left">
          <!-- logo -->
          <div class="logo">
            <img src="../..//static/imgs/网易云音乐.png" alt="" />
            <h1>网易云音乐</h1>
          </div>
          <!-- nav -->
          <div class="m_nav">
            <ul class="nav_ui" ref="nav_ui">
              <li>
                <router-link
                  class="router_link"
                  to="/discover"
                  active-class="active"
                  >发现音乐</router-link
                >
              </li>
              <li>
                <router-link class="router_link" to="/my" active-class="active">
                  我的音乐</router-link
                >
              </li>
              <!-- <li>
                <router-link class="router_link" to="/my" active-class="active">
                  排行榜</router-link
                >
              </li> -->
            </ul>
          </div>
        </div>

        <div class="wrap_right">
          <div class="search">
            <el-input
              class="el_input"
              placeholder="请输入内容"
              v-model="input"
              maxlength="250px"
              @keyup.enter="go_search"
            >
              <template #prefix>
                <el-icon class="el_input_icon"> <search /> </el-icon>
              </template>
            </el-input>
          </div>

          <div class="login">
            <span v-if="!$store.state.login_cookie" @click="Login()">登录</span>
            <div v-else-if="$store.state.login_cookie">
              <el-dropdown size="mini">
                <!-- 头像 -->
                <el-avatar class="avatarUrl_img" :src="$store.state.login_img">
                </el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="Logout()">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 红色下划线 -->
    <div class="red_cline">
      <!-- 123 -->
      <div class="wrap_find_ul" v-if="$route.path.includes('discover')">
        <ul>
          <li>
            <router-link class="router_link" to="/discover/recommend">
              推荐</router-link
            >
          </li>
          <li>
            <router-link
              class="router_link"
              :to="{ name: 'playlist_all', query: { cat: '全部' } }"
            >
              歌单</router-link
            >
          </li>
          <!-- <li>
            <router-link class="router_link" to="/discover/song_list" >
              排行榜</router-link
            >
          </li> -->
          <!-- <li>
            <router-link class="router_link" to="/discover/song_list">
              电台</router-link
            >
          </li> -->
          <li>
            <router-link class="router_link" to="/discover/singer">
              歌手</router-link
            >
          </li>
          <li>
            <router-link class="router_link" to="/discover/album">
              新碟上架</router-link
            >
          </li>
        </ul>
      </div>

      <div v-else></div>
    </div>

    <login-box
      @EditClose="EditClose"
      ref="loginBox"
      v-show="loginFlag"
    ></login-box>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { Search } from "@element-plus/icons-vue";
import {
  login,
  logout,
  status,
  account,
  login_refresh,
  user_level,
} from "../../utils/request.js"; //登录函数
import loginBox from "../../views/loginBox/loginBox.vue";

export default {
  data() {
    return {
      input: "",
      cookie: "",
      loginFlag: false,
    };
  },
  components: {
    Search,
    loginBox,
  },
  computed: {
    ...mapState(["login_data"], ["login_cookie"]),
  },
  mounted() {
    // console.log(this.$refs.loginBox.flag);
  },
  created() {},
  methods: {
    // 登录
    Login() {
      this.loginFlag = true;
      // login({ phone: "18571513020", password: "20011012.." })
      //   .then((res) => {
      //     this.$store.commit("saveDate", res);
      //     this.$store.commit("saveCookie", res.cookie);
      //     this.$store.commit("saveImg", res.profile.avatarUrl);
      //     this.$store.commit("saveAccountId", res.account.id);
      //     this.Account()
      //     this.User_level()
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    EditClose(v) {
      this.loginFlag = v;
      // console.log(v);
    },

    // 退出登录
    Logout() {
      logout();
      this.$store.commit("saveDate", "");
      this.$store.commit("saveCookie", "");
      this.$store.commit("saveAccountId", "");
      this.$store.commit("saveImg", "");
      this.$store.commit("saveLever", "");
      this.$store.commit("saveNickName", "");

ElMessage({
  message: '退出登录',
  type: 'info'
})
  //      ElNotification({
  //   title: 'Title',
  //   message: h('i', { style: 'color: teal' }, '退出登录'),
  // })


    },
    // 获取账号信息
    Account() {
      account({ cookie: this.$store.state.login_cookie })
        .then((res) => {
          this.$store.commit("saveNickName", res.profile.nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    User_level() {
      user_level({ cookie: this.$store.state.login_cookie }).then((res) => {
        this.$store.commit("saveLever", res.data.level);
      });
    },

    //刷新登录
    Login_refresh() {
      login_refresh().then((res) => {
        // console.log(res);
      });
    },
    go_search() {
      this.$router.push({
        path: "/search",
        query: {
          s: this.input,
        },
      });
    },
  },

  watch: {
    "$refs.loginBox.flag"(newv, oldv) {
      console.log(newv, oldv);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}

.headBox {
  border-top: 1px solid black;

  display: flex;
  flex-direction: column;
  .m_top {
    border-bottom: 0.5px solid black;
    background-color: #292828;
    min-width: 1200px;
    display: flex;
    justify-content: center;
    .wrap {
      width: 1200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .wrap_left {
        display: flex;
        .logo {
          display: flex;
          width: 200px;
          height: 70px;

          img {
            transform: translateY(18px);
            width: 35px;
            height: 35px;
          }
          h1 {
            padding: 0 5px;
            width: 150px;
            font-family: Garamond, serif;
            transform: translateY(3px);
            line-height: 70px;
            height: 70px;
            color: white;
            display: inline-block;
          }
        }

        .m_nav {
          ul {
            list-style-type: none;
            display: flex;
            li {
              text-align: center;
              width: 90px;
              .router_link {
                width: 100%;
                text-decoration: none;
                color: white;
                display: block;
                line-height: 70px;
                height: 70px;
              }
              color: gainsboro;
              font-size: 18px;
              cursor: pointer;
            }
            li:hover {
              background-color: black;
            }
          }
        }
      }

      // 搜索框和头像
      .wrap_right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .search {
          padding: 0 20px;
          .el_input {
            border-radius: 25px;
            .el_input_icon {
              line-height: 40px;
              transform: translateY(1.5px);
            }
          }
        }

        .login {
          width: 50px;
          padding: 0 15px 0 5px;
          color: darkgray;
          span {
            cursor: pointer;
          }
          span:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
//
.red_cline {
  min-width: 1100px;
  text-align: center;
  display: flex;
  justify-content: center;
  // height: 40px;
  min-height: 5px;
  background-color: red;
  .wrap_find_ul {
    // margin-left: 200px;
    width: 1100px;
    display: flex;

    ul {
      margin-left: 200px;
      height: 100%;
      line-height: 40px;
      list-style-type: none;
      display: flex;
      li {
        transform: translateX(6px);
        padding: 0 25px;
        color: white;
        cursor: pointer;
        .router_link {
          text-decoration: none;
          color: white;
          font-size: 14px;
        }
      }
    }
  }
}

.active {
  background-color: black;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  // z-index:1000;
}
</style>