<template>
  <div class="comp-language">
    <p class="language">Language:
      <a @click="showModal">{{languageData.data[languageData.language].label}}</a>
    </p>
    <Modal v-model="languageSelect" title="Language" @on-ok="setLanguage">
      <i-select v-model="language">
        <i-option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
      </i-select>
    </Modal>
  </div>
</template>

<script>
export default {
  computed: {
    languageData () {
      return this.$store.state.language
    }
  },
  data () {
    return {
      languageList: [{
        label: '简体中文',
        value: 'zh'
      }, {
        label: '繁體中文',
        value: 'zhs'
      }, {
        label: 'English',
        value: 'en'
      }],
      languageSelect: false,
      language: 'zh'
    }
  },
  methods: {
    setLanguage () {
      this.$store.commit('setLanguage', this.language)
      this.$cookies.set('language', this.language, '3y')
      this.$store.commit('setClientInfo', {
        name: this.languageData.data[this.language].Index.name,
        detail: this.languageData.data[this.language].Index.detail
      })
    },
    showModal () {
      this.init()
      this.languageSelect = true
    },
    init () {
      if (this.$cookies.isKey('language')) {
        this.language = this.$cookies.get('language')
        this.$store.commit('setLanguage', this.language)
      } else {
        this.language = this.languageData.language
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
.comp-language {
  .language {
    margin-top: 40px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 15px;
    a {
      color: #fff;
    }
  }
}
</style>
