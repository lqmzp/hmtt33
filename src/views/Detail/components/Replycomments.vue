<template>
  <div>
    <van-nav-bar
      :title="list ? `${this.list.reply_count}条回复` : '没有回复'"
    />
    <van-cell class="vancell">
      <template #icon>
        <van-image round :src="list.aut_photo" />
      </template>

      <template #title>
        <span class="user-name">{{ list.aut_name }}</span>
        <van-button
          round
          class="like-btn"
          :class="{ liked: list.is_liking }"
          :icon="list.is_liking ? 'good-job ' : 'good-job-o'"
          >{{ list.like_count || '赞' }}</van-button
        >
      </template>
      <template #label>
        <p class="neirong">{{ list.content }}</p>
        <div class="bottom-info">
          <span calss="comment-pubdate">{{ list.pubdate }}</span>
          <van-button class="reply" round @click="btn"
            >回复 {{ list.reply_count }}</van-button
          >
        </div>
        <div></div>
      </template>
    </van-cell>
    <van-cell> 全部回复 </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <Commends v-if="show" :btn="comid" :lists.sync="lists"></Commends>
    </van-popup>
    <Area :lists="lists" />
  </div>
</template>

<script>
import { getCommentAPI } from '@/api'
import Area from './Area.vue'
import Commends from './Commends.vue'
export default {
  name: 'ReplyComments',
  components: {
    Area,
    Commends
  },
  props: {
    list: {
      required: true
    }
  },
  data() {
    return {
      show: false,
      lists: [],
      comid: ''
    }
  },
  created() {
    this.showbtn()
  },
  methods: {
    async showbtn() {
      if (this.list.reply_count !== 0) {
        const { data } = await getCommentAPI({
          type: 'c',
          source: this.list.com_id,
          offset: this.offset,
          limit: this.limit
        })
        this.lists = data.data.results
      }
    },
    btn() {
      this.comid = this.list.com_id
      this.show = true
    }
  }
}
</script>
<style scoped lang="less">
:deep(.van-nav-bar__content) {
  position: fixed;
  top: 0;
}
.vancell {
  margin-top: 92px;
}
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
