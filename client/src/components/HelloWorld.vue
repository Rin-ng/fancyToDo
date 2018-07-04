<template>
  <div class="register" style="background-color:transparent">
    <div class="container" style="padding-left:5%;">
      <div class="row">
        <div class="col s10" style="margin:4.4%;">
          <form class="col s12">
            <h4 style="text-align:center"><b>Log In</b> </h4>
            <div class="row">
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="username" type="text" v-model="username" v-validate="'required'" name="username">
                <label for="username">Username</label>
                <span class="helper-text">{{ errors.first('username') }}</span>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="password" v-model="password" v-validate="'required'" type="password" name="password">
                <label for="password">Password</label>
                <span class="helper-text">{{ errors.first('password') }}</span>
              </div>
            </div>
            <a class="btn btn-block" style="width:100%; color:white" @click='login'>Sign In</a>
            <br>
             <div class="container" style="margin-bottom:66px; color:black">
              New User?<a href="#" style="color:blue" @click='goToRegister'> <b> Sign Up here.</b> </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Homepage',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login () {
      const UserData = {
        username: this.username,
        password: this.password,
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: UserData
      })
      .then((response) => {
        const token = response.data.token
        localStorage.setItem('token', token);
        this.$router.push('tasks')
        this.username = ''
        this.password = ''
      })
      .catch((err) => {
        console.log(err);
        location.reload(true);
      })  
    },
     goToRegister () {
      this.$router.push('register')
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
  text-align: center;
}
.navmedia{
  padding: 0 5 0 0;
  background-color: transparent;
  border: none;
  margin-bottom: 13%;
}

li{
  margin-right:10px;
}
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

.helper-text {
  color: red;
}
</style>
