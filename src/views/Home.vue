<template>
  <div class="header">
    <div class="personal">我的</div>
    <div>MIKO</div>
    <i class="iconfont icon-chaxun"></i>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'home',
  components: {}
}
</script>
<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #f2353c;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 36px;
    z-index: 9;

    .personal {
      color: #f9aeb0;
    }

    i {
      font-size: 36px;
    }
  }
</style>
