import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main'
import AddNote from '../views/add.note'
import LoginForm from '../views/login.form'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/add_note',
    name: 'AddNote',
    component: AddNote,
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
