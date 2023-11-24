<template>
  <td>
    {{ formatDate(date) }}
  </td>
</template>
<script setup>
import { useItemsStore } from '../store.js';
const store = useItemsStore();
const props = defineProps(['date']);

let today = Date.now();
// проверка закончился ли срок
function formatDate(date) {
  let start = parseDate(date[0].start_date);
  let text;
  if (start - today > 0) {
    text = beforeTerm(date);
  } else {
    text = remainingTerm(date);
  }
  toStore(text);
  return text;
}

// подсчёт оставшихся дней
function remainingTerm(date) {
  let end = parseDate(date[0].end_date);
  const halfDay = 1000 * 60 * 60 * 12;
  const oneDay = halfDay * 2;
  let leftInTime = end - today;
  let leftInDays = Math.round(leftInTime / oneDay) + 1;
  return formatEnd(leftInDays);
}

// вывод инфо о сроке, если он закончился
function formatEnd(leftInDays) {
  if (leftInDays < 0) {
    return `Закончилось ${-leftInDays} дней назад`;
  }
  if (leftInDays > 1) {
    return `Заканчивается через ${leftInDays} дней`;
  }
  switch (leftInDays) {
    case 0:
      return 'Заканчивается сегодня';
    case 1:
      return 'Закончится завтра';
  }
}

function toStore(text) {
  store.termsDesc.push(text);
}

function beforeTerm(date) {
  let start = parseDate(date[0].start_date);
  const oneDay = 1000 * 60 * 60 * 24;
  let beforeInTime = start - today;
  let beforeInDays = Math.round(beforeInTime / oneDay) + 1;
  return formatStart(beforeInDays);
}

function formatStart(days) {
  switch (days) {
    case 0:
      return 'Начнётся сегодня';
    case 1:
      return 'Начнётся завтра';
    default:
      return `Начнётся через ${days} дней`;
  }
}

function parseDate(date) {
  let dateParse = Date.parse(date);
  return dateParse;
}
</script>
