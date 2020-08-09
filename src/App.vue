<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
  import {logVisitor} from '@/request/visitor'

  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true,
      }
    },
    created() {
      setTimeout(_ => {
        let device
        if (this.$store.getters.device === 'desktop') {
          device = 0
        } else {
          device = 1
        }
        logVisitor(0, device, document.referrer)
      }, 1500)
    },
    provide() {
      return {
        reload: this.reload, // 刷新
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
    },
  }
</script>
