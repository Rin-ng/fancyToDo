<template lang="html">
  <div class="music">
    
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

<style scoped>
.music{
  background-color: #eceff1;
}
.modal {
width: 80%;
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
/* position: */
}

.confirmation-tabs-btn
{
position: absolute;
}
</style>
