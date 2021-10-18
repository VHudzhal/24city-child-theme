import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    edited: false,
    freshPostId: [],
    media: [],
    mainnews: [],
    show: false,
    postsIdCat:  [],
    arr: [],
    p: []
  },
  mutations: {
    setMap(state, payload) {
      state.map.set(payload.id, payload.name)
    },
    setPostsIdCat(state, payload) {
      state.postsIdCat.push(payload)
    },
    postsCat(state, postsIdCat) {
      for (let post of state.posts) {
        state.postsIdCat.push(post.categories[0])
      }
      console.log(state.postsIdCat)
    },
    mapPosts(state) {
      for (let cat of state.postsIdCat) {
        state.arr.push(state.map.get(cat))
      }
      console.log(state.arr)
    },
    changeCat (state, payload) {
      state.currentCat = payload
    },
    changePosts (state, payload) {
      state.posts = payload
    },
    editChange (state) {
      state.edited = !state.edited
    },
    pushCategory (state, cat) {
      state.categories.push(cat)
    },
    pushPost (state, post) {
      state.posts.push(post)
    },
    resetPosts(state) {
      state.posts = []
    },
    postRemove (state, index) {
      state.posts.splice(index, 1)
    },
    catRemove (state, index) {
      state.categories.splice(index, 1)
    },
    CatIdConv(state, payload) {
      state.idName = state.map.get(payload)
    },
    catsConv (state, arr) {
      for (let i = 0; i < state.posts.length; i++) {
        state.posts[i].name = state.arr[i]
      }
    },
    setPostId (state, id) {
      console.log(id)
      state.freshPostId.push(id)
    }
  },
  actions: {
    // init function
    loadNews({commit, getters}, taxonomy) {


      axios.get('wp/v2/mainnews?per_page=10')
        .then(res => {
          // pushing posts into state and creating post category name
          for (let post in res.data) {
            res.data[post].name = this.state.map.get(res.data[post].categories[0])
            this.state.mainnews.push(res.data[post])
          }
          console.log(this.getters.loadedNews)
        })
        .catch(error => console.log(error))
    },
    setCategoriesName({commit}){
      commit('catsConv')
    },
    curCat({commit}, payload) {
      commit('changeCat', payload)
    },
    refreshCats({commit}) {
      for (let category of this.state.categories) {
        commit('setMap', { id: category.id, name: category.name })
      }
      console.log(this.state.map)

      this.state.postsIdCat = []
      for (let post of this.state.posts) {
        commit('setPostsIdCat', post.categories[0])
      }

      this.state.arr = []
      for (let cat of this.state.postsIdCat) {
        this.state.arr.push(this.state.map.get(cat))
      }
      console.log(this.state.arr)

      for (let i = 0; i < this.state.posts.length; i++) {
        this.state.posts[i].name = this.state.arr[i]
      }
    },
    catFilter ({commit}, id) {
      axios.get(`wp/v2/posts?categories=${id}`)
        .then(res => {
          this.state.posts = []
          for (let post in res.data) {
            console.log(res.data[post])
            res.data[post].name = this.state.map.get(res.data[post].categories[0])
            this.state.posts.push(res.data[post])
            console.log(this.state.posts)
          }
        })
        .catch(error => alert(error))
    },
    categoryFilter ({commit}, payload) {
      commit('changeCat', payload)
    },
    isEdited ({commit}) {
      commit('editChange')
    },
    sendPost({commit}, post) {
      console.log(post)
      let config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      }
      axios.post('wp/v2/posts', post, config)
        .then(res => {
          commit('pushPost', res.data)
        })
        .catch(err => {
          alert(err)
        })
    },
    postsRefresh({commit}, payload) {
      commit('changePosts', payload)
    },
    removePost({commit}, payload) {
      let indx = payload.index
      let ID = `${payload.id}`

      let config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      }

      axios.delete(`wp/v2/posts/${ID}`, config)
        .then(res => {
        })
        .catch(err => {
          alert(err)
        })

      commit('postRemove', indx)
    },
    sendCat({commit, dispatch}, cat) {
      let config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      }
      axios.post('wp/v2/categories', cat, config)
        .then(res => {
          console.log(res.data)
          commit('pushCategory', res.data)
        })
        .catch(err => {
          alert(err)
        })

      for (let category of this.state.categories) {
        commit('setMap', { id: category.id, name: category.name })
      }
      console.log(this.state.map)
    },
    idToName({commit}, payload) {
      commit('CatIdConv', payload)
    },
    removeCategory({commit}, payload) {
      let config = {
        headers: { Authorization: 'Bearer' + localStorage.getItem('jwt') }
      }

      axios.delete(`wp/v2/categories/${payload.id}?force=true`, config)
        .then(res => {
        })
        .catch(err => {
          alert(err)
        })

      let indx = `${payload.index}`
      commit('catRemove', indx)
    }
  },
  getters: {
    loadedJwt (state) {
      state.jwt = localStorage.getItem('jwt')
      return state.jwt
    },
    loadedPosts (state) {
      return state.posts
    },
    loadedNews (state) {
      return state.mainnews
    },
    loadedCategories (state) {
      return state.categories
    },
    loadedCategory (state) {
      return state.currentCat
    },
    showEdit (state) {
      return state.edited
    },
    loadedMedia (state) {
      return state.media
    },
    loadedArr (state) {
      return state.arr
    }
  }
})
