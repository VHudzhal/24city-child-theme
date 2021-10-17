import VueRouter from 'vue-router'
import Home from "../pages/Home";
import News from "../pages/News";
import NewsPost from "../pages/NewsPost";
import PostsList from "../pages/PostsList"
import ErrorCmp from "../pages/Error"
export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/news',
      component: News
    },    {
      path: '/posts',
      component: PostsList
    },
    {
      path: 'news/:id',
      component: NewsPost
    },
    // {
    //   path: '*',
    //   component: ErrorCmp
    // }
  ],
  mode: 'history'
})
