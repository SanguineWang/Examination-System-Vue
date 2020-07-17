<template>
  <div>
    <div>
      <!-- 考试列表展示 -->
      <h1>考试列表展示</h1>
      <div>
        <v-alert
          :value="this.$data.alert"
          color="pink"
          dark
          border="top"
          icon="mdi-home"
          transition="scale-transition"
          >当前考试不参加</v-alert
        >
      </div>
      <v-card class="mx-auto" tile>
        <v-list shaped>
          <v-subheader>考试列表</v-subheader>
          <v-list-item v-for="(exam, i) in data.examList" :key="i" click>
            <v-list-item-icon>
              <v-icon>mdi-contacts</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <h3>
                <p>
                  考试名:
                  <span v-text="exam.name"></span>
                </p>
              </h3>

              <p>
                开始时间:
                <span v-text="formatDate(exam.startTime)"></span>
              </p>

              <p>
                结束时间:
                <span v-text="formatDate(exam.endTime)"></span>
              </p>
              <p>
                授课教师:
                <span v-text="exam.teacherName"></span>
              </p>
            </v-list-item-content>
            <div class="text-center">
              <v-dialog v-model="dialog" width="500" v-if="!exam.isSubmit">
                <template v-slot:activator="{ on, attrs }" >
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" 
                    >进入考试</v-btn
                  >
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >考前须知
                  </v-card-title>

                  <v-card-text>请确保网络环境的问题</v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="intoExam(exam.id)"
                      >同意上述须知</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <div v-else>当前考试已提交</div>
            </div>
          </v-list-item>
        </v-list>
      </v-card>

      <!-- <router-view /> -->
    </div>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  created() {
    this.getExamList();
  },
  data: () => ({
    alert: false,
    dialog: false,
    data: {
      length: 2,
      examList: []
    }
  }),
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    // 获取考试列表
    async getExamList() {
      let resp = await axios.get("students/exam");
      if (resp != null) {
        console.log(resp.data.data.examList);
        this.data.examList = resp.data.data.examList;
        console.log(this.data.examList);
      } else {
        console.log("响应为空");
      }
    },
    // 获取考卷
    async getExamDetail(eid) {
      let resp = await axios.get("students/exam/" + eid);
      if (resp.status != 200) {
        console.log("nope!");
        console.log(resp);
      } else {
        console.log(resp);
      }
    },
    //提交考卷
    // async uploadExamDetail(eid, exam) {
    //   console.log("POST 试卷");
    //   console.log(exam);
    //   let resp = await axios.post("students/exam/" + eid, exam);
    //   if (resp != null) {
    //     console.log(resp.data);
    //     console.log("提交成功");
    //   } else {
    //     console.log("响应为空");
    //   }
    //   this.$router.push("/student");
    // },
    intoExam(eid) {
      this.getExamDetail(eid)
        .then(() => {
          console.log("into exam" + eid);
          this.$router.push("/examInfo/" + eid);
        })
        .catch(() => {
          this.$data.alert = !this.$data.alert;
          this.$data.dialog = false;
        });
    }
  }
};
</script>
