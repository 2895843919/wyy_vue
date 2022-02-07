// 发现音乐
<template>
  <div>
    
    <router-view v-slot="{ Component }">
      <!-- 这里exclude album_item,在album缓存时更改id将无法使album_item更新所以排除album_item -->
      <keep-alive exclude="album_item" include="album,playlist_all,recommend">
        <component
          :is="Component"
          v-if="$route.meta.keepAlive"
          :key="$route.path"
        />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script>
export default {
  name: "discover",

  created() {
    // console.log("discover");
  },
};
</script>

<style lang="less">
</style>