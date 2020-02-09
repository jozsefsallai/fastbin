<template lang="pug">
  #toast-container
    toast(
      v-for='val in toasts'
      :key='val.id'
      :idx='val.idx'
      :level='val.level'
      :title='val.title'
      :message='val.message'
      :dismissable='val.dismissable'
      :dead='val.dead'
      @click='handleDismissClick(val.id)'
    )
</template>

<script>
import Vue from 'vue';
import Toaster from 'lib/toaster';
import ToastComponent from './Toast';
import find from 'lodash.find';
import remove from 'lodash.remove';
export default Vue.component('toast-container', {
  components: {
    toast: ToastComponent
  },
  data () {
    return {
      toasts: []
    };
  },
  mounted () {
    Toaster.$on('create', this.handleCreate);
    Toaster.$on('dismiss', this.handleDismiss);
  },
  methods: {
    handleCreate () {
      return this.buildList();
    },
    buildList () {
      const newToasts = this.toasts.slice(0);
      Toaster.all().forEach((toast) => {
        if (!find(this.toasts, { id: toast.id })) {
          newToasts.unshift(toast);
        }
      });
      let idx = 0;
      newToasts.forEach((toast) => {
        if (!toast.dead) {
          toast.idx = idx++;
        }
      });
      this.toasts = newToasts;
    },
    handleDismiss (removed) {
      let newToasts = this.toasts.slice(0);
      const removedToast = find(newToasts, { id: removed.id });
      if (removedToast) {
        removedToast.dead = true;
        setTimeout(function () {
          newToasts = this.toasts.slice(0);
          remove(newToasts, { id: removed.id });
          this.toasts = newToasts;
        }.bind(this), 200);
        let idx = 0;
        this.toasts.forEach((toast) => {
          if (!toast.dead) {
            toast.idx = idx++;
          }
        });
      }
      this.toasts = newToasts;
    },
    handleDismissClick (id) {
      Toaster.destroy(id);
    }
  }
});
</script>
