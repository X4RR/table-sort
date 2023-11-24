<template>
  <tr class="oneRowStyle">
    <td>
      {{ row.o_id }}
    </td>
    <td>
      {{ row.client_name }}
    </td>
    <SmallTable :smallItem="row.diets"> </SmallTable>
    <SmallTable :smallItem="row.tariff"> </SmallTable>
    <td>
      {{ row.address }}
    </td>
    <td>
      {{ row.phone }}
    </td>
    <td>
      <table class="smallStyle">
        <SmallTable :smallItem="row.dates">
          <template #fill>
            <tr v-for="date in row.dates" class="smallTR">
              {{
                niceDate(date.start_date)
              }}
              -
              {{
                niceDate(date.end_date)
              }}
            </tr>
          </template>
        </SmallTable>
      </table>
    </td>
    <td>
      {{ row.discount }}
    </td>
    <td>
      {{ row.order_sum }}
      {{ row.pay_status }}
      {{ row.order_payed }}
    </td>

    <td>
      {{ row.courier_comment }}
    </td>
    <td>
      {{ row.inner_comment }}
    </td>
    <td>
      {{ row.parsedDate }}
    </td>
  </tr>
</template>

<script setup>
const props = defineProps(['row']);
function niceDate(term) {
  let dateParse = new Date(Date.parse(term));
  let dateReady = dateParse.toLocaleDateString('ru', {
    month: 'long',
    day: 'numeric',
  });
  return dateReady;
}
</script>

<style>
.smallStyle td {
  border: none !important;
}
.smallTR {
  height: 45px;
  border: 2px solid red;
}
</style>
