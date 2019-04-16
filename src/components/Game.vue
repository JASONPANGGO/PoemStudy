<template>
  <div class="gameContainer">
    <div class="gameOver animated" v-if="gameOver||gameStart" :class="{'fadeIn':gameOver}">
      <div class="gameOverBG animated" :class="{'zoomIn':gameOver}"></div>
      <div class="gameOverBoard animated" :class="{'zoomIn':gameOver}">
        <div class="title" v-if="gameOver">游戏结束</div>
        <div class="title" v-if="gameStart">背诵游戏</div>
        <div class="scoreReport" v-if="gameOver">你的得分：{{score}}</div>
        <div class="scoreReport" v-if="gameStart">游戏规则：在10秒内回答正确对应诗句的下一句即可得分</div>
        <button @click="restart" v-if="gameOver">重新开始</button>
        <button @click="restart" v-if="gameStart">开始游戏</button>
      </div>
    </div>
    <!-- 游戏标题栏 -->
    <div class="gameBoard">
      <div class="gameBar">
        <!-- 当前诗歌名字 -->
        <span class="title">{{list[num].title}}</span>
        <div class="time">
          <!-- 时间 -->
          <img src="../assets/time.png" alt>
          <span class="barDigit">{{time}}</span>
        </div>
        <div class="score">
          <!-- 得分 -->
          <span class="barDigit">{{score}}</span>
          <img src="../assets/coins.png" alt>
        </div>
      </div>
      <!-- 当前诗词图片 -->
      <div class="gameImg" :class="{gameWin: win}">
        <img :src="list[num].img">
        <!-- <img src="/static/img/yeyujibei.b4630aa.jpg"> -->
      </div>
      <!-- 游戏主体 -->
      <div class="gameMain">
        <!-- 问题 -->
        <div class="gameQuestion">{{list[num].question}}，</div>
        <!-- 选择后的答案 -->
        <div class="gameInputBox">
          <div class="gameInput" v-for="(item, index) in input" :key="index">{{item}}</div>
        </div>
        <!-- 答案选择 -->
        <div class="gameSelection">
          <div
            class="gameSelectBox"
            v-for="(item, index) in selectRange"
            :key="index"
            @click="select(index)"
            :class="{disappear:selectRange[index] === 'selected'}"
          >{{item}}</div>
        </div>
      </div>

      <div class="gameOperation">
        <input type="button" value="清空" @click="empty">
        <input type="button" value="提示" @click="hint">
      </div>
    </div>
  </div>
</template>

<script>
import jingyesi from "../assets/jingyesi.jpg";
import chunxiao from "../assets/chunxiao.jpg";
import yeyujibei from "../assets/yeyujibei.jpg";
var TIMESET = 10;
var SELECTSIZE = 10;
var timer;
export default {
  name: "Game",
  data() {
    return {
      num: 0,
      list: [
        {
          title: "静夜思",
          question: "床前明月光",
          answer: "疑是地上霜",
          img: jingyesi
        },
        {
          title: "春晓",
          question: "春眠不觉晓",
          answer: "处处闻啼鸟",
          img: chunxiao
        },
        {
          title: "夜雨寄北",
          question: "君问归期未有期",
          answer: "巴山夜雨涨秋池",
          img: yeyujibei
        }
      ],
      selectRange: [],
      input: [],
      win: false,
      inputNum: 0,
      imgUrl: "../assets/yeyujibei.jpg",
      time: TIMESET,
      score: 0,
      gameOver: false,
      gameStart: true
    };
  },
  methods: {
    checkInput(e = true) {
      if (this.input.join("") == this.list[this.num].answer) {
        this.win = true;
        clearInterval(timer);
        this.inputNum = 0;
        if (e) {
          this.score += 10;
        }
        setTimeout(() => {
          if (this.num < this.list.length - 1) {
            this.num++;
            this.randomSelect();
            this.time = TIMESET;
            this.timeSet();
            this.win = false;
          } else {
            this.gameOver = true;
          }
        }, 1000);
      }
    },
    // 生成答案选择的随机序列
    randomSelect(e = true) {
      let range = [];
      // 获取正确答案的字符
      let answer = this.list[this.num].answer.split("");
      if (e) {
        this.input = [];
        for (let i = 0; i < answer.length; i++) {
          this.input.push("");
        }
      }
      let question = this.list[this.num].question.split("");
      range = answer.concat();
      for (let i = 0; i < SELECTSIZE - answer.length; i++) {
        range.push(question[i]);
      }
      // 打乱选项，洗牌算法
      for (let i = 0; i < range.length; i++) {
        let j = Math.floor(Math.random() * (range.length - 1));
        let temp = range[j];
        range[j] = range[range.length - 1];
        range[range.length - 1] = temp;
      }
      this.selectRange = range;
    },
    // 选择答案
    select(index) {
      let answer = this.list[this.num].answer.split("");
      if (!this.input[answer.length - 1]) {
        this.input.splice(this.inputNum, 1, this.selectRange[index]);
        this.selectRange[index] = "selected";
      }
      if (this.inputNum < answer.length - 1) {
        this.inputNum++;
      }
      console.log(this.inputNum);
      //   }
      this.checkInput();
    },
    empty() {
      //   this.input = "";
      // for(let i =0;i<this.input.length;
      let length = this.input.length;
      for (let i = 0; i < length; i++) {
        this.input.splice(i, i + 1, "");
      }
      // }
      this.inputNum = 0;
      this.randomSelect(false);
      this.win = false;
    },
    hint() {
      let answer = this.list[this.num].answer.split("");
      if (!this.input[answer.length - 1]) {
        this.input.splice(this.inputNum, 1, answer[this.inputNum]);
        for (let i = 0; i < this.selectRange.length; i++) {
          if (this.selectRange[i] == answer[this.inputNum]) {
            this.selectRange.splice(i, 1, "selected");
          }
        }
        if (this.inputNum < answer.length - 1) {
          this.inputNum++;
        }
        this.checkInput(false);
        this.score -= 2;
      }
    },
    timeSet() {
      timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.gameOver = true;
        }
      }, 1000);
    },
    restart() {
      this.num = 0;
      this.win = false;
      this.empty();
      this.randomSelect();
      this.time = TIMESET;
      clearInterval(timer);
      this.timeSet();
      this.score = 0;
      this.gameOver = false;
      this.gameStart = false;
    }
  },
  mounted: function() {
    this.randomSelect();
    // this.timeSet();
  }
};
</script>

<style>
@import url(../assets/animate.css);
.gameContainer {
  background: url(../assets/pattern4.png) repeat;
  background-size: 100%;
  height: 100vh;
}
.gameBoard {
  margin-top: 8vh;
  height: 70vh;
}
.gameBar {
  width: 100%;
  height: 6vh;
  background-color: rgba(0, 0, 0, 0.06);
  text-align: center;
  /* display: flex; */
  /* box-shadow: 0px 5px 10px #999999; */
}
.gameBar .title {
  line-height: 6vh;
  font-weight: bold;
}
.time,
.score {
  width: 20vw;
  height: 6vh;
  line-height: 6vh;
  text-align: center;
}
.time {
  float: left;
}
.score {
  align-self: flex-end;
  float: right;
}
.barDigit {
  font-family: sans-serif;
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  color: rgb(0, 106, 82);
}
.time img,
.score img {
  height: 1em;
}
.gameImg {
  margin: 10px;
  text-align: center;
}
.gameImg img {
  width: 80vw;
  height: 200px;
  filter: grayscale(100%);
  transition: 1s all ease;
}
.gameWin img {
  filter: none;
}
.gameMain {
  width: 100%;
  height: 200px;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.gameQuestion {
  margin-top: 20px;
}
.gameInput {
  margin: 5px;
  margin-top: 20px;
  height: 1em;
  width: 1.5em;
  border-bottom: 1px solid black;
  line-height: 10px;
  text-align: center;
}
.gameSelection {
  width: 60vw;
  height: 100px;
  /* background-color: aquamarine; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.gameSelectBox {
  width: 8vw;
  height: 8vw;
  background-color: white;
  border: 1px solid rgb(0, 106, 82);
  line-height: 8vw;
  text-align: center;
  border-radius: 5px;
  margin: 5px;
}
.gameInputBox {
  display: flex;
}
.gameOperation {
  width: 100%;
  height: 8vh;
  position: fixed;
  bottom: 0;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: space-around;
}
.gameOperation input {
  width: 100px;
  height: 30px;
  background-color: rgb(0, 106, 82);
  border-radius: 5px;
  border: none;
  color: white;
  font-family: "宋体";
  letter-spacing: 3px;
  /* box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5); */
}
.gameOperation input:active {
  background-color: rgb(0, 139, 107);
}
.disappear {
  /* opacity: 0; */
  /* display: hidden; */
  visibility: hidden;
}
.gameOver {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gameOver .gameOverBoard,
.gameOver .gameOverBG {
  position: fixed;
  background-color: white;
  width: 70vw;
  height: 60vh;
  border-radius: 20px;
  border: 2px solid rgb(0, 106, 82);
  /* box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.8); */
}
.gameOver .gameOverBoard {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.gameOver .gameOverBoard .title {
  font-size: 25px;
  color: rgb(0, 106, 82);
  font-weight: bold;
  margin-top: 6vh;
}
.gameOver .gameOverBoard .scoreReport {
  margin-top: 3vh;
  width: 80%;
}
.gameOver .gameOverBoard {
  background: url(../assets/pattern4.png) repeat;
  background-size: 100%;
}

.gameOver .gameOverBoard button {
  margin-top: 30vh;
  width: 100px;
  height: 30px;
  border: none;
  background-color: rgb(0, 106, 82);
  border-radius: 15px;
  color: white;
}
</style>
