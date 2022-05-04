const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/clientes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Costumers.vue') },
      { path: 'novo', component: () => import('src/components/costumers/AddUser.vue') },
    ]
  },

  {
    path: '/produtos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Products.vue') },
      { path: 'novo', component: () => import('src/components/products/AddProduct.vue') }
    ]
  },

  {
    path: '/vendas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Sales.vue') }
    ]
  },

  {
    path: '/estoque',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Inventory.vue') }
    ]
  },

  {
    path: '/relatorios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Reports.vue') }
    ]
  },
  
  {
     path: '/caixa',
     component: () => import ('layouts/CheckoutLayout.vue'),
     children: [
	     { path: '', component: () => import ('pages/Checkout.vue') }
     ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
