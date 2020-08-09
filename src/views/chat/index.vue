<template>
  <div v-if="showApp" class="app-container dashborad">
    <!--********************************************* 头部信息 ***********************************************-->
    <div class="header-info">
      <el-tooltip
        v-if="onlineInfo.usernameList"
        effect="dark"
        :content="onlineInfo.usernameList | flat"
        placement="bottom"
      >
        <div class="online">
          <svg-icon icon-class="online" />
          在线{{ onlineInfo.num }}
        </div>
      </el-tooltip>
      <div v-else class="online">
        <i class="el-icon-user-solid" />
        在线{{ onlineInfo.num }}
      </div>
      <div>
        <el-radio-group v-model="radio">
          <el-radio label="1">此时</el-radio>
          <el-radio label="0">此天</el-radio>
        </el-radio-group>
      </div>
      <div v-show="1" class="msg-count">
        <i class="el-icon-s-comment" />
        消息{{ radio==='0'? list.length: filterOneHour.length }}
      </div>
    </div>
    <!--********************************************* 聊天面板 ***********************************************-->

    <el-card ref="card" class="dark" style="height: 500px; overflow: auto">
      <div
        v-for="(item,index) in (radio==='0'? list:filterOneHour)"
        :key="index"
      >

        <div v-if="item.showTime" class="time">{{ item.datetime | getHourAndMinute }}</div>

        <div :class="[item.mine?'right':'left']">
          <el-tooltip class="item" effect="dark" :content="item['nickname']" placement="top">
            <el-image :src="item['avatar']" class="avatar" />
          </el-tooltip>
          <span class="word">{{ item.word || '' }}</span>
        </div>

      </div>
    </el-card>

    <!--********************************************* 聊天面板下部区域 ***********************************************-->
    <!--
    普通vue input @keyup.enter="onSubmit"
    element el-input @keyup.enter.native="onSubmit"
    -->
    <el-input v-model="msg" class="input" @keyup.enter.native="handlePostChat(msg)" />
    <el-button
      plain
      type="primary"
      style="width: 100%"
      size="small"
      @click="handlePostChat(msg)"
    >
      发送
    </el-button>
  </div>
</template>

<script>
  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   数据相关
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  import {mapGetters} from 'vuex'
  import {getChat, postChat} from '@/request/chat'
  import {getOnline} from '@/request/online'

  export default {
    name: 'Dashboard',
    filters: {
      getHourAndMinute: item => item.substring(10, 16),
      flat(list) {
        return list.join(', ')
      },
    },
    data() {
      return {
        showApp: false,
        lastTime: '2000-01-01 00:00:00',
        msg: '',
        // list 比 map 多了 mine属性、showTime属性
        list: [],
        onlineInfo: {num: '', usernameList: []},
        timer1: null,
        timer2: null,
        radio: '0', // 显示一小时之内的还是显示一天的
      }
    },
    computed: {
      ...mapGetters(['nickname', 'avatar', 'username']),
      filterOneHour() {
        return this.list.filter(item => {
          const now = new Date().getTime()
          const itemDatetime = new Date(item.datetime).getTime()
          const diff = (now - itemDatetime) / (1000 * 60)
          return diff < 60 /* 单位分钟 */
        })
      },
    },
    /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                     生命周期函数
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
    created() {
      this.fetchChatDataFirst()
      this.fetchOnlineData()
      // -- 实时更新
      // 如果时间间隔过小、前面一个请求还没回来，后面一个请求就发出去了，那么会存在重复获取数据的问题
      // 如果时间间隔多大、则用户体验不好
      // 特别是发送消息时，很容易就和这种轮询的时间片重合，必然会拿到相同的数据、造成数据重复，因此要加入去重逻辑
      this.timer1 = setInterval(_ => {
        this.fetchChatData()
      }, 3000)
      this.timer2 = setInterval(_ => {
        this.fetchOnlineData()
      }, 3000)
    },
    destroyed() {
      clearInterval(this.timer1)
      clearInterval(this.timer2)
    },
    methods: {
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   请求相关的方法
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      /**
       * 获取在线人数
       */
      fetchOnlineData() {
        getOnline().then(data => {
          this.onlineInfo = data
        })
      },
      /**
       * 首次获取之前的聊天消息
       */
      fetchChatDataFirst() {
        getChat('2000-01-01 00:00:00')
          .then(data => {
            this.showApp = true
            if (data === null || data.length === 0) return
            let firstList = this.addMineProperty(data)
            firstList = this.addShowTimeProperty(firstList)
            this.list.push(...firstList)
            if (firstList.length !== 0) {
              this.lastTime = this.list[this.list.length - 1].datetime
            }
            this.$nextTick(_ => {
              this.$refs.card.$el.scrollTop = this.$refs.card.$el.scrollHeight
            })
          })
          .catch(e => {
            if (e.toString() === 'Error: Request failed with status code 403') {
              clearInterval(this.timer1)
              clearInterval(this.timer2)
            }
          })
      },
      /**
       * 获取未读的聊天消息
       */
      fetchChatData() {
        return new Promise((resolve, reject) => {
          getChat(this.lastTime)
            .then(data => {
              if (data === null || data.length === 0) return
              const newList = this.addMineProperty(data)
              this.safePush(newList) // 去重，防止消息重复
              this.lastTime = this.list[this.list.length - 1].datetime
              this.list = this.addShowTimeProperty(this.list)
              resolve()
            })
            .catch(err => reject(err))
        })
      },
      /**
       * 发送消息
       * @param {String} msg
       */
      handlePostChat(msg) {
        if (msg === undefined || msg.trim() === '') {
          return this.$message({
            message: '消息内容不能为空',
            type: 'warning',
          })
        }
        postChat(msg).then(_ => {
          this.msg = ''
          this.fetchChatData()
            .then(_ => {
              // 获取数据后，需要对新视图进行下一步操作或者其他操作时，发现获取不到dom。
              this.$nextTick(_ => {
                // 为了兼容IE浏览器，不要用下面这种 this.$refs.card.$el.scrollTo(0, this.$refs.card.$el.scrollHeight)
                this.$refs.card.$el.scrollTop = this.$refs.card.$el.scrollHeight
              })
            })
        })
      },
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   业务相关的工具方法
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      /**
       * 在list中加入Mine属性，用于动态属性（靠左还是靠右）
       * @param {Array}list
       */
      addMineProperty(list) {
        for (const item of list) {
          item.mine = item.username === this.username
        }
        return list
      },
      /**
       * 在list中加入showTime属性，用于决定是否显示时间
       * @param {Array} list
       */
      addShowTimeProperty(list) {
        for (let i = 1; i <= list.length - 2; i++) {
          let diff = new Date(list[i + 1].datetime) - new Date(list[i].datetime)
          diff = diff / (1000 * 60)
          if (diff >= 5) {
            list[i + 1].showTime = true
          }
        }
        return list
      },
      /**
       * 将newList插入到this.list中，并且考虑到重复的情况
       * @param {Array} newList
       */
      safePush(newList) {
        newList.forEach(item => {
          const datetime = item.datetime
          let hasExists = false
          this.list.forEach(i => {
            if (datetime === i.datetime) {
              hasExists = true
              console.log('debug: 聊天内容出现了重复，但是已经去重了')
            }
          })
          if (!hasExists) {
            this.list.push(item)
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   按照结构
                                                   从上到下
                                                   从左到右
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  .header-info {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .msg-count {
      width: 6em;
      color: #F56C6C;
    }
  }

  .time {
    width: 3.5em;
    padding-top: 3px;
    padding-bottom: 3px;
    margin: 0 auto 5px;
    background-color: #dadada;
    color: white;
    font-size: small;
    text-align: center;
  }

  .right, .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;

    &.left {
      flex-direction: row-reverse;
    }

    .avatar {
      flex-grow: 0;
      flex-shrink: 0;
      width: 45px;
      height: 45px;
      margin-bottom: 5px;
      border-radius: 10px;
      margin-right: 5px;
      margin-left: 5px;
    }

    .word {
      background-color: #9eea6a;
      font-size: medium;
      padding: 15px;
      border-radius: 5px;
    }
  }

  .input {
    margin: 10px 0;
  }


  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   按照类型
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  .dark {
    background-color: #f5f5f5;
  }
</style>
