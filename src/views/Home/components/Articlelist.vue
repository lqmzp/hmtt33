<template>
  <div>
    <article-item
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></article-item>
  </div>
</template>

<script>
import ArticleItem from './ArticeleItem.vue'
import { getArticles } from '@/api'
export default {
  data() {
    return {
      articles: []
    }
  },
  components: {
    ArticleItem
  },
  name: 'Articles',
  props: {
    id: [String, Number]
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (error.response?.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
