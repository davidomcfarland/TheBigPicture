import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewTopic from "../views/NewTopic.vue"
import Topic from "../views/Topic.vue"
import EditTopic from "../views/EditTopic.vue"
import BrowseTopics from "../views/BrowseTopics.vue"
import NewList from "../views/NewList.vue"
import List from "../views/List.vue"
import BrowseLists from '../views/BrowseLists.vue'
import Welcome from "../views/Welcome.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/topics/new',
    name: 'New Topic',
    component: NewTopic
  },
  {
    path: "/topics/:name",
    name: "Topic",
    component: Topic,
    props: true,
  },
  {
    path: "/topics/:name/edit",
    name: "Edit Topic",
    component: EditTopic,
    props: true,
  },
  {
    path: "/topics",
    name: "BrowseTopics",
    component: BrowseTopics
  },
  {
    path: "/lists/new",
    name: "NewList",
    component: NewList,
  },
  {
    path: "/lists/:name",
    name: "List",
    component: List,
    props: true,
  },
  {
    path: "/lists",
    name: "BrowseLists",
    component: BrowseLists
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
