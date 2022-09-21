<template>
  <div>
    <van-nav-bar
      title="个人信息"
      class="navbar"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()"
      ><van-image width="64px" height="64px" round :src="avator"
    /></van-cell>
    <van-cell
      title="昵称"
      is-link
      @click="isShowName = true"
      :value="username"
    />
    <van-cell
      title="性别"
      is-link
      @click="isShowSex = true"
      :value="sex[gender]"
    />
    <van-cell title="生日" is-link @click="onBirthday" :value="birthday" />
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdataAvator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></UpdataAvator>
    </van-popup>
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Updataname
        v-if="isShowName"
        :username.sync="username"
        :user="username"
      />
    </van-popup>
    <van-popup v-model="isShowSex" round position="bottom">
      <van-picker
        title="标题"
        show-toolbar
        :columns="sex"
        @cancel="isShowSex = false"
        :default-index="gender"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="isShowDate" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @confirm="onDate"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdataAvator from './components/UpdataAvator.vue'
import Updataname from './components/Updataname.vue'
import { resolveToBese64 } from '@/utils/resolveToBase64'
import { getUserProfileAPI, uploadProfileAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  components: { UpdataAvator, Updataname },
  data() {
    return {
      isShowPhoto: false,
      isShowName: false,
      isShowSex: false,
      isShowDate: false,
      photo: '',
      avator: '',
      username: '',
      sex: ['男', '女'],
      gender: 0,
      birthday: '',
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async onDate() {
      console.log(this.currentDate)
      const a = dayjs(this.currentDate).format('YYYY-MM-DD')
      await uploadProfileAPI('birthday', a)
      this.birthday = a
      this.isShowDate = false
    },
    onBirthday() {
      this.isShowDate = true
    },
    async onConfirm(value, index) {
      // console.log(index)
      await uploadProfileAPI('gender', index)
      this.gender = index
      this.isShowSex = false
    },
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBese64(file)
      // console.log(base64)
      this.photo = base64
      this.isShowPhoto = true
      this.$refs.file.value = ''
    },
    async getUserProfile() {
      const { data } = await getUserProfileAPI()
      this.avator = data.data.photo
      this.username = data.data.name
      this.gender = data.data.gender
      this.birthday = data.data.birthday
      this.currentDate = new Date(data.data.birthday)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
