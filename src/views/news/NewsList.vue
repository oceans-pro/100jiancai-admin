<template>
  <div v-if="showApp" class="app-container">
    <el-alert v-if="$store.getters.device==='mobile'" title="建议使用电脑端进行查看或编辑" type="warning" />
    <!--********************************************* table-begin ***********************************************-->
    <el-table
      :data="currentPageDataList"
      style="width: 100%"
    >

      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.date }}
        </template>
      </el-table-column>


      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.img" @error="handleImgLoadError" />
        </template>
      </el-table-column>

      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="摘要" width="260">
        <template slot-scope="scope">
          {{ scope.row.summary }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-button
                type="info"
                plain
                size="mini"
                @click="handleGo(scope.row.link)"
              >
                <i class="el-icon-position">去</i>
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="handleEdit(scope.row.id)"
              >
                <i class="el-icon-edit">改</i>
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="danger"
                plain
                size="mini"
                @click="handleDelete(scope.row.id)"
              >
                <i class="el-icon-delete">删</i>
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!--********************************************* table end ***********************************************-->
    <!-- https://element.eleme.cn/#/zh-CN/component/pagination -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :page-count="3"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>

  import {getSomeNews, deleteOneNews} from '@/request/news'

  export default {
    name: 'EditNews',
    data() {
      return {
        showApp:false,
        currentPage: 1,
        pageSize: 5,
        currentPageDataList: [{
          id: '',
          title: '',
          flagExternal: '',
          img: '', // 不可置为null 否则第一个图片会不刷新
          tags: '',
          date: '',
          summary: '',
        }],
        total: 50, // todo
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() { // init
        getSomeNews(this.currentPage, this.pageSize)
          .then(data => {
            this.showApp = true
            this.currentPageDataList = data['content']
            this.total = data['totalElements']
          })
      },
      handleEdit(id) {
        this.$router.push('/news/push?id=' + id)
      },
      handleDelete(id) {
        deleteOneNews(id).then(() => this.fetchData()) // 注意 delete是异步的，如果不用then，会不更新视图
      },
      handleCurrentChange(e) {
        this.currentPage = e
        this.fetchData()
      },
      handleImgLoadError(e) {
        console.log(e) // for debug
      },
      handleGo(link) {
        window.open(link)
      },
    },
  }
</script>
<style>

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

