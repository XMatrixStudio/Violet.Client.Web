<template>
  <div id="app" class="wrapper">
    <Row type="flex" justify="center">
      <i-col :span="20" class="violet-login-title">
        <p><img src="./assets/favicon.svg" class="violet-login-logo" />
          <span class="title-violet">Violet</span>
        </p>
      </i-col>
    </Row>
    <router-view/>
    <Language></Language>
    <ul id="cssQ" class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Language from './components/Language'
export default {
  name: 'app',
  components: {
    Language
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 500px;
  overflow-y: overlay;
}

.fa {
  color: #80848f;
}

.violet-login-title {
  max-width: 1100px;
  user-select: none;
  color: #eee;
  font-size: 34px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #73c3b6;
  > p {
    margin-bottom: 20px;
  }
  .violet-login-logo {
    width: 40px;
    margin-left: 13px;
    vertical-align: sub;
  }
  .title-violet {
    margin-left: 6px;
    letter-spacing: 1px;
    transition: all 0.5s;
    &:hover {
      color: #fff;
    }
  }
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  z-index: -1;
}

.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: 0px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.bg-bubbles li:nth-child(1) {
  left: 10%;
}

.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
  left: 70%;
}

.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}

.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}

@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}

.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
  position: absolute;
  height: 100%;
  left: 0;
  width: 100%;
  overflow-x: hidden;
}

.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
  -ms-transform: translateY(85px);
  transform: translateY(85px);
}
</style>

