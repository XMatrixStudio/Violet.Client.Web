<template>
  <Menu class="comp-nav" mode="horizontal" theme="light" active-name="1">
    <a class="nav-title">Violet</a>
    <MenuItem name="1">
    <Icon type="ios-person" /> 用户中心
    </MenuItem>
    <MenuItem name="2">
    <Icon type="md-code" /> 开发者中心
    </MenuItem>
    <MenuItem name="3">
    <Icon type="md-appstore" /> 应用
    </MenuItem>
    <a class="menu-right user-bar" name="4">
      <img src="../../../assets/avatar.jpg" alt="Avatar"> ZhenlyChen
    </a>
  </Menu>
</template>

<style lang="scss">
.comp-nav {
  .line {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-top: 3px solid rgba(3, 77, 146, 0.603);
  }
  .nav-title {
    color: #2c3e50c7;
    &:hover {
      color: rgb(45, 140, 240);
    }
    font-size: 23px;
    float: left;
    padding: 0 20px;
    position: relative;
    user-select: none;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    font-weight: bolder;
    img {
      height: 30px;
      vertical-align: middle;
      transform: translateY(-3px);
    }
  }
  .menu-right {
    color: #2c3e50;
    padding: 0 20px;
    position: relative;
    float: right !important;
    &:hover {
      color: rgb(45, 140, 240);
    }
  }
  .user-bar {
    user-select: none;
    img {
      height: 30px;
      vertical-align: middle;
      border-radius: 50%;
      padding: 0 5px;
    }
  }
}
</style>
