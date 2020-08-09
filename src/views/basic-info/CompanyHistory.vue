<template>
  <div v-if="showApp" class="app-container">
    <el-alert v-if="$store.getters.device==='mobile'" title="建议使用电脑端进行查看或编辑" type="warning" />
    <!--********************************************* table start ***********************************************-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>

      <el-table-column label="内容" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="颜色" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.color | translate }}
        </template>
      </el-table-column>

      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.type | translate }}
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button type="primary" plain @click="showEditForm(scope.$index)"><i class="el-icon-edit">改</i>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" plain @click="handleDelete(scope.row.id)"><i class="el-icon-delete">删</i>
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
    <div style="height: 10px" />
    <el-button type="primary" @click="showAddForm()">新增历史项</el-button>
    <el-button type="primary" onclick="window.open('http://100jiancai.cn','_blank')">预览效果</el-button>

    <!--********************************************* 表单 ***********************************************-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="85%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="日期" prop="date" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="date"
              style="width: 100%;"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </div>
        </el-form-item>
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" type="textarea" placeholder="请输入公司某重要历史节点的简要的描述" />
        </el-form-item>
        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="form.type" style="width: 100%;" placeholder="请选择类型（用于标记重要程度）">
            <el-option label="圆形（⚪）" value="circle" />
            <el-option label="星星（⭐）" value="star" />
          </el-select>
        </el-form-item>
        <el-form-item label="颜色" prop="color" :label-width="formLabelWidth">
          <el-select v-model="form.color" style="width: 100%;" placeholder="请选择颜色（用于标记重要程度）">
            <el-option label="黄色" value="yellow" />
            <el-option label="橙色" value="orange" />
            <el-option label="紫色" value="purple" />
            <el-option label="绿色" value="green" />
            <el-option label="黑色" value="black" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle('form',)">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    postOneCompanyHistory,
    deleteOneCompanyHistory,
    getAllCompanyHistory,
    putOneCompanyHistory,
  } from '@/request/company-info'

  export default {
    filters: {
      translate(value) {
        const diction = {
          'yellow': '黄色',
          'orange': '橙色',
          'purple': '紫色',
          'green': '绿色',
          'black': '黑色',
          'star': '星星',
          'circle': '圆形',
          'red': '红色',
        }
        const chinese = diction[value]
        return (!chinese ? 'error translate ' + value : chinese)
      },
    },
    data() {
      return {
        showApp: false,
        list: [],
        listLoading: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTitle: null,
        form: {
          'id': null, // no display, for submit use
          'date': null,
          'description': null,
          'color': null,
          'type': null,
        },
        formLabelWidth: '50px',
        editFlag: null, // 'add' or 'update',
        rules: {
          date: [
            {required: true, message: '必须输入日期', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '必须输入历史节点的描述性文字', trigger: 'blur'},
            {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'change'},
          ],
          color: [
            {required: true, message: '请选择颜色', trigger: 'change'},
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAllCompanyHistory().then(response => {
          this.showApp = true
          this.list = response
          this.listLoading = false
        })
      },
      handleDelete(id) {
        deleteOneCompanyHistory(id)
          .then(() => {
            this.fetchData()
          })
      },
      showAddForm() {
        this.dialogTitle = '增加一条历史节点'
        this.editFlag = 'add'
        this.dialogTitle = '新增一条历史节点'
        this.dialogFormVisible = true
      },
      showEditForm(index) {
        this.dialogTitle = '修改本条历史节点'
        this.editFlag = 'update'
        // this.form = this.list[index]
        // 这样操作十分危险、建立了 form和list 之间的引用关系，当更改数据后点击取消。form发生改变，list随之也发生改变
        Object.assign(this.form, this.list[index])
        this.dialogFormVisible = true
      },
      handleSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.editFlag === 'add') {
              postOneCompanyHistory(this.form)
                .then(() => {
                  this.fetchData()
                  this.dialogFormVisible = false
                  this.$refs['form'].resetFields()
                })
            }
            if (this.editFlag === 'update') {
              putOneCompanyHistory(this.form.id, this.form)
                .then(() => {
                  this.fetchData()
                  this.dialogFormVisible = false
                  this.$refs['form'].resetFields()
                })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancle(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      }
      ,
    }
    ,
  }
</script>
