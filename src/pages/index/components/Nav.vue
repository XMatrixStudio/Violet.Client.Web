<template>
  <div class="comp-nav">
    <div :class="windowsScroll > 30 ? 'nav' : 'nav-top'">
      <div class="title"><img src="../../../assets/icon.svg"> Violet</div>
      <div class="right-box">
        <a @click="$router.push({name: 'home'})" :class="selected === 'home' ? 'nav-selected' : ''">Home</a>
        <a @click="$router.push({name: 'about'})" :class="selected === 'about' ? 'nav-selected' : ''">About</a>
        <Button class="login-btn" size="large" type="primary">Login</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      require: true
    }
  },
  data () {
    return {
      windowsScroll: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      this.windowsScroll = window.scrollY
    })
  }
}
</script>

<style lang="scss">
.comp-nav {
  .nav {
    z-index: 10240;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: rgb(240, 251, 251);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.103);
    .title {
      top: 8px;
    }
    .right-box {
      top: 8px;
      .login-btn {
        transform: translateY(5px);
        vertical-align: bottom;
        box-shadow: none;
        &:focus {
          box-shadow: none;
        }
        &:hover {
          box-shadow: none;
          background-color: rgb(37, 56, 82);
        }
      }
    }
  }

  .title {
    z-index: 10240;
    user-select: none;
    position: absolute;
    display: inline;
    top: 46px;
    left: 100px;
    font-size: 32px;
    img {
      height: 36px;
      vertical-align: text-top;
    }
  }

  .right-box {
    z-index: 10240;
    position: absolute;
    top: 48px;
    right: 70px;
    a {
      user-select: none;
      margin: 20px;
      font-size: 20px;
      color: rgba(54, 88, 126, 0.788);
      &:hover {
        color: rgb(76, 194, 200);
      }
    }
    .nav-selected {
      color: rgba(76, 194, 200, 0.815);
    }
    .login-btn {
      padding: 8px 26px;
      background-color: rgb(56, 79, 106);
      border-color: rgb(56, 79, 106);
      margin-left: 20px;
      vertical-align: super;
      box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
      &:focus {
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
      }
      &:hover {
        box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
