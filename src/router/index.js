import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import * as tpyes from "../store/type";

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
    name: "TeacherHome",
    component: () => import("../views/Teacher/TeacherIndex.vue"),
    children: []
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
        component: () => import("../views/Student/examList.vue"),

      }, {
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
let adminRouters = [];
const router = new VueRouter({
  routes
});

export default router;
// 更新路由
export function updateRouters() {
  switch (sessionStorage.getItem(tpyes.role)) {
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
