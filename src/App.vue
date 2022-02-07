<template>
  <el-container class="app">
    <el-header>
      <header_></header_>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive"
            :key="$route.path"
          />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </el-main>

    <el-footer v-if="$route.path.includes('discover')">
      <footer_ :count="count" @add="add"> </footer_>
    </el-footer>

    <audio_ class="audio_"></audio_>
  </el-container>
</template>

<script>
import header_ from "./components/header_/index.vue";
import footer_ from "./components/footer_/index.vue";
import audio_ from "./components/audio/index.vue";

import { top_album, album_new, album_new_offset } from "./utils/request.js";
import { ref, reactive, toRefs } from "vue";
export default {
  components: {
    header_,
    footer_,
    audio_,
  },
  computed: {
    includedComponents() {
      return this.$route.meta.keepAlive;
    },
  },

  setup() {
    const count = ref(10);
    const add = (n) => {
      count.value += n;
    };

    return {
      count,
      add,
    };
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0px;
  padding: 0px;
}

.app {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;

  // justify-content: space-around;
  .el-main {
    min-height: calc(100vh - 100px);
    overflow: scroll;
    overflow: hidden;
    height: 100%;
    flex: 1;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    min-width: 1100px;
    width: 1100px;
    max-width: 1100px;

    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
  }
  .el-aside {
    border-right: 1px solid #dddddd;
  }
  .el-header,
  .el-footer {
    width: 100%;
    flex: 1;
  }
  .mni_active {
    background-color: black;
    background-color: rgba(rgb(65, 149, 218), green, blue, alpha);
  }
}
</style>