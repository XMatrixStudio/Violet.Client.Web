<template>
  <div class="comp-title">
    <p class="title">{{title}}</p>

  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Violet'
    }
  }
}
</script>


<style lang="scss">
.comp-title {
  font-size: 26px;

  .title {
    padding: 20px;
    color: #0000006b;
    user-select: none;
  }

}
</style>
