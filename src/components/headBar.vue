<template>
  <div>
    <div class="headbar">
      <router-link to="/" class="selection" exact-active-class="selected">学习</router-link>
      <router-link to="/Game" class="selection2" exact-active-class="selected">练习</router-link>
      <router-link to="/Daily" class="selection3" exact-active-class="selected">每日一句</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "headBar",
  data() {
    return {
      grade: "一年级下册"
    };
  }
};
</script>

<style>
.headbar {
  width: 100%;
  height: 8vh;
  /* background-color: aqua; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  position: fixed;
  background-color: white;
  z-index: 100;
}
.selection,
.selection2,
.selection3 {
  width: 10vw;
  line-height: 10vh;
  margin-left: 3vw;
  text-align: center;
  margin-bottom: -1px;
  color: rgba(0, 0, 0, 0.6);
  transition: 0.5s all ease;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
}
.selection2,
.selection3 {
  margin-left: 10vw;
}
.selection3 {
  width: 20vw;
}

.selected {
  border-bottom: 2px solid rgb(0, 106, 82);
  color: black;
}
</style>

