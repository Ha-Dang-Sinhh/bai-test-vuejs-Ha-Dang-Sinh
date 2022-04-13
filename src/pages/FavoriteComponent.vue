<template>
  <div>
    <div class="h-auto" v-if="dataFavorites.length>0">
      <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
        <div v-for="( dataFavoritesItem,dataFavoritesIndex ) in dataFavorites" :key="dataFavoritesIndex" class="bg-white h-auto">
          <div class="h-auto">
            <div class="shadow-lg h-auto hover:shadow-xl transform transition duration-500 hover:scale-105">
              <div>
                <img class="w-full" :src="dataFavoritesItem.urlToImage"/>
                <div class="px-4 h-auto py-5">
                  <h1 class="text-xl font-gray-700 font-bold">{{dataFavoritesItem.author}}</h1>
                  <div class="flex space-x-2 mt-2 w-full">
                    <a :href="dataFavoritesItem.url" class="text-lg text-blue-500 font-semibold mb-2 w-full text-center">{{dataFavoritesItem.title}}</a>
                  </div>
                  <p class="text-sm tracking-normal ">{{dataFavoritesItem.content}}</p>
                  <p class="text-sm tracking-normal">{{dataFavoritesItem.description}}</p>
                  <div class=" flex justify-between">
                    <a class="mt-20 w-full px-5 text-center bg-yellow-400 py-2 rounded-lg" :href="'https://www.facebook.com/sharer/sharer.php?u='+dataFavoritesItem.url"><i class="fa-solid fa-share"></i> FB</a>
                    <a class="mt-20 w-full px-5 text-center bg-yellow-400 py-2 rounded-lg" :href="'https://twitter.com/intent/tweet?text='+dataFavoritesItem.url"><i class="fa-solid fa-share"></i> Twitter</a>
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
export default {
  name: "FavoriteComponent",
  data(){
    return{
      dataFavorites:[],
    }
  },
}
</script>

<style scoped>

</style>