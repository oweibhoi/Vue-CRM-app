import { defineStore } from "pinia";
import { ref } from "vue";
import invoiceController from "../controllers/invoiceController";
import { formatDatetime, formatCurrency, formatInvoiceStatus } from "../helper";

export const useInvoiceStore = defineStore("invoiceStore", () => {
  const invoices = ref([]);
  const { data, getInvoices } = invoiceController();

  async function fetchInvoices(url) {
    await getInvoices(url);
    data.value.data.map((el) => {
      invoices.value.push({
        id: el.id,
        billed_date: formatDatetime(el.billedDate),
        amount: formatCurrency(el.amount),
        status: formatInvoiceStatus(el.status),
      });
    });
  }

  function clearInvoices() {
    invoices.value = [];
  }

  return { invoices, fetchInvoices, clearInvoices };
});
