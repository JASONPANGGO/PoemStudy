<template>
  <div>
    <div class="poemRepo" @click="toggleRepo">{{nowGrade}}</div>
    <div class="Repo" v-if="repo">
      <div class="item" v-for="(item, index) in grades" :key="index" @click="changeGrade(index)">
        <img src="../assets/cloud1.png" alt />
        {{item.name}}
        <img src="../assets/cloud2.png" alt />
      </div>
    </div>
    <div class="operation">
      <div
        :class="{ 'study-selection': true,'selectThis' : nowContent === 1}"
        @click="changeContent(1)"
      >原文</div>
      <div
        :class="{ 'study-selection': true,'selectThis': nowContent === 2}"
        @click="changeContent(2)"
      >注释</div>
      <div
        :class="{ 'study-selection': true,'selectThis': nowContent === 3}"
        @click="changeContent(3)"
      >赏析</div>
      <div
        :class="{ 'study-selection': true,'selectThis': nowContent === 4}"
        @click="changeContent(4)"
      >作者</div>
    </div>
    <div class="container">
      <div
        class="studyItem origin animated"
        :class="{'fadeIn' : nowContent === 1, 'fadeOut': nowContent != 1}"
      >
        <div class="headimg">
          <img :src="poems[num].img" alt />
        </div>

        <div class="title">{{poems[num].title}}</div>
        <svg
          @click="playAudio()"
          t="1563687280320"
          class="icon animated "
          :class="{heartBeat: audioPlaying}"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4348"
          width="30"
          height="30"
        >
          <path
            d="M764.74368 769.37216c5.40672 0 10.77248-2.12992 14.82752-6.3488 58.40896-61.17376 91.89376-150.15936 91.89376-244.16256 0-93.98272-33.50528-182.96832-91.87328-244.14208-7.80288-8.17152-20.80768-8.47872-28.95872-0.67584-8.17152 7.82336-8.47872 20.7872-0.67584 28.95872 51.2 53.63712 80.56832 132.32128 80.56832 215.8592 0 83.5584-29.36832 162.24256-80.5888 215.87968-7.80288 8.17152-7.49568 21.13536 0.67584 28.95872C754.56512 767.50848 759.66464 769.37216 764.74368 769.37216z"
            p-id="4349"
            fill="#515151"
          />
          <path
            d="M696.64768 706.19136c5.16096 0 10.32192-1.9456 14.29504-5.81632 45.568-44.48256 71.70048-110.61248 71.70048-181.47328 0-70.88128-26.13248-137.0112-71.70048-181.49376-8.0896-7.8848-21.03296-7.74144-28.95872 0.36864-7.90528 8.11008-7.74144 21.05344 0.36864 28.95872 37.70368 36.80256 59.33056 92.28288 59.33056 152.18688s-21.64736 115.36384-59.33056 152.1664c-8.11008 7.90528-8.25344 20.86912-0.36864 28.95872C685.99808 704.14336 691.32288 706.19136 696.64768 706.19136z"
            p-id="4350"
            fill="#515151"
          />
          <path
            d="M616.12032 605.61408c-8.68352 7.24992-9.80992 20.1728-2.58048 28.85632 4.05504 4.83328 9.87136 7.33184 15.74912 7.33184 4.62848 0 9.27744-1.55648 13.12768-4.75136 32.19456-26.91072 51.42528-71.10656 51.42528-118.1696 0-47.77984-19.68128-92.32384-52.6336-119.1936-8.76544-7.168-21.66784-5.77536-28.81536 2.94912-7.14752 8.76544-5.81632 21.66784 2.94912 28.81536 23.51104 19.16928 37.56032 51.85536 37.56032 87.4496C652.86144 553.984 639.11936 586.40384 616.12032 605.61408z"
            p-id="4351"
            fill="#515151"
          />
          <path
            d="M492.1344 256.73728l-167.99744 125.62432-87.552 0c-11.32544 0-20.48 9.15456-20.48 20.48l0 232.12032c0 11.32544 9.15456 20.48 20.48 20.48l87.552 0 167.99744 125.62432c3.60448 2.70336 7.92576 4.07552 12.26752 4.07552 3.11296 0 6.28736-0.7168 9.17504-2.1504 6.92224-3.4816 11.30496-10.56768 11.30496-18.3296l0-491.52c0-7.76192-4.38272-14.848-11.30496-18.3296C506.65472 251.392 498.31936 252.1088 492.1344 256.73728zM483.92192 723.78368l-140.6976-105.22624c-3.54304-2.64192-7.84384-4.07552-12.26752-4.07552l-73.89184 0L257.06496 423.3216l73.89184 0c4.42368 0 8.72448-1.4336 12.26752-4.07552l140.6976-105.22624L483.92192 723.78368z"
            p-id="4352"
            fill="#515151"
          />
        </svg>
        <div class="writer">{{poems[num].writer}}</div>
        <div class="content" v-html="poems[num].content"></div>
      </div>

      <div
        class="studyItem comment animated"
        :class="{'fadeIn' : nowContent === 2, 'fadeOut': nowContent != 2}"
      >
        <div class="title">{{poems[num].title}}</div>
        <div class="writer">{{poems[num].writer}}</div>
        <div class="content" v-html="poems[num].comments"></div>
        <br />
        <br />
        <br />
        <br />
        <div class="content-comment" v-html="poems[num].comments2"></div>
      </div>

      <div
        class="studyItem appreciation animated"
        :class="{'fadeIn' : nowContent === 3, 'fadeOut': nowContent != 3}"
      >
        <div class="content" v-html="poems[num].appreciation"></div>
      </div>

      <div
        class="studyItem writer animated"
        :class="{'fadeIn' : nowContent === 4, 'fadeOut': nowContent != 4}"
      >
        <div class="writerblock">
          <div class="writerInfo">
            <div class="title">{{poems[num].writer}}</div>
            <div class="dynasty">[ {{poems[num].writerDynasty}} ]</div>
          </div>
          <div class="writerimg">
            <img :src="poems[num].writerImg" alt />
          </div>
        </div>
        <div class="story">{{poems[num].writerStory}}</div>
        <div class="finish">
          <!-- <div class="finishDo"> -->
          <button :class="{'finished': poems[num].finishState}" @click="clickFinish">完成学习</button>
          <div class="catalogue" @click="openList(true)">
            <img src="../assets/menu.png" alt />
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="studyList animated" v-if="studyList" :class="{'fadeInDown': studyList}">
      <div class="studyListBG">
        <div class="studyListHead">
          <span>学习列表</span>
          <span @click="openList(false)">
            <i class="fa fa-close fa-lg"></i>
          </span>
        </div>
        <div
          class="poemItem"
          v-for="(item, index) in poems"
          :key="index"
          @click="selectPoem(index)"
        >
          <div class="poemInfo">
            <div class="poemTitle">{{item.title}}</div>
            <div class="poemWriter">{{item.writer}}</div>
          </div>
          <div class="poemState" :class="{'finishedLogo': item.finishState}">
            <i class="fa fa-check-circle-o fa-lg"></i>
          </div>
        </div>
      </div>
    </div>
    <audio :src="audioSrc" ref="audio" />
  </div>
</template>

<script>
import libai from "../assets/libai.jpg";
import jingyesi from "../assets/jingyesi.jpg";
import menghaoran from "../assets/menghaoran.jpg";
import chunxiao from "../assets/chunxiao.jpg";

import axios from "axios";

var studyItemHeight = window.innerHeight * 0.9;
export default {
  name: "Study",
  data() {
    return {
      poems: [
        {
          finishState: false,
          title: "静夜思",
          img: jingyesi,
          writer: "李白",
          writerImg: libai,
          writerDynasty: "唐",
          content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
          writerStory:
            "李白（701年－762年） ，字太白，号青莲居士，又号“谪仙人”，是唐代伟大的浪漫主义诗人，被后人誉为“诗仙”，与杜甫并称为“李杜”，为了与另两位诗人李商隐与杜牧即“小李杜”区别，杜甫与李白又合称“大李杜”。据《新唐书》记载，李白为兴圣皇帝（凉武昭王李暠）九世孙，与李唐诸王同宗。其人爽朗大方，爱饮酒作诗，喜交友。",
          comments:
            "<span class='green'>床</span>前明月光，<br>明亮的月光洒在床前的窗户纸上，<br><span class='green'>疑</span>是地上霜。<br>好像地上泛起了一层霜。<br>举头望明月，<br>我禁不住抬起头来，<br>看那天窗外空中的一轮明月，<br>低头思故乡。<br>不由得低头沉思，<br>想起远方的家乡。",
          comments2:
            " （1）<b>静夜思</b>：安静的夜晚产生的思绪。<br>（2）<b>床</b>：此诗中的“床”字，是争论和异议的焦点。<br>（3）<b>疑</b>：好像。",
          appreciation:
            "<p>这首诗写的是在寂静的月夜思念家乡的感受。</p><p>诗的前两句，是写诗人在作客他乡的特定环境中一刹那间所产生的错觉。</p><p>一个独处他乡的人，白天奔波忙碌，倒还能冲淡离愁，然而一到夜深人静的时候，心头就难免泛起阵阵思念故乡的波澜。</p><p>何况是在月明之夜，更何况是月色如霜的秋夜。</p><p>“疑是地上霜”中的“疑”字，生动地表达了诗人睡梦初醒，迷离恍惚中将照射在床前的清冷月光误作铺在地面的浓霜。</p><p>而“霜”字用得更妙，既形容了月光的皎洁，又表达了季节的寒冷，还烘托出诗人飘泊他乡的孤寂凄凉之情。</p><p>诗的后两句，则是通过动作神态的刻画，深化思乡之情。</p><p>“望”字照应了前句的“疑”字，表明诗人已从迷朦转为清醒，他翘首凝望着月亮，不禁想起，此刻他的故乡也正处在这轮明月的照耀下。</p>"
        },
        {
          finishState: false,
          title: "春晓",
          img: chunxiao,
          writer: "孟浩然",
          writerImg: menghaoran,
          writerDynasty: "唐",
          content: "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。",
          writerStory:
            "孟浩然生当盛唐，早年有志用世，在仕途困顿、痛苦失望后，尚能自重，不媚俗世，修道归隐终身。曾隐居鹿门山。40岁时，游长安，应进士举不第。曾在太学赋诗，名动公卿，一座倾服，为之搁笔。开元二十五年（737）张九龄招致幕府，后隐居。孟诗绝大部分为五言短篇，多写山水田园和隐居的逸兴以及羁旅行役的心情。其中虽不无愤世嫉俗之词，而更多属于诗人的自我表现。"
        },
        {
          finishState: false,
          title: "夜雨寄北",
          writer: "李商隐"
        }
      ],
      num: 0,
      nowContent: 1,
      studyList: false,
      nowGrade: "一年级上册",
      grades: [
        { name: "一年级上册" },
        { name: "一年级下册" },
        { name: "二年级上册" },
        { name: "二年级下册" },
        { name: "三年级上册" },
        { name: "三年级下册" },
        { name: "四年级上册" },
        { name: "四年级下册" },
        { name: "五年级上册" },
        { name: "五年级下册" },
        { name: "六年级上册" },
        { name: "六年级下册" },
        { name: "七年级上册" },
        { name: "七年级下册" },
        { name: "八年级上册" },
        { name: "八年级下册" },
        { name: "九年级上册" },
        { name: "九年级下册" }
      ],
      repo: false,
      audioSrc: "",
      audioPlaying: false
    };
  },
  beforeMount() {
    this.checkscroll();
    this.changeContent(1);
  },
  destroyed: function() {
    this.toggleSwipe(false);
    console.log("destroyed");
  },
  mounted() {
    // this.changeGrade(0);

    if (location.toString().match(/\?/)) {
      this.searchPoem(this.$route.query);
      console.log(this.$route.query);
    } else {
      this.changeGrade(0);
    }
  },
  methods: {
    toggleSwipe(e) {
      if (e) {
        window.addEventListener("touchstart", this.startScroll, false);
        window.addEventListener("touchmove", this.moveScroll, {
          passive: false
        });
        window.addEventListener("touchend", this.endScroll, false);
      } else {
        window.removeEventListener("touchstart", this.startScroll, false);
        window.removeEventListener("touchmove", this.moveScroll, false);
        window.removeEventListener("touchend", this.endScroll, false);
      }
    },
    toggleRepo() {
      this.repo = !this.repo;
      this.toggleSwipe(!this.repo);
    },
    changeGrade(index) {
      this.toggleSwipe(true);
      this.nowGrade = this.grades[index].name;
      axios
        .get("https://fl123.xyz/api/poetry/getPoList.php", {
          params: {
            library: this.nowGrade
          }
        })
        .then(response => {
          this.poems = response.data;
          return axios
            .get("https://fl123.xyz/api/poetry/getPoetry.php", {
              params: {
                poetryName: response.data[0].title,
                poemName: response.data[0].writer
              }
            })
            .then(response => {
              this.poems.splice(0, 1, response.data);
              let tempString;
              if (this.poems[0].content.length > 32) {
                tempString = this.poems[0].content.replace(/。/g, "。<br/>");
              } else {
                tempString = this.poems[0].content
                  .replace(/，/g, "，<br/>")
                  .replace(/。/g, "。<br/>");
              }
              this.poems[0].content = tempString;
              this.repo = false;
            });
        });
      this.num = 0;
      this.changeContent(1);
    },
    checkscroll() {
      let startY, endY;
      let direction;
      let distance;

      this.startScroll = e => {
        startY = e.touches[0].clientY;
      };
      this.moveScroll = e => {
        e.preventDefault();
        endY = e.touches[0].clientY;
        distance = endY - startY;
      };
      this.endScroll = () => {
        if (distance > 50) {
          // 向上翻页
          console.log("向上翻页");
          if (
            Math.abs(document.documentElement.scrollTop - studyItemHeight) < 1
          ) {
            this.changeContent(1);
          } else if (
            Math.abs(document.documentElement.scrollTop - studyItemHeight * 2) <
            1
          ) {
            this.changeContent(2);
          } else if (
            Math.abs(document.documentElement.scrollTop - studyItemHeight * 3) <
            1
          ) {
            this.changeContent(3);
          }
        } else if (distance < -50) {
          // 向下翻页
          console.log("向下翻页");
          if (Math.abs(document.documentElement.scrollTop - 0) < 1) {
            this.changeContent(2);
          } else if (
            Math.abs(document.documentElement.scrollTop - studyItemHeight) < 1
          ) {
            this.changeContent(3);
          } else if (
            Math.abs(document.documentElement.scrollTop - studyItemHeight * 2) <
            1
          ) {
            this.changeContent(4);
          }
        }
      };
      this.toggleSwipe(true);
    },
    changeContent(e) {
      this.nowContent = e;
      window.scrollTo(0, (e - 1) * studyItemHeight);
    },
    clickFinish() {
      this.poems[this.num].finishState = true;
    },
    openList(e) {
      this.studyList = e;
      this.toggleSwipe(!e);
    },
    selectPoem(index) {
      this.num = index;
      this.studyList = false;
      axios
        .get("https://fl123.xyz/api/poetry/getPoetry.php", {
          params: {
            poetryName: this.poems[index].title,
            poemName: this.poems[index].writer
          }
        })
        .then(response => {
          this.poems.splice(index, 1, response.data);
          let tempString;
          if (this.poems[index].content.length > 32) {
            tempString = this.poems[index].content.replace(/。/g, "。<br/>");
          } else {
            tempString = this.poems[index].content
              .replace(/，/g, "，<br/>")
              .replace(/。/g, "。<br/>");
          }
          this.poems[index].content = tempString;
        });
      this.changeContent(1);
      this.toggleSwipe(true);
    },
    searchPoem(poem) {
      let nowPoem = poem;
      axios
        .get("https://fl123.xyz/api/poetry/getPoetry.php", {
          params: {
            poetryName: nowPoem.title,
            poemName: nowPoem.writer
          }
        })
        .then(response => {
          this.poems.splice(0, 1, response.data);
          let tempString;
          if (this.poems[0].content.length > 32) {
            tempString = this.poems[0].content.replace(/。/g, "。<br/>");
          } else {
            tempString = this.poems[0].content
              .replace(/，/g, "，<br/>")
              .replace(/。/g, "。<br/>");
          }
          this.poems[0].content = tempString;
          this.nowGrade = response.data.grade;
        });
    },
    playAudio() {

      let audio = this.$refs.audio;

      window.addEventListener("ended",()=>{
        this.audioPlaying = false
      })

      if(this.audioPlaying){
        this.audioPlaying = false;
        audio.pause()
      }else{
        let content = this.poems[this.num].content;
        content = content.replace(/<br\/>/g, "");
        this.audioSrc = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=${content}`;
        // document.querySelector("audio").play();
        audio.play()
        this.audioPlaying = true;
      }
    }
  }
};
</script>

<style scope>
@import url(../assets/animate.css);
@import url(../assets/font-awesome-4.7.0/css/font-awesome.min.css);
/* 侧边操作栏 */
.operation {
  position: fixed;
  width: 40px;
  height: 60vh;
  top: 40vh;
}
.study-selection {
  margin: 0;
  width: 40px;
  height: 15vh;
  writing-mode: vertical-lr;
  line-height: 20px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
  text-align: center;
  transition: 0.5s ease;
}
.selectThis {
  border-left: 1vw solid rgb(0, 106, 82);
  color: rgb(0, 106, 82);
  font-weight: bold;
}

/* 主体内容 */
.container {
  margin: 5vh;
  margin-top: 10vh;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.02);
  background: url(../assets/pattern4.png) repeat;
  background-size: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* 隐藏滚动条 */
.container::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

body::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.headimg img {
  width: 100%;
  /* height: auto; */
  height: 200px;
}

/* 学习的内容分块studyItem */

.studyItem {
  width: 100%;
  text-align: center;
  height: 90vh;
}

.origin .title {
  font-size: 25px;
  font-weight: bold;
  margin: 30px auto;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.origin .writer {
  font-size: 16px;
  text-align: center;
}

.origin .content {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 16em;
  line-height: 2em;
  font-size: 20px;
}

.comment .title {
  font-size: 20px;
  color: rgb(0, 106, 82);
  padding-top: 30px;
}
.comment .writer {
  font-size: 12px;
  margin: 10px;
  color: gray;
}
.comment .content {
  font-size: 16px;
  line-height: 25px;
}
.content-comment {
  text-align: left;
  margin: 10px;
}
.green {
  color: rgb(0, 106, 82);
}

.appreciation .content {
  text-align: left;
  text-indent: 2em;
  margin: 10px;
}

.writer .writerblock {
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: space-around;
}
.writer .writerInfo {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
}
.writer .title,
.writer .dynasty {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.writer .title {
  color: rgb(0, 106, 82);
  font-size: 20px;
}
.writer .writerimg {
  width: 50%;
  height: 40vh;
}
.writer .writerimg img {
  width: 100%;
  height: auto;
}
.writer .story {
  height: 35vh;
  margin: 10px;
  margin-top: 0;
  text-align: left;
  font-size: 1em;
  line-height: 1.5em;
}

.finish {
  height: 20vh;
  width: 100%;
  /* margin-top: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .finishDo{
  
} */
.finish button {
  width: 100px;
  height: 30px;
  background-color: rgb(0, 106, 82);
  color: white;
  border: none;
  border-radius: 5px;
  border: 1px solid rgb(0, 106, 82);
}
.finish .catalogue {
  margin-left: 20px;
}
.finish .catalogue img {
  width: 1em;
  height: 1em;
}
.finishing {
  animation: finishing 1s;
}
@keyframes finishing {
  0% {
    background-color: rgb(0, 106, 82);
    color: white;
  }
  100% {
    background-color: white;
    color: rgb(0, 106, 82);
  }
}
.finished {
  background-color: #cccccc !important;
  color: gray !important;
  border: 1px solid rgba(0, 0, 0, 0.5) !important;
  transition: 0.5s;
}
.studyList {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin: auto;
  width: 70vw;
  height: 60vh;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-shadow: 0 10px 70px rgba(0, 0, 0, 0.3);
  background-color: white;
}
.studyListBG {
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.01);
  height: 100%;
  border-radius: 5px;
}
.studyListHead {
  width: 100%;
  height: 6vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
}
.studyListHead span:nth-child(1) {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  font-weight: bold;
}
.studyListHead span:nth-child(2) {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  color: rgb(0, 106, 82);
}
.poemItem {
  width: 64vw;
  height: 10vh;
  /* margin: 5vw; */
  margin-left: 3vw;
  margin-right: 3vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* display: flex; */
  /* flex-direction: column; */
}
.poemInfo {
  float: left;
  width: 100px;
  margin-left: 10px;
}
.poemTitle {
  width: 200px;
  margin-top: 2vh;
  font-size: 18px;
  color: rgb(0, 106, 82);
}
.poemWriter {
  /* float: left; */
  width: 100px;
  margin-top: 10px;
  font-size: 13px;
  color: gray;
}
.poemState {
  float: right;
  /* align-self: flex-end; */
  margin-right: 20px;
  margin-top: 4vh;
  color: rgba(0, 0, 0, 0.2);
}
.finishedLogo {
  color: rgb(0, 106, 82);
}

.Repo {
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 92vh;
  top: 8vh;
  overflow: scroll;
  background-color: white;
}
.Repo .item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.Repo .item img {
  margin-left: 10px;
  margin-right: 10px;
  width: 4vh;
  height: 4vh;
}
.Repo .item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}
/* @keyframes repoSelect {
  0%{

  }
} */
.poemRepo {
  position: fixed;
  z-index: 1000;
  top: 3.5vh;
  right: 1em;
  width: 25vw;
  height: 1.6em;
  background-color: rgba(0, 0, 0, 0.07);
  color: gray;
  border-radius: 8px;
  font-size: 0.8em;
  text-align: center;
  line-height: 1.6em;
}
.poemRepo img {
  margin-top: 1px;
  width: 1em;
  height: 1em;
}

.test {
  position: fixed;
  width: 100vw;
  height: 50vw;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  font-size: 20px;
  color: white;
}
.playing{
  color: rgb(0, 106, 82);
}
</style>
