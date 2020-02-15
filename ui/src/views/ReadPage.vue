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
          router-link(:to='cloneUrl', v-tooltip='"Clone (ctrl+shift+c)"')
            i.fa.fa-files-o
          a(:href='rawUrl', rel='noopener', v-tooltip='"Raw (ctrl+shift+r)"')
            i.fa.fa-file-code-o
    monaco-editor.editor(
      theme='vs-dark',
      :language='language.id'
      v-model='code'
      :options='editorOptions'
    )
</template>

<script>
import MonacoEditor from 'vue-monaco';
import handleKey from 'lib/handleKey';
import languages from 'lib/languages';
import Toaster from 'lib/toaster';

export default {
  name: 'new-container',
  components: {
    'monaco-editor': MonacoEditor
  },
  data () {
    return {
      code: '',
      language: languages.plain,
      key: null,
      editorOptions: {
        fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
        fontLigatures: true,
        lineHeight: 22,
        readOnly: true
      },
      keymap: {
        'ctrl+i': e => e.preventDefault() | this.$router.push('/'),
        'ctrl+shift+c': e => e.preventDefault() | this.$router.push(this.cloneUrl),
        'ctrl+shift+r': e => e.preventDefault() | (window.location.href = this.rawUrl)
      }
    };
  },
  computed: {
    cloneUrl () {
      return `/clone/${this.$route.params.key}`;
    },
    rawUrl () {
      return `/raw/${this.key}`;
    }
  },
  mounted () {
    const { key, extension } = handleKey(this.$route.params.key);
    this.language = languages[extension] || languages.plain;
    this.key = key;

    fetch(`/documents/${key}`, {
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
        } else {
          if (json.error) {
            Toaster.create('warning', json.error, 'Whoops!');
          }

          this.$router.push('/');
        }
      })
      .catch(err => {
        console.error(err);
        this.$router.push('/');
      });
  }
};
</script>
