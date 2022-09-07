<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>{{ a }}</h1>
    <h1>{{ bigNum }}</h1>
    <button @click="SET_COUNT(20)">点击+1</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    //   console.log(this)
    // },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count', 'a']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 700px;
  height: 50px;
  background-color: red;
}
</style>
