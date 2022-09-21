<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.push('/')" />
    <div class="list">
      <article class="markdown-body">
        <div v-html="list.title" class="title"></div>
        <van-cell title="单元格" is-link class="photo" :border="false">
          <template #title>
            <div class="left">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                :src="list.aut_photo"
              />
              <div class="right">
                <div v-html="list.aut_name"></div>
                <br />
                <div v-html="list.pubdate"></div>
              </div>
            </div>
          </template>
          <template #right-icon v-if="list.is_followed">
            <van-button
              icon="success"
              type="default"
              class="Concerned"
              round
              @click="Unfriend"
              >已关注</van-button
            >
          </template>
          <template #right-icon v-else>
            <van-button icon="plus" type="info" class="info" round
              >关注</van-button
            >
          </template>
        </van-cell>
        <div v-html="list.content"></div>
        <div
          data-v-00f0d782=""
          role="separator"
          class="van-divider van-divider--hairline van-divider--content-center"
        >
          正文结束
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
          <Commends></Commends>
        </van-popup>
        <CommentArea />

        <div class="bottom">
          <van-button
            type="default"
            class="bottom-btn"
            round
            @click="show = true"
            >写评论</van-button
          >
          <van-icon class="toutiao toutiao-wenda" />
          <van-icon class="toutiao toutiao-shoucang" />
          <van-icon class="toutiao toutiao-dianzan2" />
          <van-icon class="toutiao toutiao-fenxiang" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Commends from './components/Commends.vue'
import CommentArea from './components/CommentArea.vue'
import { getDetailAPI } from '@/api'
import 'github-markdown-css/github-markdown.css'
export default {
  components: {
    Commends,
    CommentArea
  },
  data() {
    return {
      show: false,
      list: {},
      imgList: [],
      active: 0
    }
  },
  created() {
    this.show1()
  },
  methods: {
    async show1() {
      console.log(this.$route.query.articleId)
      const { data } = await getDetailAPI(this.$route.query.articleId)
      console.log(data)
      this.list = data.data
    }
  }
}
</script>

<style scoped lang="less">
.list {
  height: 100vh;
}
:deep(.van-nav-bar__content) {
  position: fixed;
  width: 100%;
  background-color: #3296fa;
  .van-ellipsis {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.title {
  font-size: 40px;
  line-height: 50px;
  min-height: 80px;
  font-weight: 700;
  padding: 40px 0;
}
.heading {
  font-size: 190px !important;
}
.photo {
  margin-top: 15px;
  margin-bottom: 50px;
  padding: 0px !important;
}

.info {
  width: 170px;
  height: 54px;
  font-size: 12px;
  margin-top: 20px;
}
.left {
  display: flex;
  height: 100%;
}

.right {
  padding-top: 15px;
  line-height: 20px;
  margin-left: 20px;

  font-size: 12px;
}
.list {
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 102px;
  padding-top: 92px;
  overflow: auto;
}
.pl-button {
  width: 282px;
  height: 40px;
  border: 0.5px solid #fefefe;
}

.Concerned {
  width: 170px;
  height: 54px;
  font-size: 12px;
  margin-top: 20px;
}

.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 1.17333rem;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  :deep(.van-icon) {
    font-size: 30px;
  }
  .bottom-btn {
    width: 282px;
    height: 46px;
    color: #7e7e7e;
    border-color: #7e7e7e;
    // margin-top: 20px;
  }
}
</style>
