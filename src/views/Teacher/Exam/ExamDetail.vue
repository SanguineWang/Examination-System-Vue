<template>
  <div class="detail">
    <v-row>
      <v-breadcrumbs :items="breadItems" large></v-breadcrumbs>
    </v-row>
    <v-row align="center" class="mx-auto" justify="center">
      <v-toolbar-title
        ><h3>{{ examDetail.name }}</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined @click="openGradeSheet()">
        <v-icon left dark>sort</v-icon>
        统计成绩
      </v-btn>
      <v-btn class="ma-2" outlined @click="dialog = !dialog">
        <v-icon left dark>search</v-icon>
        查看试卷
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-file-input
          show-size
          counter
          chips
          multiple
          label="Import students"
          @change="readStudents"
        ></v-file-input>
      </v-col>
      <v-col cols="6">
        <v-file-input
          show-size
          counter
          chips
          multiple
          label="Import paper"
          @change="readPaper"
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">序号</th>
                <th class="text-left">学号</th>
                <th class="text-left">学生名</th>
                <th class="text-left">提交情况</th>
                <th class="text-left">客观题</th>
                <th class="text-left">主观题</th>
                <th class="text-left">答题卡</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in examDetail.studentExams"
                :key="`studentExams-${item.id}`"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.student.user.number }}</td>
                <td>{{ item.student.user.name }}</td>
                <td>{{ item.submit ? "已提交" : "未提交" }}</td>
                <td>{{ item.objectiveGrade }}</td>
                <td>{{ item.subjectiveGrade }}</td>
                <td>
                  <v-btn
                    class="ma-2"
                    outlined
                    v-if="item.submit"
                    @click="openStuentSheet(item.student.user.id)"
                  >
                    查看答题卡
                    <v-icon right dark>keyboard_arrow_right</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          试卷
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="dialog = !dialog">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <h3>一、选择题</h3>
          <template v-for="(item, index) in examDetail.choiceList">
            <div :key="`choiceList-${item.id}`">
              <h5>{{ index + 1 }}.{{ item.title }} ({{ item.score }}分)</h5>
              <br />
              <v-list-item-subtitle>
                A.{{ item.option_A }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                B.{{ item.option_B }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                C.{{ item.option_C }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                D.{{ item.option_D }}
              </v-list-item-subtitle>
              <br />

              <v-list-item-subtitle>
                答案：{{ getOption(item.answer) }}
              </v-list-item-subtitle>
              <br />
            </div>
          </template>
          <h3>二、判断题</h3>
          <template v-for="(item, index) in examDetail.judgmentList">
            <div :key="`judgmentList-${item.id}`">
              <h5>{{ index + 1 }}.{{ item.title }} ({{ item.score }}分)</h5>
              <br />
              <v-list-item-subtitle>
                答案：{{ item.answer == 0 ? "×" : "√" }}
              </v-list-item-subtitle>
              <br />
            </div>
          </template>
          <h3>三、简答题</h3>
          <template v-for="(item, index) in examDetail.subjectiveList">
            <div :key="`subjectiveList-${item.id}`">
              <h5>{{ index + 1 }}.{{ item.title }} ({{ item.score }}分)</h5>
              <br />
              <p>参考答案：{{ item.answer }}</p>
              <br />
            </div>
          </template>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="studentSheetDialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          答题卡
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="studentSheetDialog = !studentSheetDialog"
          >
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <h3>简答题</h3>
          <template v-for="(item, index) in subjectiveList">
            <div :key="`subjectiveList-${item.id}`">
              <h3>
                {{ index + 1 }}.{{ item.subjective.title }} ({{
                  item.subjective.score
                }}分)
              </h3>
              <br />
              <p>他的回答：{{ item.answer }}</p>
              <br />
              <p>参考答案：{{ item.subjective.answer }}</p>
              <br />
              <v-text-field
                label="评分"
                v-model="item.score"
                :rules="scoreRules"
              ></v-text-field>
              <br />
            </div>
          </template>
          <v-col cols="12" md="4" class="mx-auto">
            <v-btn
              class="mx-auto"
              color="secondary"
              @click="closeStuentSheet(subjectiveList[0].student.user.id)"
            >
              <v-icon>check</v-icon>Submit
            </v-btn>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="gradeDialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          成绩单
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="gradeDialog = !gradeDialog"
          >
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <v-col cols="12" md="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">序号</th>
                    <th class="text-left">学号</th>
                    <th class="text-left">学生名</th>
                    <th class="text-left">考试名</th>
                    <th class="text-left">教师名</th>
                    <th class="text-left">总分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in gradeSheetList"
                    :key="`gradeSheetList-${index}`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.student.user.number }}</td>
                    <td>{{ item.student.user.name }}</td>
                    <td>{{ item.exam }}</td>
                    <td>{{ item.teacher }}</td>
                    <td>{{ item.grade }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
import * as analysis from "@/util/analysisExcel.js";
export default {
  props: ["eid"],
  data() {
    return {
      paper: {},
      students: [],
      gradeDialog: false,
      dialog: false,
      studentSheetDialog: false,
      gradeSheetList: [],
      scoreRules: [v => v != "" || "不能为空"],
      // 考试学生列表和试卷
      examDetail: [],
      // 学生主观题答题卡
      subjectiveList: [],
      breadItems: [
        {
          text: "exam",
          disabled: false,
          href: "#/teacher/exam"
        },
        {
          text: "examDetail",
          disabled: true
        }
      ]
    };
  },
  components: {},
  created() {
    this.getExamDetail();
  },
  mounted() {},
  methods: {
    // 读取学生
    readStudents(files) {
      let file = files[0];
      analysis.readStudentsFile(file).then(data => {
        this.students = data;
        this.addStudentsToExam();
      });
    },
    // 读取试卷
    readPaper(files) {
      let file = files[0];
      analysis.readPaperFile(file).then(data => {
        this.paper = data;
        console.log(this.paper);
        this.addPaperToExam();
      });
    },
    // 数字转选项
    getOption(number) {
      //  var option = ["A","B","C","D"]

      if (number == 1) return "A";
      if (number == 2) return "B";
      if (number == 3) return "AB";
      if (number == 4) return "C";
      if (number == 5) return "AC";
      if (number == 6) return "BC";
      if (number == 7) return "ABC";
      if (number == 8) return "D";
      if (number == 9) return "AD";
      if (number == 10) return "BD";
      if (number == 11) return "ABD";
      if (number == 12) return "CD";
      if (number == 13) return "ACD";
      if (number == 14) return "BCD";
      if (number == 15) return "ABCD";
      return;
    },
    // 打开统计成绩面板
    openGradeSheet() {
      this.getGradeSheetList().then(() => {
        this.gradeDialog = !this.gradeDialog;
      });
    },
    // 打开学生答题卡，传入学生sid
    openStuentSheet(sid) {
      this.getStudentSheet(sid).then(() => {
        this.studentSheetDialog = !this.studentSheetDialog;
      });
    },
    // 关闭学生答题卡，上传评卷结果
    closeStuentSheet(sid) {
      this.updateStudentsSubjective(sid).then(() => {
        this.getExamDetail();
        this.studentSheetDialog = !this.studentSheetDialog;
      });
    },
    // 获取考试详细
    async getExamDetail() {
      let resp = await axios.get(`teacher/exam/${this.eid}`);
      this.examDetail = resp.data.data.examDetail;
    },
    // 导入试题
    async addPaperToExam() {
      let resp = await axios.post(`teacher/exam/${this.eid}/paper`, this.paper);
      this.examDetail = resp.data.data.examDetail;
    },
    // 导入学生
    async addStudentsToExam() {
      let resp = await axios.post(
        `teacher/exam/${this.eid}/students`,
        this.students
      );
      this.examDetail = resp.data.data.examDetail;
    },
    // 获取学生主观题
    async getStudentSheet(sid) {
      let resp = await axios.get(`teacher/exam/${this.eid}/student/${sid}`);
      this.subjectiveList = resp.data.data.subjectiveList;
    },
    // 批卷主观题
    async updateStudentsSubjective(sid) {
      let resp = await axios.patch(
        `teacher/exam/${this.eid}/student/${sid}`,
        this.subjectiveList
      );
      this.examDetail = resp.data.data.examDetail;
    },
    // 统计成绩
    async getGradeSheetList() {
      let resp = await axios.get(`teacher/exam/${this.eid}/grade`);
      this.gradeSheetList = resp.data.data.gradeSheetList;
    }
  }
};
</script>
<style scoped></style>
