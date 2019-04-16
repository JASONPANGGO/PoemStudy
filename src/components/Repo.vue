<template>
  <div>
    <div class="gradeList">
      <router-link to="/">
        <div class="gradeItem" v-for="(item, index) in grades" :key="index" @click="select(index)">
          {{item.name}}
          <div :class="{'gradeSelected':item.name == selected }">
            <i class="fa fa-check-circle-o"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import VueEvent from "../model/vueEvent.js";
export default {
  name: "Repo",
  data() {
    return {
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
        { name: "七年级上册" }
      ],
      selected: ""
    };
  },
  methods: {
    select(index) {
      this.selected = this.grades[index].name;
      VueEvent.$emit("sendGrade", this.grades[index].name);
    }
  },
  mounted() {
    VueEvent.$on("sendGrade", e => {
      this.selected = e;
    });
    // this.selected = '1'
  }
};
</script>
<style>
@import url(../assets/font-awesome-4.7.0/css/font-awesome.min.css);

.gradeList {
  margin-top: 10vh;
  width: 100vw;
  overflow: scroll;
}
.gradeItem {
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  padding-left: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #cccccc;
}
.gradeItem i {
  color: #cccccc;
  line-height: 8vh;
}
.gradeSelected i {
  color: rgb(0, 106, 82) !important;
}
</style>

