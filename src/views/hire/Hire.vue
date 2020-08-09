<template>
  <div v-permission="['hire:get']" class="app-container">
    <!--********************************************* 头部 ***********************************************-->
    <el-switch
      v-model="enableHire"
      :width="150"
      active-text="开启招聘功能"
      inactive-text="关闭招聘功能"
      @change="handleSwitchConfig"
    />
    <div>
      <!--********************************************* 主体区域 ***********************************************-->
      <div style="height: 30px" />

      <div v-for="(item,index) in list" :key="index">
        <el-card style="background-color: #f0f0f0" shadow="always">
          <!-- 基本信息 -->
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form label-width="40px">

                <el-form-item label="职位" class="el-form-item">
                  <el-input v-model="item.jobName" placeholder="请输入职位名称" />
                </el-form-item>

                <el-form-item label="数目" class="el-form-item">
                  <el-input v-model="item.count" placeholder="请输入招聘数目" />
                </el-form-item>

                <el-form-item label="时间" class="el-form-item">
                  <el-date-picker
                    v-model="item.date"
                    value-format="yyyy-MM-dd"
                    align="right"
                    type="date"
                    style="width: 100%"
                    placeholder="选择发布日期"
                  />
                </el-form-item>
              </el-form>
            </el-col>
            <!-- 滑块 -->
            <el-col :span="4" style="display: flex;flex-direction: column;justify-content: center;height: 120px">
              <div style="text-align: center;font-size: large;">启</div>
              <div style="text-align: center;font-size: large;">用</div>
              <div style="height: 5px;" />
              <el-switch
                v-model="item.active"
                class="switch"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                @change="handleUpdateOne(index)"
              />
            </el-col>
          </el-row>

          <div style="height: 2px" />
          <el-form label-width="40px">
            <el-form-item label="要求">
              <el-input
                v-model="item.content"
                type="textarea"
                :rows="5"
                placeholder="请输入职位需求"
              />

            </el-form-item>
          </el-form>

          <el-form label-width="40px">
            <el-form-item label="操作">
              <el-row>
                <el-col :span="12">
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    style="width: 100%"
                    @click="handleUpdateOne(index)"
                  >
                    更新<i class="el-icon-position" />
                  </el-button>
                </el-col>

                <el-col :span="12">
                  <el-button
                    type="danger"
                    plain
                    style="width: 100%"
                    size="small"
                    @click="handleDelete(item.id)"
                  >
                    删除<i class="el-icon-delete" />
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

        </el-card>
        <div style="height: 20px" />
      </div>

      <!--********************************************* 增加 ***********************************************-->
      <el-button type="primary" style="width: 100%" @click="dialogVisible = true">增加一条招聘信息</el-button>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <el-form class="add-panel">
          <el-form-item label="职位">
            <el-input v-model="form.jobName" placeholder="请输入职位名称" />
          </el-form-item>
          <el-form-item label="数目">
            <el-input v-model="form.count" placeholder="请输入招聘数目" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd"
              align="right"
              type="date"
              style="width: 100%"
              placeholder="选择发布日期"
            />
          </el-form-item>
          <el-form-item label="要求">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="6"
              placeholder="请输入职位需求"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getAllHireCondition,
    postOneHireCondition,
    deleteOneHireCondition,
    putOneHireCondition,
    switchHire, getConfig,
  } from '@/request/hire'

  export default {
    name: 'Hire',
    data() {
      return {
        dialogVisible: false,
        enableHire: false,
        enableHireSwitchWidth: 40,
        list: [
          {
            jobName: '',
            content: '',
            active: false,
            date: '',
            id: '',
          },
        ],
        form: {},
      }
    },
    created() {
      this.enableHireSwitchWidth = window.document.body.clientWidth - 300
      this.fetchData()
    },
    methods: {
      fetchData() { // 和官网不同，这里两个信息都能看到
        getConfig().then(data => {
          this.enableHire = Boolean(data)
          getAllHireCondition().then(data => {
            this.list = data
          })
        })
      },
      handleSwitchConfig() {
        switchHire().then(_ => {
          this.fetchData()
        })
      },
      handleUpdateOne(index) {
        putOneHireCondition(this.list[index]).then(_ => {
          this.fetchData()
        })
      },
      handleDelete(id) {
        deleteOneHireCondition(id).then(_ => {
          this.fetchData()
        })
      },
      handleConfirm() {
        this.dialogVisible = false
        this.form['active'] = true
        postOneHireCondition(this.form).then(_ => {
          this.fetchData()
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  /* 覆盖默认配置 */
  .el-form-item {
    margin-bottom: 0;
  }

  /* 启用和滑块居中 */
  .switch {
    display: flex;
    justify-content: center;
    text-align: center;
  }
</style>
