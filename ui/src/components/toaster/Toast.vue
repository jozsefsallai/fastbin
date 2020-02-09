<template lang="pug">
  .alert(role='alert', :style='styles')
    .alert-inner(:class='toastClass')
      .message
        strong(v-if='title') {{ title }}
        span.message {{ message }}
      .dismiss-button(v-if='dismissable')
        a(href='javascript://', @click='handleClick') OK
</template>

<script>
function oneOf (array) {
  return {
    validator (value) {
      return array.includes(value);
    }
  };
}

export default {
  name: 'toast',
  props: {
    idx: Number,
    level: oneOf(['success', 'danger', 'warning', 'info']),
    title: String,
    message: {
      type: String,
      required: true
    },
    dismissable: Boolean,
    dead: Boolean
  },

  computed: {
    toastClass: function () {
      return {
        [`alert-${this.level}`]: true,
        dead: this.dead
      };
    },
    styles: function () {
      return {
        left: 0,
        right: '30px',
        bottom: `${this.idx * 80}px`,
        position: 'fixed'
      };
    }
  },

  methods: {
    handleClick: function () {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .alert {
    color: #fff;
    padding-bottom: 20px;
    z-index: 1000;

    .alert-inner {
      width: 400px;
      float: right;
      padding: 15px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        display: inline-block;
        border: 2px solid #fff;
        padding: 6px 10px;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
        transition: background .1s ease-in-out,
                    color .1s ease-in-out;

        &:hover {
          background: #fff;
          color: #000;
        }
      }

      strong {
        margin-right: 20px;
      }

      &.alert-success {
        background: $success;
      }

      &.alert-danger {
        background: $danger;
      }

      &.alert-warning {
        background: $warning;
      }

      &.alert-info {
        background: $info;
      }

      &.dead {
        opacity: 0;
      }
    }

    @media only screen and ( max-width: 660px ) {
      .alert-inner {
        width: auto;
        font-size: 13px;
        padding: 15px 12px;

        .message {
          padding-right: 10px;
        }
      }
    }
  }
</style>
