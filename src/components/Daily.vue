<template>
  <div>
    <div class="dailyContainer">
      <div class="dailyBG animated rotateInDownLeft myanimated">
        <div class="dailyCard">
          <div class="dailyContent">
            <!-- <img class="stampBig" :src="stamp"> -->
            <div class="stampBig">{{dailyPoem.title}}</div>
            <div class="dailyPoem" v-html="dailyPoem.poem"></div>
          </div>
          <div class="dailyWriter">
            <div class="writerName">{{dailyPoem.writer}}</div>
            <div class="stampSmall">{{dailyPoem.dynasty}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stamp from "../assets/stamp.png";
export default {
  name: "Daily",
  data() {
    return {
      stamp: stamp,
      dailyPoem: {
        title: "如梦令",
        poem: "还睡，<br>还睡，<br>解道醒来无味。",
        writer: "纳兰性德",
        dynasty: "清"
      }
    };
  }
};
</script>

<style>
@import url(../assets/animate.css);
.dailyContainer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dailyBG {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
}
.dailyCard {
  /* width: 100%; */
  height: 70vh;
  width: 80vw;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: url(../assets/pattern4.png) repeat;
  background-size: 80%;
}
.dailyContent {
  width: 100%;
  height: 50vh;
}
.dailyWriter {
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  /* background-color: blueviolet; */
}
.stampBig {
  font-family: "繁体" !important;
  font-size: 24px;
  width: 40px;
  height: 120px;
  margin-top: 20px;
  background: url(../assets/stamp.png);
  background-size: 40px 120px;
  float: right;
  margin-right: 20px;
  color: white;
  writing-mode: vertical-lr;
  line-height: 40px;
  text-align: center;
  letter-spacing: 5px;
}
.dailyPoem {
  width: auto;
  padding-top: 20px;
  margin-right: 10px;
  float: right;
  font-size: 25px;
  font-family: "繁体";
  writing-mode: vertical-rl;
}
.writerName {
  font-family: "繁体";
  width: 40px;
  height: 80px;
  line-height: 40px;
  writing-mode: vertical-lr;
  margin-left: 5px;
}
.stampSmall {
  color: white;
  font-family: "繁体";
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  width: 30px;
  height: 50px;
  background: url(../assets/stamp.png);
  background-size: 30px 50px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.myanimated{
    /* animation-duration: 1.5s !important; */
}
</style>
