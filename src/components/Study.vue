<template>
  <div>
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
      <div class="studyItem origin">
        <div class="headimg">
          <img src="../assets/jingyesi.jpg" alt>
        </div>

        <div class="title">{{poems[num].title}}</div>
        <div class="writer">{{poems[num].writer}}</div>
        <div class="content">{{poems[num].content}}</div>
      </div>

      <div class="studyItem comment">
        <div class="title">{{poems[num].title}}</div>
        <div class="writer">{{poems[num].writer}}</div>
        <div class="content">
          <span class="green">床</span>前明月光，
          <br>明亮的月光洒在床前的窗户纸上，
          <br><span class="green">疑</span>是地上霜。
          <br>好像地上泛起了一层霜。
          <br>举头望明月，
          <br>我禁不住抬起头来，
          <br>看那天窗外空中的一轮明月，
          <br>低头思故乡。
          <br>不由得低头沉思，
          <br>想起远方的家乡。
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class="content-comment">
        （1）<b>静夜思</b>：安静的夜晚产生的思绪。<br>
（2）<b>床</b>：此诗中的“床”字，是争论和异议的焦点。<br>
（3）<b>疑</b>：好像。
        </div>
        </div>
      

      <div class="studyItem appreciation">
        <div class="content">
          {{poems[num].appreciation}}
        </div>
      </div>

      <div class="studyItem">作者</div>
    </div>
  </div>
</template>

<script>
var studyItemHeight = window.innerHeight * 0.9;
export default {
  name: "Study",
  data() {
    return {
      poems: [
        {
          title: "静夜思",
          writer: "李白",
          content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
          comments:"床前明月光，明亮的月光洒在床前的窗户纸上，疑是地上霜。好像地上泛起了一层霜。举头望明月，我禁不住抬起头来，看那天窗外空中的一轮明月，低头思故乡。不由得低头沉思，想起远方的家乡。",
          appreciation: "这首诗写的是在寂静的月夜思念家乡的感受。诗的前两句，是写诗人在作客他乡的特定环境中一刹那间所产生的错觉。一个独处他乡的人，白天奔波忙碌，倒还能冲淡离愁，然而一到夜深人静的时候，心头就难免泛起阵阵思念故乡的波澜。何况是在月明之夜，更何况是月色如霜的秋夜。“疑是地上霜”中的“疑”字，生动地表达了诗人睡梦初醒，迷离恍惚中将照射在床前的清冷月光误作铺在地面的浓霜。而“霜”字用得更妙，既形容了月光的皎洁，又表达了季节的寒冷，还烘托出诗人飘泊他乡的孤寂凄凉之情。诗的后两句，则是通过动作神态的刻画，深化思乡之情。“望”字照应了前句的“疑”字，表明诗人已从迷朦转为清醒，他翘首凝望着月亮，不禁想起，此刻他的故乡也正处在这轮明月的照耀下。于是自然引出了“低头思故乡”的结句。"
        }
      ],
      num: 0,
      nowContent: 1
    };
  },
  mounted: function() {
    this.checkscroll();
  },
  methods: {
    checkscroll() {
      var startY, endY;
      var direction;
      var distance;

      var that = this;
      window.addEventListener(
        "touchstart",
        function(e) {
          // console.log(e.touches[0].clientX);
          // var startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          // console.log(startY);
        },
        false
      );
      window.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault();
          // console.log(e.touches[0].clientX);
          // var endX = e.touches[0].clientX;
          endY = e.touches[0].clientY;
          // console.log(endY);
          distance = endY - startY;
        },
        { passive: false }
      );
      window.addEventListener(
        "touchend",
        function() {
          if (distance > 0) {
            // 向上翻页
            console.log("向上翻页");
            if (
              Math.abs(document.documentElement.scrollTop - studyItemHeight) < 1
            ) {
              that.changeContent(1);
            } else if (
              Math.abs(
                document.documentElement.scrollTop - studyItemHeight * 2
              ) < 1
            ) {
              that.changeContent(2);
            } else if (
              Math.abs(
                document.documentElement.scrollTop - studyItemHeight * 3
              ) < 1
            ) {
              that.changeContent(3);
            }
          } else if(distance < 0) {
            // 向下翻页
            console.log("向下翻页");
            if (Math.abs(document.documentElement.scrollTop - 0) < 1) {
              that.changeContent(2);
            } else if (
              Math.abs(document.documentElement.scrollTop - studyItemHeight) < 1
            ) {
              that.changeContent(3);
            } else if (
              Math.abs(
                document.documentElement.scrollTop - studyItemHeight * 2
              ) < 1
            ) {
              that.changeContent(4);
            }
          }
        },
        false
      );
    },
    changeContent(e) {
      this.nowContent = e;
      window.scrollTo(0, (e - 1) * studyItemHeight);
    }
  }
};
</script>

<style>
/* 侧边操作栏 */
.operation {
  position: fixed;
  width: 40px;
  height: 60vh;
  top: 40vh;
  /* background-color: blueviolet; */
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
  /* background-color: blue; */
}
.selectThis {
  border-left: 2px solid rgb(0, 106, 82);
  color: rgb(0, 106, 82);
  font-weight: bold;
}

/* 主体内容 */
.container {
  margin: 30px;
  margin-top: 10vh;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.02);
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
  width: 6em;
  line-height: 2em;
  font-size: 20px;
}

.comment .title {
  font-size: 20px;
  color: rgb(0, 106, 82);
  margin-top: 30px;
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
.content-comment{
  text-align: left;
}
.green{
  color: rgb(0, 106, 82);
}

.appreciation .content{
  text-align: left;
}
</style>
