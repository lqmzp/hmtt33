<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.box {
  width: 700px;
  height: 50px;
  background-color: red;
}
</style>
