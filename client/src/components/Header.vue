<template>
  <div class="header"  style="height:100%; width:100%;">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li style="margin-right:25px;" ><a>Add New Task</a></li>
          <li style="margin-right:25px;" v-if='checkStorage() == true' @click='logout'><a>Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.checkStorage()
  },
  data () {
    return {
      title: '',
      artist: '',
      file: null,
      songs: []
    }
  },
  methods: {
    checkStorage () {
      if (!localStorage.hasOwnProperty('token')) {
        return false
      } else {
        return true
      }
    },
    logout () {
      localStorage.clear();
      this.$router.push('/')
    },
    backToHome () {
      this.$router.push('tasks')
    }
  }
}
</script>
