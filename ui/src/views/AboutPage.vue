<template lang="pug">
  div(v-hotkeys='keymap')
    header
      .left-block
        .logo fastbin
      .right-block
        nav
          router-link(to='/', v-tooltip='"New (ctrl+i)"')
            i.fa.fa-file-o
          router-link(to='/about', v-tooltip='"About"')
            i.fa.fa-info-circle
    monaco-editor.editor(
      theme='vs-dark',
      language='markdown'
      v-model='code'
      :options='editorOptions'
    )
</template>

<script>
import MonacoEditor from 'vue-monaco';

export default {
  name: 'new-container',
  components: {
    'monaco-editor': MonacoEditor
  },
  data () {
    return {
      code: '',
      editorOptions: {
        fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
        fontLigatures: true,
        lineHeight: 22,
        readOnly: true
      },
      keymap: {
        'ctrl+i': e => e.preventDefault() | this.$router.push('/')
      }
    };
  },
  mounted () {
    fetch('/api/about', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          this.code = json.contents;
        }
      })
      .catch(console.error);
  }
};
</script>
