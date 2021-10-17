<template>
  <div class="container" v-bind:id="'news-' + newspost.id">
    <transition name="slide" mode="out-in" appear>
      <h1 class="title is-1">
        <span v-if="newspost.title" v-html="newspost.title.rendered"/>
      </h1>
    </transition>
    <span>sdflksjflksdjflksdkfsdf{{newspost.id}}</span>
    <span class="ekem-id" v-html="newspost.id">{{newspost.id}}</span>
    <transition name="fade" mode="out-in" appear>
      <img :key="newspost.id"
           class="card-img-top mt-3 p-2"
           v-if="newspost.better_featured_image"
           :src.lazy="newspost.better_featured_image.source_url">
      <div v-else :key="newspost.id" class="col-sm-4 offset-sm-4 text-center"
           style="width: 100%; height: 100%;
			background-color: rgba(131, 151, 136, .2)">
        <transition name="a2" mode="out-in" appear>
          <h5>No Image found</h5>
        </transition>
      </div>
    </transition>
    <section class="content-container" v-if="newspost.excerpt" v-html="newspost.excerpt.rendered">
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "NewsPost",
  props: {
    id: Number,
    newsType: {
      type: Object,
      required: true,
      default() {
        return {
          id: 0,
          slug: '',
          title: { rendered: '' },
          content: { rendered: '' }
        }
      }
      },
  },
  data() {
    return {
      newspost: []
    }
  },
  // beforeMount() {
  //   this.getNewsPost();
  // },
  apiResponse: '', // initial loading or error messages.

  methods:
    {
      getNewsPost() {
        axios.get('https://24city-chernigiv/wp-json/wp/v2/mainnews')
          .then(response => {
            console.log(response.data)
            this.newspost = response.data
            if (this.newspost === undefined) {
              this.$router.push({name: 'NotFound'})
            }
            // document.title = this.post.title.rendered
          })
          .catch(e => {
            console.log(e)
          })
      }
    },

}
</script>

<style scoped>

</style>
