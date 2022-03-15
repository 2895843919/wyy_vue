<template>
  <div class="container" v-drag>
    <div class="login-form">
      <span class="close" @click="close">×</span>
      <div class="text">登录</div>
      <div class="form-item">
        <input type="text" v-model="phone" placeholder="用户名" />
        <input type="password" v-model="password" placeholder="密码" />
      </div>
      <div class="btn" @click="Login">登录</div>
      <div class="btn-back"></div>
      <div class="other">没有账号？<a href="#">去注册</a></div>
    </div>
  </div>
</template>

<script>
import {
  login,
  account,
  login_refresh,
  user_level,
} from "../../utils/request.js"; //登录函数
export default {
  props: ["loginFlag"],
  data() {
    return {
      phone: "18571513020",
      password: "20011012..",
 
    };
  },
  methods: {
    Login() {
      login({ phone: "18571513020", password: "20011012.." })
        .then((res) => {
          this.$store.commit("saveDate", res);
          this.$store.commit("saveCookie", res.cookie);
         
          this.$store.commit("saveImg", res.profile.avatarUrl);
          this.$store.commit("saveAccountId", res.account.id);
          // this.Account();
          // this.User_level();
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          this.$emit("EditClose", false);
          this.$router.go(0)
         
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //关闭loginbox
    close() {
      this.$emit("EditClose", false);
    },
  },
  directives: {
    drag(el) {
      let oDiv = el; // 当前元素
      let self = this; //上下文
      document.onselectstart = function () {
        return false;
      };

      oDiv.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          oDiv.style.left = l + "px";
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.close {
  position: fixed;
  right: 15px;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
}
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  z-index: 999;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-form {
  background-color: #fff;
  width: 350px;
  height: 500px;
  border-radius: 15px;

  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  font-size: 30px;
  font-weight: bold;

  text-align: center;
  line-height: 80px;
  margin-top: 40px;
}
.form-item,
.btn,
.other {
  margin: 40px auto;
  width: 90%;
}
input {
  width: 80%;
  margin-top: 20px;
  padding: 10px;
  text-transform: uppercase;
  border: 0;
  outline: none;
  border-bottom: 1px solid #fbc2eb;
}
input::placeholder {
  font-weight: bold;
  color: #acb7c9;
}
input:focus {
  animation: bBottom 2s infinite;
}
@keyframes bBottom {
  50% {
    border-bottom: 1px solid #a6c1ee;
  }
}
.btn {
  height: 40px;
  line-height: 40px;

  color: #fff;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: center;

  cursor: pointer;

  border-radius: 10px;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee, #fbc2eb);
  background-size: 200%;
}
.btn:hover {
  animation: btnAnimate 1s infinite;
}
@keyframes btnAnimate {
  50% {
    background-position: 200%;
  }
}

a {
  text-decoration: none;
  color: #fbc2eb;
}
</style>