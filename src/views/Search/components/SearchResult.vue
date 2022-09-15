<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResult"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败重新加载"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in result"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      result: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResult() {
      try {
        const { data } = await getResultAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const result = data.data.results
        if (result.length === 0) {
          this.finished = true
        }
        this.result = [...this.result, ...result]
      } catch {
        this.error = true
      } finally {
        // console.log(this.result)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
