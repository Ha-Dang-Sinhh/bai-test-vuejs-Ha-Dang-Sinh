<template>
  <div>
      <div class="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
        <div class="container mx-auto p-12 bg-gray-100 rounded-xl">
          <form action="" @submit.prevent="search()">
            <div class="w-full">
              <input type="text" placeholder="Tìm kiếm" class="w-2/3 h-10 text-center mb-6 border border-yellow-500 rounded mx-auto block" v-model="contentSearch">
            </div>
          </form>
          <button class="px-5 text-center bg-yellow-400 py-2 rounded-lg" @class="goToPageFavorite()">goToPageFavorite</button>
            <h1 class="w-72 text-4xl mx-auto uppercase font-bold from-current mb-8">Trang tin tức</h1>
            <!-- Box-1 -->
            <div class="h-auto" v-if="dataNews.length>0">
              <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                <div v-for="( dataNewsItem,dataNewsIndex ) in dataNews" :key="dataNewsIndex" class="bg-white h-auto">
                  <div class="h-auto">
                    <div class="shadow-lg h-auto hover:shadow-xl transform transition duration-500 hover:scale-105">
                      <div>
                        <img class="w-full" :src="dataNewsItem.urlToImage"/>
                        <div class="px-4 h-auto py-5">
                          <h1 class="text-xl font-gray-700 font-bold">{{dataNewsItem.author}}</h1>
                          <div class="flex space-x-2 mt-2 w-full">
                            <a :href="dataNewsItem.url" class="text-lg text-blue-500 font-semibold mb-2 w-full text-center">{{dataNewsItem.title}}</a>
                          </div>
                          <p class="text-sm tracking-normal ">{{dataNewsItem.content}}</p>
                          <p class="text-sm tracking-normal">{{dataNewsItem.description}}</p>
                          <div class=" flex justify-between">
                            <a class="mt-20 w-full px-5 text-center bg-yellow-400 py-2 rounded-lg" :href="'https://www.facebook.com/sharer/sharer.php?u='+dataNewsItem.url"><i class="fa-solid fa-share"></i> FB</a>
                            <a class="mt-20 w-full px-5 text-center bg-yellow-400 py-2 rounded-lg" :href="'https://twitter.com/intent/tweet?text='+dataNewsItem.url"><i class="fa-solid fa-share"></i> Twitter</a>
                            <button @click="addToFavorite(dataNewsItem.author)"><i class="fa-solid fa-heart "></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </div>
  </div>
</template>

<script>

import {authService} from "@/services/authService"

export default {
  name: "HomeComponent",
  data(){
    return{
      dataNews:[],
      dataNews2:[],
      contentSearch:'',
      errContentSearch:'',
      pageId:1,
      urlShare:'https://www.facebook.com/sharer/sharer.php?u=',
      favorite:[],
    }
  },
  methods: {
    async search(){
      if(this.contentSearch == ''){
        this.errContentSearch = 'Không đc để trống';
        return;
      }
      try{
        const respSearch = await authService.searchByKeyword(
          this.contentSearch,this.pageId
        );
        this.dataNews = respSearch.data.articles;
        return;
      }catch (e){
        console.log(e);
      }
    },
    async handleScroll(){
      let isLoad = false;
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight ){
        isLoad = true;
        const respListSearch =  await authService.searchByKeyword(
            this.contentSearch,this.pageId +=1
        );
        this.dataNews2 = respListSearch.data.articles;
        console.log(this.dataNews2);
        this.dataNews = [...this.dataNews,...this.dataNews2];
        isLoad = false;
      }
    },
    addToFavorite(value){
      // this.dataNews.forEach(dataAuthor=>{
      //   if(dataAuthor.author === value){
      //     localStorage.setItem('favorite',JSON.stringify(dataAuthor));
      //   }
      // })
    },
    goToPageFavorite(){
      this.$router.push({name:'favorite'});
    }
  },
  mounted() {
    window.addEventListener("scroll",this.handleScroll);
  },
}
</script>

<style scoped>

</style>