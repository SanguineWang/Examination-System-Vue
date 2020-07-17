<template>
  <div>
    <h1>考试</h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" color="#26c6da" dark max-width="600">
          <v-card-title>
            <v-icon large left>mdi-twitter</v-icon>
            <span class="title font-weight-light">考试信息</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <p>
              考试名称：
              {{ exam.name }}
            </p>
            <p>
              考试开始时间：
              <span v-text="this.$data.exam.startTime"></span>
            </p>
            <p>
              考试结束时间：
              <span v-text="this.$data.exam.endTime"></span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- <v-card>
          <v-card-title>
            <v-icon large left>timer</v-icon>
            <h2>当前剩余时间</h2>
          </v-card-title>
          {{ calTime(this.$data.exam.endTime) }}
          <v-card-text></v-card-text>
        </v-card> -->
      </v-col>
    </v-row>
    <h3>选择题</h3>
    <v-list>
      <v-list-item v-for="(choice, i) in this.$data.exam.choiceList" :key="i">
        <v-card min-width="100%">
          <v-card-title>
            <v-icon large left>edit</v-icon>
            <p v-text="choice.title"></p>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="choice.answer">
              <v-radio
                :key="1"
                :label="`${choice.option_A}`"
                :value="1"
              ></v-radio>
              <v-radio
                :key="2"
                :label="`${choice.option_B}`"
                :value="2"
              ></v-radio>
              <v-radio
                :key="3"
                :label="`${choice.option_C}`"
                :value="4"
              ></v-radio>
              <v-radio
                :key="4"
                :label="`${choice.option_D}`"
                :value="8"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <h3>判断题</h3>
    <v-list>
      <v-list-item
        v-for="(judgment, i) in this.$data.exam.judgmentList"
        :key="i"
      >
        <v-card min-width="100%">
          <v-card-title>
            <v-icon large left>edit</v-icon>
            <p v-text="judgment.title"></p>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="judgment.answer">
              <v-radio :key="1" label="正确" :value="0"></v-radio>
              <v-radio :key="2" label="错误" :value="1"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <h3>主观题</h3>
    <v-list>
      <v-list-item
        v-for="(subject, i) in this.$data.exam.subjectiveList"
        :key="i"
      >
        <v-card min-width="100%">
          <v-card-title>
            <v-icon large left>edit</v-icon>
            <p v-text="subject.title"></p>
          </v-card-title>
          <v-card-actions>
            <v-textarea
              outlined
              label="你的回答"
              
              v-model="subject.answer"
            ></v-textarea>
          </v-card-actions>
        </v-card>
      </v-list-item>
    </v-list>
    <v-container>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn block color="secondary" primary v-bind="attrs" v-on="on"
              >提交试卷</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title
              >提交确认</v-card-title
            >

            <v-card-text>请仔细检查试卷，提交后无法进行更改</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="uploadExam(exam.id, exam)"
                >确认提交</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  props: ["eid"],
  created() {
    console.log(this.eid);

    this.getExamDetail(this.eid);
    console.log(this.$data.exam);
  },
  data() {
    return {
      dialog: false,
      exam: {
        name: null,
        startTime: null,
        endTime: null,
        choiceList: [
          {
            id: 1,
            title:
              "这是一道选择题1，这是一道选择1，这是一道选择题1，这是一道选择题1，",
            option_A: "选项A",
            option_B: "选项B",
            option_C: "选项C",
            option_D: "选项D",
            answer: 3,
            score: 2.5
          }
        ],
        judgmentList: [
          {
            id: 1,
            title:
              "这是一道判断题1,这是一道判断题1,这是一道判断题1,这是一道判断题1,这是一道判断题1",
            answer: 1,
            score: 2.5
          }
        ],
        subjectiveList: [
          {
            id: 1,
            title:
              "这是一道主观题,这是一道主观题,这是一道主观题,这是一道主观题,这是一道主观题",
            answer: "参考答案",
            score: 5
          }
        ]
      }
    };
  },
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    //获取考卷
    async getExamDetail(eid) {
      let resp = await axios.get("students/exam/" + eid);
      if (resp != null) {
        console.log(resp.data);
        this.$data.exam = resp.data.data.exam;
        this.$data.exam.choiceList.forEach(element => {
          element.answer = -1;
        });
        this.$data.exam.judgmentList.forEach(element => {
          element.answer = -1;
        });
        this.$data.exam.subjectiveList.forEach(element => {
          element.answer = "";
        });
        console.log("获取试卷");
        console.log(this.$data);
      } else {
        console.log("响应为空");
      }
    },
    //提交考卷
    async uploadExamDetail(eid, exam) {
      console.log("POST 试卷");
      console.log(exam);
      let resp = await axios.post("students/exam/" + eid, exam);
      if (resp != null) {
        console.log(resp.data);
        console.log("提交成功");
      } else {
        console.log("响应为空");
      }
      this.$router.push("/examList");
    },
    intoExam(eid) {
      console.log("into exam" + eid);

      this.getExamDetail(eid).then(() => {
        this.noexaming = false;
        this.dialog = false;
      });
    },
    uploadExam(eid, exam) {
      console.log(eid);
      console.log(exam);
      this.uploadExamDetail(eid, exam).then(() => {
        this.noexaming = true;
      });
    }
  }
};
</script>

<style></style>
