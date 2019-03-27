<template>
  <div>
    <div class="gameBoard">
      <div class="gameBar"></div>
      <div class="gameImg" :class="{gameWin: win}">
        <img :src="list[num].img">
      </div>

      <div class="gameMain">
        <div class="gameQuestion">{{list[num].question}}，</div>
        <div class="gameInputBox">
          <div class="gameInput" v-for="(item, index) in input" :key="index">{{item}}</div>
        </div>

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
export default {
  name: "Game",
  data() {
    return {
      num: 0,
      list: [
        {
          question: "床前明月光",
          answer: "疑是地上霜",
          img: "/static/img/jingyesi.8eaffbd.jpg"
        },
        {
          question: "春眠不觉晓",
          answer: "处处闻啼鸟",
          img: "/static/img/chunxiao.157b8f4.jpg"
        }
      ],
      selectRange: [],
      input: [],
      win: false,
      inputNum: 0,
      imgUrl: "../assets/jingyesi.jpg"
    };
  },
  methods: {
    checkInput() {
      if (this.input.join("") == this.list[this.num].answer) {
        this.win = true;
        this.inputNum = 0;
        setTimeout(() => {
          if (this.num < this.list.length-1) {
            this.num++;
            this.randomSelect();
            this.win = false;
          }
        }, 1000);
      }
    },
    randomSelect(e = true) {
      let range = [];
      let answer = this.list[this.num].answer.split("");
      if (e) {
        this.input = [];
        for (let i = 0; i < answer.length; i++) {
          this.input.push("");
        }
      }
      let question = this.list[this.num].question.split("");
      range = answer;
      for (let i = 0; i < question.length; i++) {
        range.push(question[i]);
      }
      // 打乱选项，洗牌算法
      for (let i = 0; i < range.length; i++) {
        let j = Math.floor(Math.random() * (range.length - 1));
        let temp = range[j];
        range[j] = range[range.length - 1];
        range[range.length - 1] = temp;
      }
      console.log(range);
      this.selectRange = range;

      //   for(let i =0;i<answer.length;i++){
      //       this.input.push('');
      //   }
    },
    select(index) {
      //   this.input += this.selectRange[index];
      //   if (this.inputNum < this.input.length) {
      this.input.splice(this.inputNum, 1, this.selectRange[index]);
      this.inputNum++;
      console.log(this.input);
      //   }
      this.selectRange[index] = "selected";
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
      console.log(this.input);
      this.randomSelect(false);
      this.win = false;
    },
    hint() {
      let answer = this.list[this.num].answer.split("");
      this.input.splice(this.inputNum, 1, answer[this.inputNum]);

      for (let i = 0; i < this.selectRange.length; i++) {
        if (this.selectRange[i] == answer[this.inputNum]) {
          this.selectRange.splice(i, 1, "selected");
        }
      }
      //   this.selectRange.forEach(word=>{
      //       if(word == answer[this.inputNum]){
      //           console.log(word);
      //           word = 'selected';
      //           this.selectRange
      //       }
      //   })
      this.inputNum++;
      this.checkInput();
    }
  },
  mounted: function() {
    this.randomSelect();
  }
};
</script>

<style>
.gameBoard {
  margin-top: 8vh;
  height: 70vh;
}
.gameBar {
  width: 100%;
  height: 6vh;
  background-color: rgba(0, 0, 0, 0.06);
  /* box-shadow: 0px 5px 10px #999999; */
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
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
}
.disappear {
  /* opacity: 0; */
  /* display: hidden; */
  visibility: hidden;
}
</style>
