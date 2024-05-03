<template>
    <div :class="{ 'slide': isSlided }" class="container">
        <div class="box signin">
            <h2>Already Have An Account ?</h2>
            <button class="btn-signin" @click="toggleSlide(false)">Sign In</button>
        </div>
        <div class="box signup">
            <h2>Don't Have An Account ?</h2>
            <button class="btn-signup" @click="toggleSlide(true)">Sign Up</button>
        </div>
        <div class="formBox" :class="{ 'slide': isSlided }">
            <div class="form signin">
                <form @submit.prevent="loginUser">
                    <h3>Sign In</h3>
                    <input type="text" v-model="loginForm.email" placeholder="Email" required>
                    <input type="password" v-model="loginForm.password" placeholder="Password" required>
                    <input type="submit" value="Login">
                    <a href="#" class="forgot">Forgot Password</a>
                </form>
            </div>
            <div class="form signup">
                <form @submit.prevent="registerUser">
                    <h3>Sign Up</h3>
                    <input type="text" v-model="registerForm.email" placeholder="Email" required>
                    <input type="password" v-model="registerForm.password" placeholder="Password" required>
                    <input type="submit" value="Register">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isSlided: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['login', 'register']),
    toggleSlide(isSlide) {
      this.isSlided = isSlide;
    }, 
    loginUser() {
      let user = {
        email: this.loginForm.email,
        password: this.loginForm.password
      };
      console.log(this.loginForm);
      this.login(user)
        .then(() => {
          this.$router.push('/home');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerUser() {
      console.log(this.registerForm);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
*
body, html {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c7056;
}
.container {
    position: relative;
    width: 800px;
    height: 400px;
    margin-top: 20vh;
    background-color: rgba(0, 0, 0, 0.125);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}
.container .box {
    position: relative;
    width: 50%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;
}
.container .box h2 {
    font-size: 1.2em;
    color: #ebf4f3;
    font-weight: 500;
    margin-bottom: 10px;
}
.container .box button {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #ebf4f3;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    border: none;
    outline: none;
    border-radius: 2px;
}
.formBox {
    position: absolute;
    left: 0px;
    width: 400px;
    height: 400px;
    background-color: #ebf4f3;
    z-index: 1000;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
    transition: 0.5s ease-in-out;
    transition-delay: 0.25s;
    overflow: hidden;
    border-radius: 2px;
}
.slide .formBox {
    left: 400px;
}
.formBox .form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s;
    background-color: #ebf4f3;
}
.formBox .form.signup {
    top: 100%;
    transition-delay: 0s;
}
.slide .formBox .form.signup {
    top: 0;
    transition-delay: 1s;
}
.formBox .form.signin {
    top: 0;
    transition-delay: 1s;
}
.slide .formBox .form.signin {
    top: -100%;
    transition-delay: 0s;
}
.formBox .form form {
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    width: 100%;
}
.formBox .form form h3 {
    font-size: 1.4em;
    color: #333;
    margin-bottom: 20px;
    font-weight: 600;
}
.formBox .form form input {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    outline: none;
    font-size: 0.8em;
    border: 1px solid #333;
}
.formBox .form form input[type="submit"] {
    background-color: #2c7056;
    border: none;
    border-radius: 2px;
    color: #ebf4f3;
    max-width: 100px;
    font-weight: 500;
    cursor: pointer;
}
.formBox .form form input[type="submit"]:hover {
    background-color: #8cc9a5;
}
.formBox .signup form input[type="submit"] {
    background-color: #2c7056;
}
.formBox .signup form input[type="submit"]:hover {
    background-color: #8cc9a5;
}
.forgot {
    margin-top: 10px;
    text-align: right;
    font-size: 0.8em;
    color: #333;
}
</style>