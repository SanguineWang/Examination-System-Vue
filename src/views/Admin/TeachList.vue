<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="50">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加教师</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="user.name"></el-table-column>
        <el-table-column label="教工号" prop="user.number"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="medium"
              @click="removeUserById(scope.row.user.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加教师" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form ref="addFormRef" label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="add.user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="add.user.password"></el-input>
        </el-form-item>
        <el-form-item label="教工号" prop="number">
          <el-input v-model="add.user.number"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      query: "",
      userlist: [],
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      add: {
        user: {
          username: "",
          password: "",
          number: "",
          role: "TEACHER"
        }
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        number: [{ required: true, message: "请输入教工号", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const data = await this.$http.get("/admin/teachers");
      console.log(data);
      if (data.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = data.data.data.teacherList;
      // this.total = res.data.total
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    async addUser() {
      // 可以发起添加用户的网络请求
      const data = await this.$http.post("/admin/teachers", this.add);
      // console.log(data);
      // if (data.status !== 201) {
      //   this.$message.error("添加用户失败！");
      // }

      // this.$message.success("添加用户成功！");
      // 隐藏添加用户的对话框
      this.addDialogVisible = false;
      this.userlist = data.data.data.teacherList;
      // 重新获取用户列表数据
      // this.getUserList();
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const data = await this.$http.delete("admin/teachers/" + id);

      if (data.status !== 200) {
        return this.$message.error("删除用户失败！");
      }

      this.$message.success("删除用户成功！");
      this.userlist = data.data.data.teacherList;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
