<template>
  <div>
    <h1>成绩列表展示</h1>
    <v-card class="mx-auto text-center" max-width="600">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">{{ item.value }}</template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">近期成绩折线</div>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
    <v-card class="mx-auto" tile>
      <v-list shaped>
        <v-subheader>考试列表</v-subheader>
        <v-list-item-group v-model="examList" color="primary">
          <v-list-item v-for="(exam, i) in examList" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-contacts</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="exam.name">
                考试编号：
                <p v-text="exam.id"></p>
              </v-list-item-title>
              <h3>
                考试成绩：{{
                  sumGrade(exam.objectiveGrade, exam.subjectiveGrade)
                }}
              </h3>
              <v-list-item-title
                v-text="formatDate(exam.startTime)"
              ></v-list-item-title>
              <v-list-item-title
                v-text="formatDate(exam.endTime)"
              ></v-list-item-title>
              <v-list-item-title v-text="exam.teacherName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  created() {
    this.getGradeNetWork();
  },
  data: () => ({
    value: [0],

    examList: [
      // {
      //   id: null,
      //   startTime: null,
      //   endTime: null,
      //   name: null,
      //   studentName: null,
      //   objectiveGrade: null,
      //   subjectiveGrade: null,
      //   studentNumber: null,
      //   teacherName: null,
      //   teacherNumber: null
      // }
    ]
  }),
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    sumGrade(o, s) {
      return o + s;
    },
    async getGradeNetWork() {
      let resp = await axios.get("students/myGrade");
      if (resp != null) {
        console.log(resp.data);
        this.examList = resp.data.data.examList;
        this.examList.forEach(element =>
          this.$data.value.push(
            element.objectiveGrade + element.subjectiveGrade
          )
        );
        console.log(this.examList);
      } else {
        console.log("响应为空");
      }
    }
  }
};
</script>
