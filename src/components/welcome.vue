<template>
  <div class="welcome">
    <h1>
      欢迎使用！
    </h1>
  </div>
</template>

<script>
    export default {
        name: "welcome"
    }
</script>

<style scoped>
.welcome{
  display: flex;
  justify-content: center;
  align-items: Center;
  width: 100%;
  height: 100%;
  //background:url(../assets/1.jpg) no-repeat;
}
  h1{
    font-size: 60px;
  }
</style>
