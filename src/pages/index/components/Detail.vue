<template>
  <div class="comp-detail">
    <div class="detail-box">
      <p class="icon"><img src="../../../assets/security.png"></p>
      <p class="title">安全</p>
      <p class="detail">基于OAuth2.0，多重防御措施，全程加密通讯，保护你的账号安全</p>
    </div>
    <div class="detail-box">
      <p class="icon"><img src="../../../assets/thunder.png"></p>
      <p class="title">极速</p>
      <p class="detail">极速授权，一键访问你的所有应用</p>
    </div>
    <div class="detail-box">
      <p class="icon"><img src="../../../assets/new.png"></p>
      <p class="title">先进</p>
      <p class="detail">采用最强的秀秀作为程序员，写出来的BUG绝无代码</p>
    </div>
  </div>
</template>

<style lang="scss">
.comp-detail {
  height: 60vh;
  padding: 0 5%;
  .detail-box {
    vertical-align: top;
    display: inline-block;
    text-align: left;
    margin-top: 20vh;
    margin-left: 3%;
    margin-right: 3%;
    width: 24%;
    .icon {
      margin: 10px 0;
      user-select: none;
      img {
        height: 36px;
      }
    }
    .title {
      user-select: none;
      color: rgb(56, 79, 106);
      font-weight: bold;
      font-size: 22px;
      margin: 20px 0;
    }
    .detail {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.603)
    }
  }
}
</style>
