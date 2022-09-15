<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="value"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        class="search"
        show-action
        @search="onSearch"
        @focus="onFoucus"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      :keywords="value"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
    <!-- 搜索建议 -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.value === '') {
        return 'SearchHistory' //搜索历史
      }
      if (this.isShaSearchResult) {
        return 'SearchResult' //搜索结果
      }
      return 'SearchSuggestion'
    }
  },
  data() {
    return {
      value: '',
      isShaSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(value) {
      const distinctHistories = [...new Set([value, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.value = value
      this.isShaSearchResult = true
    },
    onFoucus() {
      this.isShaSearchResult = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
