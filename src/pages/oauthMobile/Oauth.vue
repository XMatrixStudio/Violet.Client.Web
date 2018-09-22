<template>
  <div id="app">
    <m-title/>
    <transition name="el-zoom-in-center" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import mTitle from './components/Title'
export default {
  components: {
    mTitle
  }
}
</script>

<style lang="scss">
// @import '../../style/background.scss';
#app {
  font-family: 'Roboto', "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #191a1bbd;
  height: 100vh;
}
#app,
.ivu-modal {
  .ivu-input {
    background: rgba(42, 89, 104, 0);
    border: none;
    border-bottom: 2px solid rgba(0, 27, 9, 0.301);
    border-radius: 0;
    padding: 16px;
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #344b6ea8;
      opacity: 1; /* Firefox */
      text-align: center;
    }
    &:focus {
      border: none;
      border-radius: 0;
      border-bottom: 2px solid #6f91d6;
      box-shadow: 0 0 0 0 rgba(45, 140, 240, 0.2);
    }
  }
  // Icon
  .ivu-input-group-prepend {
    background-color: transparent;
    border: none;
    border-radius: 0;
    font-size: 18px;
    padding-right: 20px;
  }

  .ivu-form-item-error-tip {
    margin-left: 36px;
  }

  .ivu-form-item-error {
    .ivu-input {
      border: none;
      border-bottom: 2px solid #ed4014 !important;
      border-radius: 0 !important;
    }
  }

  .ivu-btn-text {
    transition: all 0.2s;
    &:hover {
      background: transparent;
      border-radius: 0;
    }
    &:focus {
      box-shadow: 0 0 0 0 rgba(45, 140, 240, 0.2);
    }
  }

  .el-zoom-in-center-enter-active,
  .el-zoom-in-center-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .el-zoom-in-center-enter,
  .el-zoom-in-center-leave-active {
    opacity: 0;
    transform: scaleX(0);
  }

  .img-code-input {
    width: 200px !important;
  }

  .img-code {
    position: absolute;
    right: 0;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
}

body {
  background-color: rgb(240, 243, 248) !important;
}

.ivu-modal-content {
  border-radius: 2px !important;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.274) !important;
  .ivu-modal-header {
    border-bottom: none !important;
    .ivu-modal-header-inner {
      margin: 10px;
      font-size: 16px;
    }
  }

  .ivu-modal-body {
    padding: 40px 50px;
    font-size: 15px;
  }

  .ivu-modal-footer {
    background: rgb(249, 249, 249);
    border-top: none !important;
  }

  .ivu-modal-close {
    &:hover {
      .ivu-icon-ios-close {
        color: rgba(0, 27, 9, 0.74) !important;
      }
    }

    .ivu-icon-ios-close {
      &::before {
        font-size: 30px;
        font-weight: bold;
        color: rgba(0, 27, 9, 0.301);
        margin-right: 10px;
      }
    }
  }
}
</style>
