import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/500',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '总控制台', icon: 'dashboard', affix: true},
    }],
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat',
    children: [{
      path: '',
      name: 'chat',
      component: () => import('@/views/chat/index'),
      meta: {title: '在线聊天', icon: 'chat'},
    }],
  },
  {
    path: '/basic_info',
    redirect: '#', // '#'~current href ; 'noRidirect'~不可点击
    alwaysShow: true,
    component: Layout,
    name: 'basicInfo', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {title: '基本信息', icon: 'example'},
    children: [
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/basic-info/Carousel'),
        meta: {title: '轮播设置', icon: 'carousel'},
      },
      {
        path: 'introduction',
        name: 'Introduction',
        component: () => import('@/views/basic-info/Introduction'),
        meta: {title: '公司简介', icon: 'introduction'},
      },
      {
        path: 'advantage',
        name: 'Advantage',
        component: () => import('@/views/basic-info/Advantage'),
        meta: {title: '企业优势', icon: 'advantage'},
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/basic-info/CompanyHistory'),
        meta: {title: '发展历程', icon: 'history'},
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/basic-info/Contact'),
        meta: {title: '联系方式', icon: 'contact'},
      },
    ],
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Product',
        component: () => import('@/views/product/index'),
        meta: {title: '产品展示', icon: 'product', noCache: true},
      },
    ],
  },
  {
    path: '/hire',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Form',
        component: () => import('@/views/hire/Hire'),
        meta: {title: '招聘管理', icon: 'hire'},
      },
    ],
  },
  {
    path: '/news',
    component: Layout,
    redirect: '#',
    meta: {title: '企业新闻', icon: 'news'},
    children: [
      {
        path: 'edit', // do not use /edit
        name: 'EditNews',
        component: () => import('@/views/news/NewsList'),
        meta: {title: '新闻编辑', icon: 'form', noCache: true},
      },
      {
        path: 'push',
        name: 'PushNews',
        component: () => import('@/views/news/PushOrEditNews'),
        meta: {title: '发布新闻', icon: 'push', noCache: true},
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/news/Tags'),
        meta: {title: '标签管理', icon: 'tag'},
      },
    ],
  },
  {
    path: '/message',
    component: Layout,
    meta: {title: '留言管理', icon: 'message'},
    children: [
      {
        path: '/look',
        name: 'Message',
        component: () => import('@/views/message/Message'),
        meta: {title: '查看留言', icon: 'eye'},
      },
      {
        path: '/config',
        name: 'Config',
        component: () => import('@/views/message/Config'),
        meta: {title: '通知策略', icon: 'mail'},
      },
    ],
  },
  {
    path: '/auth_center',
    component: Layout,
    alwaysShow: true,
    redirect: '/auth/mine',
    name: 'center',
    meta: {
      title: '用户中心',
      icon: 'center',
    },
    children: [
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/profile-settings/Mine'),
        meta: {title: '个人信息', icon: 'user-info'},
      },
      {
        path: 'user',
        name: 'userEdit',
        component: () => import('@/views/profile-settings/UserEdit'),
        meta: {title: '用户管理', icon: 'user'},
      },
      {
        path: 'role',
        name: 'roleEdit',
        component: () => import('@/views/profile-settings/RoleEdit'),
        meta: {title: '角色管理', icon: 'role'},
      },
      {
        path: 'permission',
        name: 'permissionEdit',
        component: () => import('@/views/profile-settings/PermissionEdit'),
        meta: {title: '权限管理', icon: 'auth'},
      },
      {
        path: 'tree',
        name: 'userTree',
        component: () => import('@/views/profile-settings/Tree'),
        meta: {title: '授权总览', icon: 'tree'},
      },
    ],
  },
  {
    path: '/log',
    component: Layout,
    redirect: '#',
    name: 'Nested',
    meta: {
      title: '日志管理',
      icon: 'log',
    },
    children: [
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/app-log/OperationLog'),
        meta: {title: '操作日志', icon: 'operation-log'},
      },
      {
        path: 'chat',
        name: 'chatLog',
        component: () => import('@/views/app-log/ChatLog'),
        meta: {title: '聊天记录', icon: 'chat-log'},
      },
      {
        path: 'today',
        name: 'todayVisitor',
        component: () => import('@/views/app-log/VisitorToday'),
        meta: {title: '今日访客', icon: 'today'},
      },
      {
        path: 'ip',
        name: 'historyVisitor',
        component: () => import('@/views/app-log/VisitorHistoryIP'),
        meta: {title: '历史访客', icon: 'ip'},
      },
      {
        path: 'delete',
        name: 'logDelete',
        component: () => import('@/views/app-log/Delete'),
        meta: {title: '清空记录', icon: 'delete'},
      },
    ],
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://100jiancai.cn',
        meta: {title: '前往官网', icon: 'link'},
      },
    ],
  },

  // 404 page must be placed at the end !!!
  // annotation this to debug!!!
  {path: '*', redirect: '/404', hidden: true},
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
