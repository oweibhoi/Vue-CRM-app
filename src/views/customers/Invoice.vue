<template>
  <div class="h-[700px] w-full">
    <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ rowIndex }">
        <VaButton preset="plain" icon="visibility" />
        <VaButton preset="plain" icon="delete" class="ml-3" />
      </template>
    </VaDataTable>
  </div>
  <VaButtonGroup size="small">
    <VaButton @click="loadInvoices(links.first)">First</VaButton>
    <VaButton @click="loadInvoices(links.prev)">Prev</VaButton>
    <VaButton @click="loadInvoices(links.next)">Next</VaButton>
    <VaButton @click="loadInvoices(links.last)">Last</VaButton>
  </VaButtonGroup>
</template>

<script setup>
import { ref } from "vue";
import { BASE_URL } from "../../config";
import invoiceController from "../../controllers/invoiceController";
import { useToast, useModal } from "vuestic-ui";

import { useInvoiceStore } from "../../stores/InvoiceStore";

const props = defineProps(["customerID"]);

const columns = ref([
  { key: "id" },
  { key: "billed_date" },
  { key: "amount" },
  { key: "status" },
  { key: "actions", width: 80 },
]);

const invoices = useInvoiceStore();

invoices.clearInvoices();
invoices.fetchInvoices(
  BASE_URL + "invoices?customerId[eq]=" + props.customerID
);
const items = invoices.invoices;

// export default {
//   props: ['customerID'],
//   setup(props) {
//     const items = ref([]);
//     const columns = ref([
//       { key: "id" },
//       { key: "billed_date" },
//       { key: "amount" },
//       { key: "status" },
//       { key: "actions", width: 80 },
//     ]);
//     const links = ref({
//       prev: "",
//       first: "",
//       next: "",
//       last: "",
//     });

//     const { data, success, errorMsg, getInvoices } =
//       invoiceController();
//     const { init } = useToast();
//     const { confirm } = useModal();

//     const loadInvoices = async (url = null) => {
//       items.value = [];
//       url = url ? url : BASE_URL + "invoices?customerId[eq]="+props.customerID;
//       await getInvoices(url);
//       if (success.value) {
//         data.value.data.map((el) => {
//           items.value.push({
//             id: el.id,
//             billed_date: formatDatetime(el.billedDate),
//             amount: formatCurrency(el.amount),
//             status: formatInvoiceStatus(el.status),
//           });
//         });

//         links.value.prev = data.value.links.prev;
//         links.value.first = data.value.links.first;
//         links.value.next = data.value.links.next;
//         links.value.last = data.value.links.last;
//       } else {
//         init({
//           message: errorMsg.value,
//           color: "danger",
//         });
//       }
//     };

//     loadInvoices();

//     return { items, columns, links, loadInvoices };
//   },
// };
</script>

<style lang="scss" scoped>
.table-slots {
  background-color: var(--va-background-element);
  color: var(--va-on-background-element);
}
</style>
