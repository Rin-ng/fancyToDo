<template>
  <div class="header"  style="height:100%; width:100%;">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="modal-trigger" data-target="modal1" style="margin-right:25px;" v-if=''><a>Add New Task</a></li>
          <li style="margin-right:25px;" @click='' v-if='checkStorage() == true' @click='logout'><a>Logout</a></li>
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

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #dfe6e9;
}
nav {
    -webkit-transform: none;
    transform: none;
    text-align: left;
    background-color: #2d3436;
    font-family: sans-serif;
    padding-left: 15px;
}

.modal {
width: 40%;
height: 100%;
margin-top: 0px;
padding: 0 0 0 0;
}

h5
{
font-weight: 400;
}

.container{
margin: 0 0 0 0;
width: 100%;
height: 100%;
}

.tabs .indicator
{
background-color: #1e2121;
opacity: 0.3;
}

.form-container
{
padding: 40px;
padding-top: 10px;
}

.confirmation-tabs-btn
{
position: absolute;
}
</style>
