<template>
  <div class="update-avatar">
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$parent.$parent.isShowName = false"
      @click-right="onClickRight"
    />
    <van-field
      v-model.trim="newname"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import { uploadProfileAPI } from '@/api'
import { Toast } from 'vant'
export default {
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newname: this.user
    }
  },
  methods: {
    async onClickRight() {
      if (this.newname === '') return Toast('请输入姓名')
      const { data } = await uploadProfileAPI('name', this.newname)
      console.log(this.newname)
      this.$emit('update:username', this.newname)
      this.$parent.$parent.isShowName = false
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  width: 100%;
  height: 100%;
}
</style>
