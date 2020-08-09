<template>
  <div v-if="showApp" class="app-container">
    <el-alert type="warning">所有的权限应该在代码实现时就确定，不要随便更改。</el-alert>
    <el-divider>
      <el-button
        round
        size="small"
        plain
        type="primary"
        style="width: 100%;"
        @click="handleGotoView()"
      >
        <i class="el-icon-circle-plus" />
        增加权限
      </el-button>
    </el-divider>
    <!--********************************************* 权限列表 ***********************************************-->
    <el-table
      :data="list"
      height="500"
      border
      size="large"
      style="width: 100%"
    >
      <el-table-column
        prop="permission"
        label="权限名"
      />
      <el-table-column
        prop="description"
        label="说明"
      />
      <el-table-column
        prop="description"
        label="操作"
        width="130px"
      >
        <template slot-scope="scope">
          <div class="operations">
            <el-button size="mini" plain type="primary" @click="handleGotoView(scope.row)">修改</el-button>
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--********************************************* 增加/修改权限 ***********************************************-->
    <el-dialog :title="typeName+'权限'" :visible.sync="dialogVisible">
      <el-form
        label-width="60px"
        label-position="left"
        style="width: 80%;margin:0 auto;"
      >
        <el-form-item label="权限名">
          <el-input v-model="formData.permission" size="small" type="primary" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="formData.description" size="small" type="primary" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain style="width: 100%" @click="handleModify">{{ typeName }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {deleteOnePermission, getAllPermissions, postOnePermission, putOnePermission} from '@/request/auth'

  export default {
    name: 'PermissionEdit',
    data() {
      return {
        showApp: false,
        dialogVisible: false,
        list: [],
        formData: {},
        typeName: '', // update or add
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllPermissions().then(data => {
          this.showApp = true
          this.list = data
        })
      },
      handleGotoView(row) {
        this.formData = {}
        this.dialogVisible = true
        if (row) {
          this.typeName = '修改'
          this.formData = JSON.parse(JSON.stringify(row))
        } else {
          this.typeName = '增加'
        }
        console.log(row)
      },
      handleDelete(id) {
        deleteOnePermission(id).then(_ => {
          this.fetchData()
        })
      },
      handleModify() {
        if (this.typeName === '修改') {
          putOnePermission(this.formData).then(_ => {
            this.fetchData()
            this.dialogVisible = false
          })
        }
        if (this.typeName === '增加') {
          postOnePermission(this.formData).then(_ => {
            this.fetchData()
            this.dialogVisible = false
          })
        }
      },
    },
  }
</script>

<style scoped>
  .operations {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
