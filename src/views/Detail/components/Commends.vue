<template>
  <div>
    <div class="list">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button type="primary" v-if="message !== ''" @click="log"
        >提交</van-button
      >
      <van-button disabled type="info" v-else>提交</van-button>
    </div>
  </div>
</template>

<script>
import { postCommentAPI } from '@/api'

export default {
  props: {
    btn: {
      type: String
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async log() {
      // console.log(this.btn)
      if (this.btn) {
        const { data } = await postCommentAPI({
          target: this.btn,
          content: this.message,
          art_id: this.$route.query.articleId
        })
        console.log(data.data)
        // this.$emit('update:lists', data.data.results)
      } else {
        const { data } = await postCommentAPI({
          target: this.$route.query.articleId,
          content: this.message
        })
        console.log(data)
        // this.$emit('update:lists', data.data.results)
      }

      this.$parent.$parent.show = false
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  :deep(.van-cell) {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    // background-color: #fff;
    background-color: #f5f7f9;
  }
  button {
    width: 2rem;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background-color: #fff;
  }
}
</style>
