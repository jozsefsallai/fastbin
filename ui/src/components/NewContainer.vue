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
            @click='handleCreateClick'
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
import Toaster from 'lib/toaster';
import handleKey from 'lib/handleKey';
import MonacoEditor from 'vue-monaco';

export default {
  name: 'new-container',
  components: {
    'monaco-editor': MonacoEditor
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
    if (this.$route.params && this.$route.params.key) {
      const { key, extension } = handleKey(this.$route.params.key);
      this.language = languages[extension] || languages.plain;

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
  },
  methods: {
    handleLanguageDropdownChange (e) {
      this.language = languages[e.currentTarget.value];
    },
    newDocument () {
      if (this.$route.params && this.$route.params.length) {
        return this.$route.push('/');
      }

      this.code = '';
      this.language = languages.plain;
    },
    handleNewClick () {
      if (!this.code || (this.code && confirm('This will overwrite your changes. Are you sure?'))) {
        this.newDocument();
      }
    },
    handleCreateClick () {
      let suffix = this.language === languages.plain ? '' : `.${this.language.extension}`;

      return fetch('/documents', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
        credentials: 'same-origin',
        body: this.code
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            Toaster.create('success', 'File created successfully!', 'Woohoo!');
            this.$router.push(`/${json.key}${suffix}`)
          } else {
            if (json.error) {
              Toaster.create('danger', json.error, 'Error!');
            } else {
              Toaster.create('danger', 'Something bad happened.', 'Uh-oh!');
            }
          }
        })
        .catch(err => {
          Toaster.create('danger', 'Something bad happened.', 'Uh-oh!');
          throw new Error(err);
        });
    }
  }
};
</script>
