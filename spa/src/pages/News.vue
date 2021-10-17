<template>
    <div class="news">
      <h1>News page</h1>
      <transition-group tag="ul"
                        mode="out-in">
      <ul   class="mainnews-list" v-for="postnew in mainnews" :key="postnew.id">
<!--        <li class="news-block" v-for="(mnew, index) in mainnews" v-if="mainnews" :key="index" :id="'news' + index">-->
<!--          <div class="news-content">-->
<!--            <div class="entry-thumbnail" style="flex: 0 0 auto; padding-top: 6px;">-->
<!--              <img-->
<!--                v-bind:src="mnew.thumbnail"-->
<!--              />-->
<!--            </div>-->
<!--          <div class="entry-content" style="flex: 0 0 65%">-->
<!--            <a :href="mnew.link">-->
<!--              <span v-html="mnew.title.rendered" />-->
<!--            </a>-->
<!--            <div class="post-datas" style="display: flex; font-size: 12px;">-->
<!--              <span ><i class="fal fa-clock fa-sm"></i></span>-->
<!--              &nbsp;&nbsp;<span></span>-->
<!--            </div>-->
<!--            <div v-html="mnew.excerpt.rendered"></div>-->
<!--          </div>-->
<!--          </div>-->
<!--                    </li>-->
<!--        <v-flex>-->
<!--          <h3>{{postnew.title.rendered}}</h3>-->
<!--          <router-link tag="li"-->
<!--                       :to="{ name: 'NewsPost', params: {id: postnew.id}}"-->
<!--                       style="cursor: pointer;"-->
<!--                       class="list-group list"><a ref="#">-->
<!--            <img class="card-img-top"-->
<!--                 v-if="postnew.better_featured_image != undefined"-->
<!--                 :src="postnew.better_featured_image.source_url">-->
<!--            <p v-else>no image found</p>-->
<!--          </a>-->
<!--          </router-link>-->
<!--          <hr style="width: 100%">-->

<!--        </v-flex>-->
<!--        <img class="card-img-top"-->
<!--             v-if="postnew._embedded['wp:featured_media']"-->
<!--             :src="postnew._embedded['wp:featured_media'][0].source_url">-->
        <transition name="slide" mode="out-in" appear>
          <h5 class="title">
            <router-link :to="'/news/' + postnew.slug">
              <span v-if="postnew.title" v-html="postnew.title.rendered" />
            </router-link>

          </h5>
        </transition>
      </ul>
      </transition-group>
                  <app-news v-for="postnew in mainnews"
                            :key="postnew.id"
                            :news-type="postnew"
                  role="article"
                  ></app-news>
                </div>
            </template>

            <script>
              import axios from 'axios'
              import NewsPost from "./NewsPost";
              export default {
                components: {
                  'app-news': NewsPost
                },
                  data(){
                    return{
                      newsUrl: 'https://24city-chernigiv/wp-json/wp/v2/mainnews',
                      newsData: {
                        per_page: 20,
                      page: 1
                  },
                      mainnews: [],
                      route: {
                        type: String,
                        default: 'mainnews'
                      },
                      fetchNow: {
                        type: Number,
                        default: 1
                      }
                  }
                  },
                computed: {
                  news() {
                    return this.$store.getters.loadedNews
                  }
                },
                  methods: {
                    getNewsPost(){
                      var path = this.$route.path
                      axios.get('https://24city-chernigiv/wp-json/wp/v2/mainnews/?_embed', '')
                        .then(response => {
                          this.mainnews = response.data[0]

                          if (this.mainnews === undefined) {
                            this.$router.push({name: 'NotFound'})
                          }
                        })
                        .catch(e => {
                          console.log(e)
                        })
                    },
                    fetchData() {
                      if ( 0 < this.fetchNow ) {
                        this.getMainNews();
                        //this.apiResponse = ' Loading ⏳ ';
                      }else{
                        console.log('Шо за хуйня');
                      }
                    },
                    getMainNews(){
                       axios.get(this.newsUrl)
                       .then((response) => {
                         this.mainnews = response.data
                       })
                       .catch( (error) => {
                         console.log(error)
                         });
                    }
                  },
                  mounted() {
                    //this.getNewsPost();
                    //this.fetchData()
                    this.getMainNews();

                  }
                }
            </script>

            <style scoped>

            </style>
