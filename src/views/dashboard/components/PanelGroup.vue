<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('list1')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="public" class-name="card-panel-icon" />
        </div>
        <div />
        <!-- 1 -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            总点击量
          </div>
          <count-to
            :start-val="lastTotal.publicClickTotal"
            :end-val="total.publicClickTotal"
            :duration="duration"
            class="card-panel-num"
          />
        </div>
        <!-- 2 -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            总访客数
          </div>
          <count-to
            :start-val="lastTotal.publicHeadTotal"
            :end-val="total.publicHeadTotal"
            :duration="duration"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('list2')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="system" class-name="card-panel-icon" />
        </div>
        <!-- 3 -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            总点击量
          </div>
          <count-to
            :start-val="lastTotal.adminClickTotal"
            :end-val="total.adminClickTotal"
            :duration="duration"
            class="card-panel-num"
          />
        </div>
        <!-- 4 -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            总访客数
          </div>
          <count-to
            :start-val="lastTotal.adminHeadTotal"
            :end-val="total.adminHeadTotal"
            :duration="duration"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  import {getVisitorHistory} from '@/request/visitor'

  export default {
    components: {
      CountTo,
    },
    data() {
      return {
        lastTotal: {publicClickTotal: 0, publicHeadTotal: 0, adminClickTotal: 0, adminHeadTotal: 0},
        total: {publicClickTotal: 0, publicHeadTotal: 0, adminClickTotal: 0, adminHeadTotal: 0},
        timer: {},
        duration: 1500,
      }
    },
    created() {
      this.fetchData().then(_ => {
        this.duration = 100
      })
      this.timer = setInterval(_ => {
        this.fetchData()
      }, 3000)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      fetchData() {
        return new Promise((resolve, reject) => {
          getVisitorHistory().then(data => {
            this.total = data
            setTimeout(_ => {
              this.lastTotal = data
              resolve()
            }, 500)
          })
        })
      },
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
