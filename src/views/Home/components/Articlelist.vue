<template>
  <div class="article">
    <van-pull-refresh v-model="refreshing" @refresh="getNextPage">
      <van-list
        v-model="loading"
        @load="getNextPage"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        offset="200"
        :immediate-check="false"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticeleItem.vue'
import { getArticles } from '@/api'
export default {
  data() {
    return {
      articles: [],
      preTime: '',
      finished: false,
      loading: false,
      error: false,
      refreshing: false
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
    async getNextPage() {
      try {
        if (Math.random() < 0.5) {
          throw new Error()
        }
        const { data } = await getArticles(this.id, this.preTime)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        this.preTime = data.data.pre_timestamp
      } catch (error) {
        // console.log(error)
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.preTime = data.data.pre_timestamp
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

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
