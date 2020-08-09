<template>
  <div v-if="showApp" class="app-container">
    <el-alert
      title="点击左方三角可展开"
      type="success"
    />
    <div style="height: 20px" />
    <el-tree
      class="tree"
      :data="list"
      node-key="id"
      :expand-on-click-node="false"
      highlight-current
      @node-click="handleNodeClick"
    >
      <div slot-scope="{ node,data }" class="node">
        <div v-if="data.level===1" class="div1">
          <img :src="data.avatar" class="image">
          <span class="span1">用户：{{ data.label }}</span>
        </div>
        <div v-if="data.level===2" class="div2">
          <i class="el-icon-user" style="font-size: 26px" />
          <span class="span1">{{ data.label }}</span>
        </div>
        <div v-if="data.level===3" class="div3">
          <i class="el-icon-unlock" style="font-size: 26px" />
          <span>{{ data.label }}</span>
        </div>
      </div>
    </el-tree>

  </div>
</template>

<script>
  import {getAllUsers} from '@/request/auth'

  export default {
    name: 'Tree',
    data() {
      return {
        showApp :false,
        expandFlag: false,
        list: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllUsers().then(data => {
          this.showApp = true
          data.forEach(user => {
            user.label = user['username']
            user.level = 1
            const levelOneChildren = user['roles']
            if (levelOneChildren) {
              user.children = levelOneChildren
              levelOneChildren.forEach(role => {
                role.label = role['roleName']
                role.level = 2
                const levelTwoChidren = role['permissions']
                if (levelTwoChidren) {
                  role.children = levelTwoChidren
                  levelTwoChidren.forEach(permission => {
                    permission.level = 3
                    permission.label = permission['permission'] + ' → ' + permission['description']
                  })
                }
              })
            }
          })
          this.list = data
        })
      },
      handleNodeClick(data) {
        console.log(data)
      },
    },
  }
</script>

<style scoped lang="scss">
  .div1 {
    display: flex;
    align-items: center;

    .image {
      width: 26px;
      height: 26px;
      border-radius: 5px;
      margin-right: 10px;
    }

    .span1 {
      width: 150px;
    }

  }

  .div2 {
    display: flex;
    align-items: center;

    i {
      margin-right: 8px;
    }
  }

  .div3 {
    display: flex;
    align-items: center;

    i {
      margin-right: 8px;
    }
  }
</style>
