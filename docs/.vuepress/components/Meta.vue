<template>
  <div class="meta" id="global-Vilikes">
<!--    <span>阅读次数：{{ visitNum }}</span>-->
  </div>
</template>

<script>

export default {
  name: 'Meta',
  data() {
    return {
      visitNum: 0
    }
  },
  mounted() {
    ViLike.get(this.$page.path, (visit, like, islike) => {
      // 访问量
      this.visitNum = visit
    });
  },
  computed: {
    lastUpdated() {
      return this.$page.lastUpdated || 'None'
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    /*layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }*/

  },

}
</script>
<style>
.meta {
  display: none;
  font-size: 14px;
}
</style>
