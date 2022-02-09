<template>
  <div>
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
    <svg-icon v-else :icon="icon"></svg-icon>
    <span>{{ generateTitle(title) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  methods: {
    generateTitle(title) {
      return this.$i18n.t('route.' + title)
    }
  }
}
</script>
