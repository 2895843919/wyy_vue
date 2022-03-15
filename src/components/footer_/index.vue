<template>
  <div class="bottom_bbbb">
    <div style="width: 1100px; min-width:1100px; height: 100%">
      <img
        style="width: 100%; height: 100%"
        src='../../static/imgs/bottom.png'
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
// import func from 'vue-editor-bridge';
export default {
  props: {
    count: Number,
  },

  emits: ['add'],
  setup(props, ctx) {
    const add=()=>{
      ctx.emit('add',1)
    }
    return {
      add
    };
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
.bottom_bbbb {
  border-top: 1px solid #dddddd;
  width: 1100px;
  min-width:1100px;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>