<template lang="pug">
  div
    header
      .left-block
        .logo fastbin
      .right-block
        .language-selector
          select(@change='handleLanguageDropdownChange')
            option(
              v-for='lang in Object.keys(languages)',
              :key='lang',
              :value='lang'
              :selected='languages[lang].id === language.id'
            ) {{ languages[lang].name }}
        nav
          a(
            href='javascript:;'
            @click='handleNewClick'
            v-tooltip='"New"'
          )
            i.fa.fa-file-o
          router-link(
            to='/about'
            v-tooltip='"About"'
          )
            i.fa.fa-info-circle
          a(
            href='javascript:;'
            v-tooltip='"Save"'
          )
            i.fa.fa-floppy-o
    monaco-editor.editor(
      theme='vs-dark',
      :language='language.id'
      v-model='code'
      :options='editorOptions'
    )
</template>

<script>
import languages from 'lib/languages';
import MonacoEditor from 'vue-monaco';

export default {
  name: 'new-container',
  components: {
    'monaco-editor': MonacoEditor
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      language: languages.plain,
      code: '',
      editorOptions: {
        fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
        fontLigatures: true,
        lineHeight: 22
      }
    };
  },
  computed: {
    languages () {
      return languages;
    }
  },
  mounted () {
    if (this.id && this.id.length) {
      let idComponents = this.id.split('.');
      let key = null;
      let extension = null;

      if (idComponents.length > 1) {
        extension = idComponents.pop();
        key = idComponents.join(('.'));
      } else {
        key = this.id;
      }

      this.language = languages[extension] || 'plain';

      // fetch /api/:key
      console.log(`Will fetch ${key}`);
    }
  },
  methods: {
    handleLanguageDropdownChange (e) {
      this.language = languages[e.currentTarget.value];
    },
    handleNewClick () {
      if (this.$route.params && this.$route.params.length) {
        return this.$route.push('/');
      }

      this.code = '';
      this.language = languages.plain;
    }
  }
};
</script>
