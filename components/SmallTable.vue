<template>
  <td>
    <slot name="fill">
      <tr v-for="item in smallItem" class="smallStyle">
        {{
          item
        }}
      </tr>
    </slot>
  </td>
</template>

<script setup>
const props = defineProps(['smallItem']);
</script>

<style scoped>
tr {
  height: 25px;
}
</style>
