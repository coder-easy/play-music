<template>
  <div class="pop-ups-wrapper" v-if="!username">
    <div class="pop-ups">
      <div>{{username}}</div>
      <div>请输入一个酷炫狂霸拽炸天的昵称~~~~</div>
      <input type="text" v-model="inputUserName" @keyup.enter="sureUserName">
      <button @click="sureUserName">确定</button>
    </div>
  </div>
</template>

<script setup>
  import useLocalStorage from '@/hooks/useLocalStorage';
  import { USERNAME } from '@/constants/keys';
  import { ref } from 'vue';

  const inputUserName = ref("");
  const username = useLocalStorage(USERNAME, "")

  function sureUserName () {
    username.value = inputUserName.value;
  }

</script>

<style scoped lang="scss">
.pop-ups-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 9;
}

</style>