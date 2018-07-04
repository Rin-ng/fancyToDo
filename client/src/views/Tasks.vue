<template>
  <div class="home">
      <Header/>
      <Tasks/>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'tasks',
  components: {
    Tasks,
    Header
  }
}
</script>

<style scoped>
</style>
