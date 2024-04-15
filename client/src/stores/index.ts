import {ref, computed, reactive, toRefs} from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore("user",()=>{
  let userInfo = reactive({});
  function modifyUserInfo(value:object) {
    console.log(value)
    Object.assign(userInfo,{
      ...userInfo,
      ...value,
    })
    console.log(userInfo);
  }
  return {userInfo, modifyUserInfo}
})
