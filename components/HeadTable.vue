<template>
  <thead>
    <tr>
      <td
        v-for="title in store.titles"
        :key="i"
        @click="store.sortCheck(title)"
      >
        {{ title.head }}
      </td>
    </tr>
    <tr></tr>
  </thead>
</template>

<script setup>
import { useItemsStore } from '../store.js';
const store = useItemsStore();
</script>

<style module>
thead td:nth-child(1) {
  width: 35px;
}
thead td:nth-child(6) {
  width: 120px;
}
thead td:nth-child(10),
thead td:nth-child(11) {
  width: 130px;
}
thead {
  border-collapse: collapse;
  border: 1px solid #8a8a8a;
  font-size: 16px;
  color: rgb(8, 8, 8);

  & td {
    border: 1px solid #8a8a8a;
    background-color: #f2de94;
    text-align: center;
    padding: 5px;
  }
}
</style>
