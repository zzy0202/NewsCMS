import {ref, computed, reactive, toRefs} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore("user", () => {
  let localStorageUserInfo = localStorage.getItem("userInfo");
  let userInfo = localStorageUserInfo ? JSON.parse(localStorageUserInfo) : reactive({})

  function modifyUserInfo(value: object) {
    console.log(value)
    Object.assign(userInfo, {
      ...userInfo,
      ...value,
    })
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  return {userInfo, modifyUserInfo}
})
