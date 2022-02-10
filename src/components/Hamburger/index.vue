<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    icon: function () {
      return this.$store.getters.sidebarOpened
        ? 'hamburger-opened'
        : 'hamburger-closed'
    }
  },
  methods: {
    toggleClick() {
      this.$store.commit('app/triggerSidebarOpened')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
