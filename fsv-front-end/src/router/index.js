import Vue from 'vue'
import VueRouter from 'vue-router'
import CartPage from '../views/CartPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductsDetailsPage from '../views/ProductsDetails.vue'
import NotFoundPage from '../views/NotFoundPage.vue'



Vue.use(VueRouter)


const routes = [
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage

  },

  {
    path: '/products/:id',
    name: 'ProductDetailsPage',
    component: ProductsDetailsPage
  },

  {
    path: '/Cart',
    name: 'CartPage',
    component: CartPage
  },

  {
    path: '/',
    redirect: '/products'
  },

  {
    path:'*',
    name: 'PageIntrouvable',
    component: NotFoundPage
  },

  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
