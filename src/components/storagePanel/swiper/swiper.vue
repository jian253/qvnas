<template>
  <div class="swiper">
    <div v-for="(item) in 2" :key="item">
      <div v-show="item==currents">
        <slot :info="item">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
    },
    data () {
      return {
        initial: 0,
        currents: 1
      }
    },
    methods: {
      add () {
        this.currents++
      },
      reduce () {
        this.currents--
      }
    }
  }
</script>

<style scoped>
  .StorageSwiper {
    padding: 10px 50px;
  }
</style>
