import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/Components.vue'),
      children: [
        {
          path: 'button',
          name: 'button',
          component: () => import('../views/components/Button.vue')
        },
        {
          path: 'input',
          name: 'input',
          component: () => import('../views/components/Input.vue')
        },
        {
          path: 'checkbox',
          name: 'checkbox',
          component: () => import('../views/components/Checkbox.vue')
        },
        {
          path: 'radio',
          name: 'radio',
          component: () => import('../views/components/Radio.vue')
        },
        {
          path: 'select',
          name: 'select',
          component: () => import('../views/components/Select.vue')
        },
        {
          path: 'dialog',
          name: 'dialog',
          component: () => import('../views/components/Dialog.vue')
        },
        {
          path: 'tabs',
          name: 'tabs',
          component: () => import('../views/components/Tabs.vue')
        }
      ]
    }
  ]
})

export default router 