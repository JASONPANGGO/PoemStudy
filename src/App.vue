<template>
  <div id="app">
    <headBar></headBar>

    <router-view class="routerview"/>

  </div>
</template>

<script>
import headBar from "./components/headBar";

export default {
  name: "App",
  components: { headBar }
};
</script>

<style>
@font-face {
  font-family: "宋体";
  src: url("./assets/simsun.ttc");
}

@font-face {
  font-family: "繁体";
  src: url("./assets/FZQTFW.TTF");
}

#app {
  font-family: "宋体";
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    /* padding-right: 20px; */
  /* overflow-x: hidden; */
  /* overflow-y: scroll; */
 
  
}

#app::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
   display: none;
   
}

html::-webkit-scrollbar {
  width: 0 !important;
   display: none;
}

.routerview{
  padding-right: -20px;
  overflow-x: hidden;
}

*:focus {
  outline: none;
}
body {
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  color: black;
}
.routerview {
  overflow: scroll;
  scroll-behavior: initial;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
