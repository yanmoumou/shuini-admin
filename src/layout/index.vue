<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo">
        <el-icon :size="28"><Van /></el-icon>
        <span v-show="!isCollapse">水泥运输管理</span>
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="route.path"
          :collapse="isCollapse"
          :router="true"
          background-color="#1d2935"
          text-color="#a3b0c2"
          active-text-color="#409eff"
        >
          <el-menu-item index="/dashboard">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/order">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order/list">订单列表</el-menu-item>
            <el-menu-item index="/order/create">创建订单</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/dispatch">
            <template #title>
              <el-icon><SetUp /></el-icon>
              <span>调度管理</span>
            </template>
            <el-menu-item index="/dispatch/schedule">调度排班</el-menu-item>
            <el-menu-item index="/dispatch/queue">排队叫号</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/customer/list">
            <el-icon><OfficeBuilding /></el-icon>
            <span>客户管理</span>
          </el-menu-item>
          <el-sub-menu index="/driver">
            <template #title>
              <el-icon><User /></el-icon>
              <span>司机管理</span>
            </template>
            <el-menu-item index="/driver/list">司机列表</el-menu-item>
            <el-menu-item index="/driver/vehicle">车辆管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/weighbridge/index">
            <el-icon><ScaleToOriginal /></el-icon>
            <span>过磅管理</span>
          </el-menu-item>
          <el-sub-menu index="/finance">
            <template #title>
              <el-icon><Money /></el-icon>
              <span>财务管理</span>
            </template>
            <el-menu-item index="/finance/settlement">运费结算</el-menu-item>
            <el-menu-item index="/finance/bill">账单管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/monitor">
            <template #title>
              <el-icon><Location /></el-icon>
              <span>监控中心</span>
            </template>
            <el-menu-item index="/monitor/map">车辆定位</el-menu-item>
            <el-menu-item index="/monitor/track">轨迹回放</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/report/statistics">
            <el-icon><DataAnalysis /></el-icon>
            <span>报表统计</span>
          </el-menu-item>
          <el-sub-menu index="/system">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/system/user">用户管理</el-menu-item>
            <el-menu-item index="/system/role">角色管理</el-menu-item>
            <el-menu-item index="/system/product">品种管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.meta?.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-badge :value="3" :max="99" class="msg-badge">
            <el-icon :size="20" style="cursor: pointer"><Bell /></el-icon>
          </el-badge>
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" :icon="UserFilled" />
              <span>管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserFilled, Bell } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)
const cachedViews = ref(['OrderList', 'DriverList', 'CustomerList'])

const breadcrumbs = computed(() => route.matched.filter(item => item.meta?.title))

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.aside {
  background: #1d2935;
  transition: width 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #2d3a47;
  flex-shrink: 0;
}
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,.08);
  padding: 0 20px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.msg-badge {
  margin-top: 4px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.main {
  background: #f5f7fa;
  padding: 20px;
  overflow-y: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
