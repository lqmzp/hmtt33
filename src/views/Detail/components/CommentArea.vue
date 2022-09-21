<template>
  <div class="comment-item">
    <van-list
      :finished="finished"
      v-model="loading"
      finished-text="没有更多了"
      @load="getComment"
      :error="error"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
    >
      <!-- 评论 -->
      <Area :lists="lists" :area.sync="area" />
    </van-list>

    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <Replycomments v-if="isShowPhoto" :list="area" />
    </van-popup>
  </div>
</template>

<script>
import Area from './Area.vue'
import { getCommentAPI } from '@/api'
// import { mapMutations } from 'vuex'
import Replycomments from '../components/Replycomments.vue'

export default {
  components: {
    Area,
    Replycomments
  },
  name: 'Areas',
  data() {
    return {
      area: '',
      isShowPhoto: false,
      lists: [],
      finished: false,
      loading: false,
      offset: null, //获取下一页数据的标记
      limit: 10,
      error: false,
      totalCount: 0,
      btn: ''
    }
  },
  created() {
    // this.getComment()
  },
  methods: {
    showbtn(a) {
      this.btn = a
      console.log(a)
      this.isShowPhoto = true
    },
    // ...mapMutations(['SET_COMMENT']),
    async getComment() {
      // console.log(this.$route.query.articleId)
      try {
        const { data } = await getCommentAPI({
          type: 'a',
          source: this.$route.query.articleId,
          offset: this.offset,
          limit: this.limit
        })

        console.log(data.data)
        const { results, total_count: totalCount } = data.data
        this.lists.push(...results)
        this.totalCount = totalCount
        // this.$store.commit('SET_COMMENT', data.data)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  width: 100%;
  height: 100%;

  .van-image {
    width: 0.96rem;
    height: 0.96rem;
    margin-right: 0.33333rem;
  }
  :deep(.van-cell) {
    color: #406599;
    font-size: 0.34667rem;
    .like-btn {
      font-size: 0.3rem;
      position: absolute;
      right: 0.5rem;
      border: 0;
      &.liked {
        color: #e5645f;
      }
    }
  }

  .van-cell_title {
    .user-name {
      color: #406599;
    }
  }
  :deep(.van-cell__label) {
    color: #333;
    font-size: 14px;
    .neirong {
      font-size: 0.42667rem;
      color: #333;
      word-break: break-all;
      text-align: justify;
    }
    .bottom-info {
      display: flex;
      align-items: center;
      .reply {
        margin-left: 0.33333rem;
        height: 0.5rem;
        font-size: 13px;
      }
    }
  }
}
</style>
