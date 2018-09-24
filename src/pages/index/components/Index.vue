<template>
  <div class="comp-index">
    <img class="background" src="../../../assets/back.png">

    <div class="big-text">
      <p>Violet 中央授权系统</p>
      <p>第三代</p>
      <p>全新形象</p>
      <a href="//github.com/XMatrixStudio/Violet" target="_blank">
        <Icon type="logo-github" /> Github</a>
    </div>
  </div>
</template>

<style lang="scss">
.comp-index {
  color: rgba(54, 88, 126, 0.788);
  text-align: left;
  height: 100vh;
  background-image: linear-gradient(to bottom, rgb(231, 248, 250), #ffffff);
  transition: all 0.2s;

  .big-text {
    color: rgba(24, 54, 88, 0.932);
    font-size: 36px;
    position: absolute;
    top: 30vh;
    left: 100px;
    p {
      margin: 23px 10px;
    }
    a {
      margin: 13px;
      font-size: 20px;
      color: rgb(76, 194, 200);
      i {
        vertical-align: text-top;
      }
    }
  }

  .background {
    user-select: none;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
  }
}
</style>
