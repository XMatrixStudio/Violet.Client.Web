<template>
  <div class="page-404">
    <p>404 Not Found</p>
  </div>
</template>

<script>
export default {
  mounted () {
    let url = '/'
    if (this.$route.query.user) {
      url += this.$route.query.user + '/'
    }
    setTimeout(() => {
      this.$router.push({ path: url })
    }, 3000)
  }
}
</script>

<style lang="scss">
.page-404 {
  p {
    font-size: 100px;
    color: white;
    text-align: center;
    margin-top: 10%;
  }
}
</style>
