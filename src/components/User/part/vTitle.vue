<template>
  <div>
    <div class="comp-user-title">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.comp-user-title {
  display: block;
  max-width: 800px;
  border-bottom: 1px solid #e9eaec;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 24px;
}
</style>
