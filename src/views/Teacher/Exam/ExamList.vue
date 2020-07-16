<template>
  <div>
    <v-row>
      <v-breadcrumbs :items="breadItems" large></v-breadcrumbs>
    </v-row>
    <v-row align="center" class="mx-auto" justify="center">
      <v-toolbar-title><h3>考试管理</h3> </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">序号</th>
                <th class="text-left">名称</th>
                <th class="text-left">开始时间</th>
                <th class="text-left">结束时间</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in exams" :key="`exam-${item.id}`">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ formatDate(item.startTime) }}</td>
                <td>{{ formatDate(item.endTime) }}</td>
                <td>
                  <v-btn icon @click="openUpdateDialog(item)">
                    <v-icon>create</v-icon>
                  </v-btn>

                  <v-btn icon @click="deleteExam(item.id)">
                    <v-icon>delete_sweep</v-icon>
                  </v-btn>
                </td>
                <v-btn class="ma-2" outlined @click="routerToDetail(item.id)">
                  Enter
                  <v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-btn
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          添加考试
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="dialog = !dialog">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="newEaxm.name"
                  :rules="nameRules"
                  label="考试名"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  :value="getStartTime"
                  label="开始时间"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-date-picker v-model="startDate"></v-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <v-time-picker
                  v-model="startTime"
                  format="24hr"
                  full-width
                ></v-time-picker>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  :value="getEndTime"
                  label="结束时间"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-date-picker v-model="endDate"></v-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <v-time-picker
                  v-model="endTime"
                  full-width
                  format="24hr"
                ></v-time-picker>
              </v-col>

              <v-col cols="12" md="4" class="mx-auto">
                <v-btn
                  class="mx-auto"
                  color="secondary"
                  :disabled="!valid"
                  @click="addExamToDB"
                >
                  <v-icon>check</v-icon>Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateDialog" max-width="600px">
      <v-card>
        <v-card-title>
          修改考试
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="updateDialog = !updateDialog"
          >
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="newEaxm.name"
                  :rules="nameRules"
                  label="考试名"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  :value="getStartTime"
                  label="开始时间"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-date-picker v-model="startDate"></v-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <v-time-picker
                  v-model="startTime"
                  format="24hr"
                  full-width
                ></v-time-picker>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  :value="getEndTime"
                  label="结束时间"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-date-picker v-model="endDate"></v-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <v-time-picker
                  v-model="endTime"
                  full-width
                  format="24hr"
                ></v-time-picker>
              </v-col>

              <v-col cols="12" md="4" class="mx-auto">
                <v-btn
                  class="mx-auto"
                  color="secondary"
                  :disabled="!valid"
                  @click="updateExamToDB"
                >
                  <v-icon>check</v-icon>Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  data() {
    return {
      dialog: false,
      updateDialog: false,
      valid: false,
      nameRules: [v => v != "" || "不能为空"],
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startTime: "12:00",
      endTime: "13:00",
      exams: [],
      newEaxm: {
        id: null,
        name: "",
        startTime: "",
        endTime: ""
      },
      breadItems: [
        {
          text: "exam",
          disabled: true
        }
      ]
    };
  },
  computed: {
    getStartTime() {
      return this.startDate + "T" + this.startTime;
    },
    getEndTime() {
      return this.endDate + "T" + this.endTime;
    }
  },
  components: {},
  created() {
    this.getExamList();
  },
  mounted() {},
  methods: {
    formatDate(date) {
      return date.replace("T", "-");
    },
    openUpdateDialog(exam) {
      this.newEaxm = exam;
      this.startDate = exam.startTime.substr(0, 10);
      this.endDate = exam.endTime.substr(0, 10);
      this.startTime = exam.startTime.substr(11, 15);
      this.endTime = exam.endTime.substr(11, 15);
      this.updateDialog = !this.updateDialog;
    },
    routerToDetail(eid) {
      this.$router.push(`/teacher/exam/${eid}`);
    },
    addExamToDB() {
      this.newEaxm.startTime = this.getStartTime;
      this.newEaxm.endTime = this.getEndTime;
      console.log(this.newEaxm);

      this.addExam(this.newEaxm).then(() => {
        this.dialog = !this.dialog;
        this.newEaxm = {};
      });
    },
    updateExamToDB() {
      this.newEaxm.startTime = this.getStartTime;
      this.newEaxm.endTime = this.getEndTime;
      console.log(this.newEaxm);

      this.updateExam(this.newEaxm).then(() => {
        this.updateDialog = !this.updateDialog;
        this.newEaxm = {};
      });
    },
    // 考试集合获取
    async getExamList() {
      let resp = await axios.get("teacher/exam");
      this.exams = resp.data.data.examList;
    },
    //添加考试
    async addExam(newExam) {
      let resp = await axios.post("teacher/exam", newExam);
      this.exams = resp.data.data.examList;
    },
    //修改考试
    async updateExam(newExam) {
      let resp = await axios.patch(`teacher/exam/${newExam.id}`, newExam);
      this.exams = resp.data.data.examList;
    },
    //删除考试
    async deleteExam(id) {
      let resp = await axios.delete(`teacher/exam/${id}`);
      this.exams = resp.data.data.examList;
    }
  }
};
</script>
<style scoped></style>
