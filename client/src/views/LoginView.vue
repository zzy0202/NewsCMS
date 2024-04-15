<template>
  <div class="loginMain">
    <div class="modal">
      <h2 class="title">Login</h2>
      <div class="username">
        <span>Username: </span>
        <input name="username" v-model="user.username" type="text" placeholder="username">
      </div>
      <div class="password">
        <span>Password: </span>
        <input name="password" v-model="user.password" type="password" placeholder="password">
      </div>
      <div class="loginButton" @click="login">Login</div>
      <h4 class="errorMessage">{{errorMessage}}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores";

let router = useRouter();
let user = reactive({
  username: "",
  password: "",
})
let errorMessage = ref("");

async function login() {
  let result = await axios.post("/adminAPI/user/login", {
    username: user.username,
    password: user.password,
  })
  if (result.data.status) {
    let userStore = useUserStore();
    userStore.modifyUserInfo(result.data.userInfo);
    console.log(userStore.userInfo);
    await router.push({
      path: "/"
    })
  } else {
    errorMessage.value = result.data.msg
  }
}
</script>

<style scoped lang="less">
.loginMain {
  background-image: url("/images/login/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 40%;
  height: 30%;
  background-color: pink;
  opacity: 0.75;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 20px;
  }

  div {
    margin-top: 4%;

    span {
      min-width: 5rem;
      display: inline-block;
    }
  }

  .loginButton {
    background-color: lightsalmon;
    padding: 5px 10px;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      color: cornflowerblue;
    }
  }
  .errorMessage {
    margin-top: 10px;
    font-weight: bold;
    color: red;
  }
}
</style>
