<template>
  <div v-if="showApp" class="app-container">
    <section v-for="item in list" :key="item.id">
      <el-card class="box-card">
        <div slot="header">
          <h3 style="margin: 0;display: inline-block;">{{ item.title }}</h3>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleSubmitOne(item.id,item)">提交本条
          </el-button>
        </div>
        <el-input v-model="item.content" type="textarea" autosize />
      </el-card>
      <div style="height: 20px" />
    </section>
    <el-button type="primary" style="width: 100%" @click="handleSubmitAll(list)">全部提交</el-button>
  </div>
</template>

<script>
  import {getAllAdvantages, putAllAdvantages, putOneAdvantages} from '@/request/company-info'

  export default {
    name: 'Contact',
    data() {
      return {
        showApp:false,
        list: [],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllAdvantages()
          .then(data => {
            this.showApp = true
            this.list = data
          })
      },
      handleSubmitAll(list) {
        putAllAdvantages(list)
      },
      handleSubmitOne(id, data) {
        putOneAdvantages(id, data)
      },
    },
  }
</script>

