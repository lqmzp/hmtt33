<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block> 搜索 </van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
      v-model="isShow"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      ><ChannelEdit
        v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        :myChannels="channels"
        @del-channel="delChannel"
        @add-channel="addchannel"
      />
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/Articlelist.vue'
import { getChannerlAPI, delChannelAPI, addChannelAPI } from '@/api'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannles()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannles() {
      if (this.isLogin) {
        this.getChannerl()
      } else {
        const myChannels = this.$store.state.myChannels
        console.log(myChannels)
        if (myChannels.length === 0) {
          this.getChannerl()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getChannerl() {
      try {
        const { data } = await getChannerlAPI()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        // console.log(error)
        const status = error.response.status
        status === 507 && this.$toast.fail('请刷新')
      }
    },
    async delChannel(id) {
      // console.log(id)
      this.channels = this.channels.filter((item) => item.id !== id)
      try {
        const newChannels = this.channels.filter((item) => item !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        // this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请先登录再删除')
        } else {
          throw error
        }
      }
    },
    async addchannel(id) {
      try {
        if (this.isLogin) {
          await addChannelAPI(id.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, id])
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请先登录再删除')
        } else {
          console.log(1)
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
.a {
  font-size: 50px;
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
