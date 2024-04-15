<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios";

  axios.get("/adminAPI/user/home").then(res=>{
    console.log(res.data);
  })
</script>

<style scoped>

</style>
