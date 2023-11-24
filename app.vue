<template>
  <div class="allStyle">
    <table class="lead-table" width="150%" cellpadding="5">
      <HeadTable></HeadTable>
      <OneRow v-for="(row, i) in store.info" :key="i" :row="row"> </OneRow>
    </table>
  </div>
</template>

<script setup>
import { useItemsStore } from './store';
const store = useItemsStore();
store.parseDates();
</script>

<style>
.allStyle {
  color: rgb(32, 32, 32);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: center;
}
.lead-table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  & td {
    border: 1px solid #8a8a8a;
    width: 100px;
  }
}
</style>
