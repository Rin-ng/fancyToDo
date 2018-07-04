<template lang="html">
  <div>
    <div class="row">
      <div class="col s6 m4" style="text-align:center;" v-for='task in tasks'>
        <div class="card">
          <div class="card-content">
            <h5>Task : {{task.task}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (!localStorage.hasOwnProperty('token')) {
      this.$router.push('/')
    } else {
      this.getTasks()
    }
  },
  data () {
    return {
      tasks: null,
      completed: '',
      createdAt: '',
      updatedAt: ''
    }
  },
  methods: {
    getTasks () {
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/todo/',
        headers: {token: localStorage.getItem('token')}
      }).then(function(response){
       self.tasks = response.data.tasks
  
      }).catch(function(err){
        console.log(err);
      })
    }
  }
}
</script>