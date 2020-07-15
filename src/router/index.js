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
let studentRouters = [];
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
