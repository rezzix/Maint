import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/app',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/app/dashboard' },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/auth/pages/DashboardPage.vue')
      },
      {
        path: 'work-orders',
        name: 'WorkOrders',
        component: () => import('@/modules/workorder/pages/WorkOrderListPage.vue')
      },
      {
        path: 'work-orders/new',
        name: 'WorkOrderNew',
        component: () => import('@/modules/workorder/pages/WorkOrderFormPage.vue')
      },
      {
        path: 'work-orders/:id',
        name: 'WorkOrderDetail',
        component: () => import('@/modules/workorder/pages/WorkOrderDetailPage.vue')
      },
      {
        path: 'assets',
        name: 'Assets',
        component: () => import('@/modules/asset/pages/AssetListPage.vue')
      },
      {
        path: 'pm-plans',
        name: 'PMPlans',
        component: () => import('@/modules/pm/pages/PMPlanListPage.vue')
      },
      {
        path: 'inventory/parts',
        name: 'Parts',
        component: () => import('@/modules/inventory/pages/PartListPage.vue')
      },
      {
        path: 'inventory/low-stock',
        name: 'LowStock',
        component: () => import('@/modules/inventory/pages/LowStockPage.vue')
      },
      {
        path: 'purchasing/orders',
        name: 'PurchaseOrders',
        component: () => import('@/modules/purchasing/pages/POListPage.vue')
      },
      {
        path: 'vendors',
        name: 'Vendors',
        component: () => import('@/modules/vendor/pages/VendorListPage.vue')
      },
      {
        path: 'facilities/sites',
        name: 'Sites',
        component: () => import('@/modules/facility/pages/SiteListPage.vue')
      },
      {
        path: 'technicians',
        name: 'Technicians',
        component: () => import('@/modules/labor/pages/TechnicianListPage.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/modules/user/pages/UserListPage.vue')
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/modules/user/pages/RoleEditorPage.vue')
      },
      {
        path: 'tenants',
        name: 'Tenants',
        component: () => import('@/modules/tenant/pages/TenantListPage.vue')
      },
      {
        path: 'audit/logs',
        name: 'AuditLogs',
        component: () => import('@/modules/compliance/pages/AuditLogPage.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.meta.guest && auth.isAuthenticated && to.name === 'Login') {
    next('/app/dashboard')
  } else {
    next()
  }
})

export default router
