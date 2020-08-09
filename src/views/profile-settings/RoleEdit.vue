<template>
  <div v-if="showApp" class="app-container">
    <el-alert title="注意：如果设置了mod权限，即便不设置get权限，也拥有get功能。" />
    <div style="height: 10px;" />
    <!--********************************************* 角色列表 ***********************************************-->
    <el-divider>
      <el-button
        size="small"
        round
        type="primary"
        plain
        @click="handleDisplayAddView(form)"
      >
        <i class="el-icon-circle-plus" />
        增加角色
      </el-button>
    </el-divider>

    <el-collapse>
      <el-collapse-item v-for="(item,index) in list" :key="index" :name="index">

        <template slot="title">
          <i class="el-icon-s-custom" style="font-size: large" />
          <span style="width: 5px" />
          <strong style="width: 120px">{{ item['roleName'] }}</strong>
        </template>

        <div class="content">
          <div v-if="item.permissions.length>0">
            <div v-for="(v,i) in item.permissions" :key="i">
              <el-alert
                v-if="v"
                :title="'权限：'+v.permission"
                :description="'描述：'+v.description"
                :closable="false"
                type="info"
              />
            </div>
          </div>
          <div v-else>
            <el-alert
              title="还未分配权限"
              :closable="false"
              type="warning"
            />
          </div>
        </div>
        <el-row type="flex">
          <el-col>
            <el-button
              style="width: 100%"
              plain
              size="small"
              @click="handleDisplayModifyView('改名',item)"
            >修改角色
            </el-button>
          </el-col>
          <el-col>
            <el-button
              style="width: 100%"
              plain
              size="small"
              @click="handleDisplayModifyView('分配',item)"
            >分配权限
            </el-button>
          </el-col>
          <el-col>
            <el-button
              style="width: 100%"
              plain
              size="small"
              @click="handleDelete(item.id)"
            >删除角色
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <!--********************************************* 增加表单 ***********************************************-->
    <el-dialog
      title="增加角色"
      :visible.sync="dialogVisible1"
      width="80%"
    >
      <el-form ref="newRole" :model="newRole" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newRole.roleName" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="newRole.description" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="handleAdd(newRole)">确 定</el-button>
      </span>
    </el-dialog>
    <!--********************************************* 改名表单 *****************************************-->
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible2"
      width="80%"
    >
      <el-form ref="newRole" :model="newRole" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newRole.roleName" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="newRole.description" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(newRole)">确 定</el-button>
      </span>
    </el-dialog>
    <!--********************************************* 分配权限表单*****************************************-->
    <el-dialog
      :title="'为'+newRole.roleName+'分配权限'"
      :visible.sync="dialogVisible3"
      width="80%"
    >

      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedPermissionIds" @change="handleCheckedPermissionsChange">
        <el-checkbox
          v-for="(permission,index) in allPermissions"
          :key="index"
          :class="device==='desktop'?'desktop':'mobile'"
          :label="permission.id"
        >
          <div>
            <strong>{{ permission.permission }}</strong>
            {{ permission.description }}
          </div>
        </el-checkbox>
      </el-checkbox-group>

      <span slot="footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="handleAlloc(newRole.id,checkedPermissionIds)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    deleteOneRole,
    getAllRoles,
    postOneRole,
    putOneRole,
    getAllPermissions,
    putOneRoleWithPermissionIds,
  } from '@/request/auth'
  import {mapGetters} from 'vuex'

  export default {
    name: 'RoleEdit',
    data() {
      return {
        showApp: false,
        list: [],
        form: {},
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        newRole: {
          roleName: '',
          description: '',
          permissions: [],
        },
        rules: { // 被增加表单、改名表单共用
          roleName: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 18 个字符', trigger: 'blur'},
          ],
          // 不能写做 description: this.rules.roleName。否则会报错
          description: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'},
          ],
        },
        checkAll: false,
        checkedPermissionIds: [],
        allPermissions: [],
        isIndeterminate: true,
      }
    },
    computed: {
      ...mapGetters(['device']),
    },
    created() {
      this.fetchData()
    },
    methods: {
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                     请求相关
                                                     查、删、增、改
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      fetchData() {
        getAllRoles().then(data => {
          this.showApp = true
          this.list = data
          getAllPermissions().then(data => {
            this.allPermissions = data
          })
        })
      },

      handleDelete(id) {
        deleteOneRole(id).then(_ => {
          this.fetchData()
        })
      },

      handleDisplayAddView() {
        this.newRole = {}
        this.dialogVisible1 = true
      },
      handleAdd(role) {
        this.$refs['newRole'].validate((valid) => {
          if (valid) {
            postOneRole(role).then(_ => {
              this.hideForm()
              this.$refs['newRole'].resetFields()
              this.fetchData()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleUpdate(role) {
        this.$refs['newRole'].validate((valid) => {
          if (valid) {
            putOneRole(role.id, role).then(_ => {
              this.hideForm()
              this.fetchData()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleAlloc(id, permissionIds) {
        this.hideForm()
        putOneRoleWithPermissionIds(id, permissionIds).then(_ => {
          this.fetchData()
        })
      },
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                       通用方法
                                                       视图方法
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      handleDisplayModifyView(type, oldRole) {
        this.newRole = JSON.parse(JSON.stringify(oldRole))
        if (type === '改名') {
          this.dialogVisible2 = true
        }
        if (type === '分配') {
          this.dialogVisible3 = true
          this.checkedPermissionIds = oldRole.permissions.map(p => p.id)
        }
      },
      hideForm() {
        this.dialogVisible1 = false
        this.dialogVisible2 = false
        this.dialogVisible3 = false
      },
      // -- 以下两个方法，保证了 全选框和 普通框实现联动
      handleCheckAllChange(val) { // var = true or false
        this.checkedPermissionIds = val
          ? this.allPermissions.map(p => p.id)
          : []
        this.isIndeterminate = false
      },
      handleCheckedPermissionsChange(value) { // 全选是否被勾选
        const checkedCount = value.length
        this.checkAll = checkedCount === this.allPermissions.length
        // checkbox有三种状态全选(显示的'√'),选中部分(显示的'-'),全不选(啥都没显示)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allPermissions.length
      },
    },
  }
</script>

<style scoped lang="scss">
  .desktop {
    width: 45%;
  }

  .mobile {
    width: 80%;
  }
</style>
