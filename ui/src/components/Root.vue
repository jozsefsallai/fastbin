<template lang="pug">
  .app
    router-view
    toast-container
</template>

<script>
import Vue from 'vue';

export default Vue.component('root', {});
</script>

<style lang="scss">
  @import '~font-awesome/scss/font-awesome.scss';
  @import 'src/styles/base';
</style>
