<template>
  <div v-if="showApp" class="app-container">
    <!--********************************************* 用户操作 ***********************************************-->
    <el-divider>
      <el-button
        size="small"
        round
        type="primary"
        plain
        style="width: 100%"
        @click="showAddForm"
      >
        <i class="el-icon-circle-plus" />
        增加用户
      </el-button>
    </el-divider>

    <!--********************************************* 用户列表 ***********************************************-->
    <el-collapse>
      <el-collapse-item v-for="(userItem,index) in list" :key="index" :name="userItem.id">

        <template slot="title">
          <el-image :src="userItem.avatar" class="image" />
          <strong>用户： </strong>
          <strong style="width: 100px;">{{ userItem['username'] }}</strong>
          <span>状态：</span>
          <span>{{ userItem.valid?'正常':'封禁' }}</span>
          <span :class="userItem.valid?'green-circle':'red-circle'" />
        </template>

        <div class="content">
          <div>
            <strong>昵称：</strong>
            {{ userItem['nickname']||'空' }}
          </div>
          <div>
            <strong>角色：</strong>
            <span v-if="userItem['roles'].length>0">
              <el-tag
                v-for="(v,i) in userItem['roles']"
                :key="i"
                class="tag"
                type="info"
              >
                {{ v['roleName'] }}
              </el-tag>
            </span>
            <span v-else>无</span>
          </div>
          <div>
            <strong>邮箱：</strong>
            {{ userItem['email']||'空' }}
          </div>
          <div>
            <strong>手机：</strong>
            {{ userItem['phone']||'空' }}
          </div>
          <div>
            <strong>介绍：</strong>
            {{ userItem['introduction']||'空' }}
          </div>
        </div>

        <!-- 对此用户的操作 -->
        <el-row type="flex">
          <el-col>
            <el-button
              plain
              size="small"
              style="width: 100%"
              @click="showRelateForm(userItem)"
            >
              分配角色
            </el-button>
          </el-col>
          <el-col>
            <el-button
              size="small"
              plain
              style="width: 100%"
              @click="showInactiveForm(userItem.username)"
            >封禁用户
            </el-button>
          </el-col>
          <el-col>
            <el-button
              size="small"
              plain
              style="width: 100%"
              @click="showDeleteForm(userItem.username)"
            >删除用户
            </el-button>
          </el-col>
          <el-col>
            <el-button
              size="small"
              plain
              style="width: 100%"
              @click="showActiveForm(userItem.username)"
            >解封用户
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <!--********************************************* 增加用户 ***********************************************-->
    <el-dialog
      title="增加用户"
      :visible.sync="dialogVisible1"
      width="80%"
    >
      <el-form ref="localUser" class="add-panel" :model="localUser" :rules="rules">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="localUser.username" placeholder="请输入用户名（用于登录）" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="localUser.password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="localUser.checkPassword" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="绑定邮箱" prop="email">
          <el-input v-model="localUser.email" placeholder="用于找回密码，可先不填" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="handleAddUser('localUser')">确 定</el-button>
      </span>
    </el-dialog>
    <div style="height: 10px" />
    <!--********************************************* 封禁/解封/删除用户 ***********************************************-->
    <!-- 考虑到安全问题、这里理论上需要操作者再次输入用户名确认 -->
    <el-dialog
      :title="actionType"
      :visible.sync="dialogVisible2"
      width="80%"
    >
      <el-form>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="localUser.username" placeholder="请输入用户（登录名）" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="chooseActionType(localUser.username)">确 定</el-button>
      </span>
    </el-dialog>
    <!--********************************************* 分配用户 ***********************************************-->
    <el-dialog
      :title="actionType"
      :visible.sync="dialogVisible3"
      width="80%"
    >
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedRoleIds" @change="handleCheckedPermissionsChange">
        <el-checkbox
          v-for="(role,index) in allRoles"
          :key="index"
          :class="device==='desktop'?'desktop':'mobile'"
          :label="role.id"
        >
          <div>
            <strong>{{ role.roleName }}</strong>
            {{ role.description }}
          </div>
        </el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="handleRelate(localUser.id,checkedRoleIds)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 js
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  import {
    postUser,
    getAllUsers,
    deleteOneUser,
    inactiveOneUser,
    activeOneUser,
    getAllRoles,
    putOneUserWithRoleIds,
  } from '@/request/auth'
  import {mapGetters} from 'vuex'

  export default {
    name: 'UserEdit',
    data() {
      const validateCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.localUser.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        showApp: false,
        actionType: '',
        list: [],
        /**
         * 新增
         */
        dialogVisible1: false,
        /**
         * 封号、解封、删除
         */
        dialogVisible2: false,
        /**
         * 为用户分配角色
         */
        dialogVisible3: false,
        delUser: {
          username: '',
        },
        localUser: {
          username: '',
          password: '',
          checkPassword: '',
          email: '',
          roles: [],
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'},
          ],
          checkPassword: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
            {validator: validateCheckPassword, trigger: 'blur'},
          ],
        },
        checkAll: false,
        checkedRoleIds: [],
        isIndeterminate: true,
        allRoles: [],
      }
    },
    computed: {
      ...mapGetters(['device']),
    },
    /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                     生命周期
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
    created() {
      this.fetchData()
    },

    methods: {
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                       请求相关
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      fetchData() {
        getAllUsers().then(data => {
          this.list = data
          this.showApp = true
          getAllRoles().then(data => {
            this.allRoles = data
          })
        })
      },
      handleAddUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            delete this.localUser.checkPassword
            postUser(this.localUser).then(_ => {
              this.hideForm()
              this.$refs['localUser'].resetFields()
              this.fetchData()
            })
          } else {
            return false
          }
        })
      },
      handleDeleteUser(username) {
        deleteOneUser(username)
      },
      handleDeleteOneUser(username) {
        deleteOneUser(username)
          .then(_ => {
            this.dialogVisible2 = false
            this.fetchData()
          })
      },
      handleInactiveOneUser(username) {
        inactiveOneUser(username).then(_ => {
          this.dialogVisible2 = false
          this.fetchData()
        })
      },
      handleActiveOneUser(username) {
        activeOneUser(username).then(_ => {
          this.dialogVisible2 = false
          this.fetchData()
        })
      },
      handleRelate(id, roleIds) {
        putOneUserWithRoleIds(id, roleIds).then(_ => {
          this.dialogVisible3 = false
          this.fetchData()
        })
      },
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                       页面相关
                                                       控制相关
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      showRelateForm(user) {
        this.dialogVisible3 = true
        this.localUser = user
        this.checkedRoleIds = this.localUser.roles.map(role => role.id)
      },
      showAddForm() {
        this.dialogVisible1 = true
        this.localUser = {
          username: '',
          password: '123456',
          checkPassword: '123456',
          email: '',
        }
      },
      showDeleteForm(username) {
        this.localUser.username = username
        this.dialogVisible2 = true
        this.actionType = '删除用户'
      },
      showInactiveForm(username) {
        this.localUser.username = username
        this.dialogVisible2 = true
        this.actionType = '封禁用户'
      },
      showActiveForm(username) {
        this.localUser.username = username
        this.dialogVisible2 = true
        this.actionType = '解封用户'
      },
      hideForm() {
        this.dialogVisible1 = false
        this.dialogVisible2 = false
        this.dialogVisible3 = false
      },
      chooseActionType() {
        if (this.actionType === '删除用户') {
          this.handleDeleteOneUser(this.localUser.username)
        } else if (this.actionType === '封禁用户') {
          this.handleInactiveOneUser(this.localUser.username)
        } else if (this.actionType === '解封用户') {
          this.handleActiveOneUser(this.localUser.username)
        }
      },
      // -- 以下两个方法，保证了 全选框和 普通框实现联动
      handleCheckAllChange(val) {
        this.checkedRoleIds = val
          ? this.allRoles.map(p => p.id)
          : []
        this.isIndeterminate = false
      },
      handleCheckedPermissionsChange(value) {
        const checkedCount = value.length
        this.checkAll = checkedCount === this.allRoles.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRoles.length
      },
    },
  }
</script>

<style scoped lang="scss">
  // -- @see RoleEdit.vue
  .desktop {
    width: 30%;
  }

  .mobile {
    width: 80%;
  }

  .red-circle {
    margin-left: 5px;
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }

  .green-circle {
    margin-left: 5px;
    background-color: green;
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }

  .image {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
  }

  .tag {
    margin-right: 3px;
  }
</style>
