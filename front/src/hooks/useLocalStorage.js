import { ref, watch } from 'vue';

export default function useLocalStorage(key, defaultValue) {
  const data = ref(defaultValue);

  if (defaultValue) {
    window.localStorage.setItem(key, defaultValue);
  } else {
    data.value = window.localStorage.getItem(key);
  }

  watch(data, () => {
    window.localStorage.setItem(key, data.value);
    console.log(data.value);
  })

  return data;
}
