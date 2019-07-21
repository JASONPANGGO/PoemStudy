<template>
  <div>
    <div class="dailyContainer">
      <div
        class="dailyBG animated rotateInDownLeft myanimated"
        v-for="(item, index) in dailyPoem"
        :key="index"
        :class="{rotateOutUpLeft: dailyPoem[index].leftOut, rotateOutUpRight: dailyPoem[index].rightOut}"
      >
        <div class="dailyCard">
          <div class="dailyContent">
            <!-- <img class="stampBig" :src="stamp"> -->
            <div
              class="stampBig"
              :style="{height: dailyPoem[index].stampHeight}"
            >{{dailyPoem[index].title}}</div>
            <div class="dailyPoem" v-html="dailyPoem[index].poem"></div>
          </div>
          <div class="dailyWriter">
            <div class="writerName">{{dailyPoem[index].writer}}</div>
            <div class="stampSmall">{{dailyPoem[index].dynasty}}</div>
          </div>
        </div>
      </div>
      <div class="msg" v-if="promptNoPoem">- 没有更多的诗词了 -</div>
    </div>
  </div>
</template>

<script>
import stamp from "../assets/stamp.png";
import axios from "axios";
let prompting = false;
export default {
  name: "Daily",
  data() {
    return {
      stamp: stamp,
      dailyPoem: [
        {
          title: "如梦令",
          stampHeight: "120px",
          poem: "还睡，<br>还睡，<br>解道醒来无味。",
          writer: "纳兰性德",
          dynasty: "清",
          leftOut: false,
          rightOut: false
        },
        {
          title: "卜算子",
          stampHeight: "120px",
          poem:
            "无意苦争春，<br>一任群芳妒。<br>零落成泥碾作尘，<br>只有香如故。",
          writer: "陆游",
          dynasty: "宋",
          leftOut: false,
          rightOut: false
        },
        {
          title: "离骚",
          stampHeight: "120px",
          poem: "路漫漫其修远兮，<br>吾将上下而求索。",
          writer: "屈原",
          dynasty: "战",
          leftOut: false,
          rightOut: false
        },
        {
          title: "春怨",
          stampHeight: "120px",
          poem: "寂寞空庭春欲晚，<br>梨花满地不开门。",
          writer: "刘方平",
          dynasty: "唐",
          leftOut: false,
          rightOut: false
        },
        {
          title: "望月怀远",
          stampHeight: "150px",
          poem: "海上生明月，<br>天涯共此时。",
          writer: "张九龄",
          dynasty: "唐",
          leftOut: false,
          rightOut: false
        }
      ],
      nowPoem: 4,
      promptNoPoem: false
    };
  },
  mounted: function() {
    axios.get("https://fl123.xyz/api/poetry/getDaily.php").then(response => {
      for(let i =0;i<response.data.length;i++){
        response.data[i].poem = response.data[i].poem.replace(/\，/,"，<br/>").replace(/\。/,"。<br/>");
      }
      this.dailyPoem = response.data;
      this.nowPoem = this.dailyPoem.length - 1;
      this.swipeToNext();
    });
  },
  destroyed: function() {
    window.removeEventListener("touchstart", this.swipeStart);
    window.removeEventListener("touchmove", this.swipeMove);
    window.removeEventListener("touchend", this.swipeEnd);
  },
  methods: {
    swipeToNext() {
      let startX, endX;
      let direction;
      let distance;
      let nowPoem = this.nowPoem;
      this.swipeStart = e => {
        startX = e.touches[0].clientX;
      };
      this.swipeMove = e => {
        e.preventDefault();
        endX = e.touches[0].clientX;
        distance = endX - startX;
      };
      this.swipeEnd = () => {
        if (distance > 5) {
          console.log("右");
          if (nowPoem > 0) {
            this.dailyPoem[nowPoem].rightOut = true;
            nowPoem--;
          } else {
            this.noPoemMsg();
          }
        } else if (distance < -5) {
          console.log("左");
          if (nowPoem > 0) {
            this.dailyPoem[nowPoem].leftOut = true;
            nowPoem--;
          } else {
            this.noPoemMsg();
          }
        }
      };

      window.addEventListener("touchstart", this.swipeStart);
      window.addEventListener("touchmove", this.swipeMove, {
        passive: false
      });
      window.addEventListener("touchend", this.swipeEnd);
    },
    noPoemMsg() {
      this.promptNoPoem = true;
      setTimeout(() => {
        this.promptNoPoem = false;
      }, 2999);
    }
  }
};
</script>

<style>
@import url(../assets/animate.css);
.dailyContainer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
}
.dailyBG {
  position: fixed;
  width: 80vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 15vh;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 10px 50px rgb(196, 196, 196);
}
.dailyCard {
  /* width: 100%; */
  height: 70vh;
  width: 80vw;
  background-color: white;
  border: 1px solid rgb(209, 209, 209);
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
  background-size: 40px 100%;
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
  text-align: end;
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

.msg {
  position: fixed;
  width: 120px;
  font-size: 12px;
  color: gray;
  bottom: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  animation: prompt 3s;
}
@keyframes prompt {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
