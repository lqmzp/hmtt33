<template>
  <div>
    <van-cell v-for="(item, index) in lists" :key="index">
      <template #icon>
        <van-image round :src="item.aut_photo" />
      </template>

      <template #title>
        <span class="user-name">{{ item.aut_name }}</span>
        <van-button
          round
          class="like-btn"
          :class="{ liked: item.is_liking }"
          :icon="item.is_liking ? 'good-job ' : 'good-job-o'"
          >{{ item.like_count || '赞' }}</van-button
        >
      </template>

      <template #label>
        <p class="neirong">{{ item.content }}</p>
        <div class="bottom-info">
          <span calss="comment-pubdate">{{ item.pubdate }}</span>
          <van-button class="reply" round @click="showbtn(item)"
            >回复 {{ item.reply_count }}</van-button
          >
        </div>
        <div></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      btn: ''
      //   isShowPhoto: false
    }
  },
  methods: {
    log() {
      console.log(this.lists)
    },
    showbtn(a) {
      //   this.btn = a
      //   console.log(this.$parent.$parent.isShowPhoto)
      this.$parent.$parent.isShowPhoto = true
      this.$emit('update:area', a)
    }
    // ...mapMutations(['SET_COMMENT']),
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
