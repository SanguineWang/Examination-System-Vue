import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import * as tpyes from "../store/type";
import Home from "../views/Admin/Home.vue";
import Welcome from "../views/Admin/Welcome.vue";
import StuList from "../views/Admin/StuList.vue";
import TeachList from "../views/Admin/TeachList.vue";
import { rules } from "eslint-plugin-prettier";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  }
];
let teacherRouters = [
  {
    path: "/teacher",
    component: () => import("../views/Teacher/TeacherIndex.vue"),
    children: [
      {
        path: "exam",
        component: () => import("../views/Teacher/Exam/ExamList.vue")
      },
      {
        path: "exam/:eid",
        props: true,
        component: () => import("../views/Teacher/Exam/ExamDetail.vue")
      },
      {
        path: "myInfo",
        name: "myInfo",
        component: () => import("../views/Teacher/TeacherInfo.vue")
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("../views/Teacher/TeacherSetting.vue")
      }
    ]
  }
];
let studentRouters = [
  {
    path: "/student",
    name: "StudentHome",
    component: () => import("../views/Student/StudentIndex.vue"),
    children: [
      {
        props: true,
        path: "/examList",
        component: () => import("../views/Student/examList.vue")
      },
      {
        props: true,
        path: "/examInfo/:eid",
        component: () => import("../views/Student/examInfo.vue")
      },
      {
        path: "/studentInfo",
        component: () => import("../views/Student/studentInfo.vue")
      },
      {
        path: "/gradeList",
        component: () => import("../views/Student/gradeInfo.vue")
      }
    ]
  }
];
let adminRouters = [
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/stuList", component: StuList },
      { path: "/teachList", component: TeachList }
    ]
  }
];
const router = new VueRouter({
  routes
});
// 重复点击页面报错解决
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
// 更新路由
export function updateRouters() {
  let role = sessionStorage.getItem(tpyes.role);
  switch (role) {
    case tpyes.teacherRole:
      router.addRoutes(teacherRouters);
      break;
    case tpyes.studentRole:
      router.addRoutes(studentRouters);
      break;
    case tpyes.adminRole:
      router.addRoutes(adminRouters);
      break;
  }
}
// 刷新页面更新路由
updateRouters();
