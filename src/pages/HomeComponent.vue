<template>
  <div>
      <div class="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
        <div class="container mx-auto p-12 bg-gray-100 rounded-xl">
          <form action="" @submit.prevent="search()">
            <div class="w-full">
              <input type="text" placeholder="Tìm kiếm" class="w-2/3 h-10 text-center mb-6 border border-yellow-500 rounded mx-auto block" v-model="contentSearch">
            </div>
          </form>
            <h1 class="w-72 text-4xl mx-auto uppercase font-bold from-current mb-8">Trang tin tức</h1>
            <!-- Box-1 -->
            <div v-if="dataNews.length>0">
              <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                <div v-for="( dataNewsItem,dataNewsIndex ) in dataNews" :key="dataNewsIndex" class="bg-white">
                  <div>
                    <div class="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                      <div>
                        <img class="w-full" :src="dataNewsItem.urlToImage"/>
                        <div class="px-4 py-2">
                          <h1 class="text-xl font-gray-700 font-bold">{{dataNewsItem.author}}</h1>
                          <div class="flex space-x-2 mt-2 w-full">
                            <a :href="dataNewsItem.url" class="text-lg text-gray-600 font-semibold mb-2 w-full text-center">{{dataNewsItem.title}}</a>
                          </div>
                          <p class="text-sm tracking-normal ">{{dataNewsItem.content}}</p>
                          <p class="text-sm tracking-normal">{{dataNewsItem.description}}</p>
                          <button class="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">Read more</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

<!--              <div class="mt-12">-->
<!--                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">-->
<!--                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">-->
<!--                    <span class="">Previous</span>-->
<!--                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />-->
<!--                  </a>-->
<!--                  &lt;!&ndash; Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" &ndash;&gt;-->
<!--                  <a href="#" aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>-->
<!--                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>-->
<!--                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>-->
<!--                  <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>-->
<!--                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>-->
<!--                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>-->
<!--                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>-->
<!--                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">-->
<!--                    <span class="">Next</span>-->
<!--                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />-->
<!--                  </a>-->
<!--                </nav>-->
<!--              </div>-->
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
    }
  },
  mounted() {
    window.addEventListener("scroll",this.handleScroll);
  },
}
</script>

<style scoped>

</style>