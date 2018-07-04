<template>
  <div class="register" style="background-color:transparent">
    <div class="container" style="padding-left:5%;">
      <div class="row">
        <div class="col s10" style="margin:4.4%;">
          <form class="col s12">
            <h4 style="text-align:center"><b>Sign Up</b> </h4>
            <div class="row">
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="fullname" type="text" v-model="fullname" v-validate="'required'" name="fullname">
                <label for="fullname">Full Name</label>
                <span class="helper-text">{{ errors.first('fullname') }}</span>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="username" type="text" v-model="username" v-validate="'required'" name="username">
                <label for="username">Username</label>
                <span class="helper-text">{{ errors.first('username') }}</span>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="password" v-model="password" v-validate="'required|min:5|verify_password'" type="password" name="password">
                <label for="password">Password</label>
                <span class="helper-text">{{ errors.first('password') }}</span>
              </div>
            </div>
            <a class="btn btn-block" @click='signUp'>Sign Up</a>
            <br>
            <p>Already have an account? <a @click='backToHomepage' style="cursor: pointer;"><u>Sign In here</u></a> </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      fullname: '',
      username: '',
      password: ''
    }
  },
  methods: {
    signUp (event) {
      event.preventDefault()
      const newUser = {
        name: this.fullname,
        username: this.username,
        password: this.password
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: newUser
      }).then(response => {
        console.log('success register');
      }).catch(err => {
        console.log(err);
        console.log("hello")
      })
    },
    backToHomepage () {
      this.$router.push('/')
    }
  }
}
</script>
