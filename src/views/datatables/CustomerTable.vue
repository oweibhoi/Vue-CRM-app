<template>
  <div class="h-[700px] w-full">
    <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ rowIndex }">
        <VaButton
          preset="plain"
          @click="handleView(items[rowIndex].id)"
          icon="visibility"
        />
        <VaButton
          preset="plain"
          @click="handleDelete(items[rowIndex].id)"
          icon="delete"
          class="ml-3"
        />
      </template>
    </VaDataTable>
  </div>
  <VaButtonGroup size="small">
    <VaButton @click="loadCustomers(links.first)">First</VaButton>
    <VaButton @click="loadCustomers(links.prev)">Prev</VaButton>
    <VaButton @click="loadCustomers(links.next)">Next</VaButton>
    <VaButton @click="loadCustomers(links.last)">Last</VaButton>
  </VaButtonGroup>
</template>

<script>
import { ref } from "vue";
import { BASE_URL } from "../../config";
import customerController from "../../controllers/customerController";
import { useToast, useModal } from "vuestic-ui";
import { useRouter } from "vue-router";

export default {
  setup() {
    const items = ref([]);
    const columns = ref([
      { key: "id" },
      { key: "name" },
      { key: "email" },
      { key: "phone" },
      { key: "postcode" },
      { key: "actions", width: 80 },
    ]);
    const links = ref({
      prev: "",
      first: "",
      next: "",
      last: "",
    });

    const { data, success, errorMsg, getCustomers, deleteCustomer } =
      customerController();
    const { init } = useToast();
    const { confirm } = useModal();
    const router = useRouter();

    const loadCustomers = async (url = null) => {
      items.value = [];
      url = url ? url : BASE_URL + "customers";
      await getCustomers(url);
      if (success.value) {
        data.value.data.map((el) => {
          items.value.push({
            id: el.id,
            name: el.name,
            email: el.email,
            phone: el.phone,
            postcode: el.postalCode,
          });
        });

        links.value.prev = data.value.links.prev;
        links.value.first = data.value.links.first;
        links.value.next = data.value.links.next;
        links.value.last = data.value.links.last;
      } else {
        init({
          message: errorMsg.value,
          color: "danger",
        });
      }
    };

    loadCustomers();

    const handleDelete = async (id) => {
      confirm({
        message: "Do you want to delete this customer?",
        title: "Are you sure?",
        okText: "Yes",
        cancelText: "Cancel",
      }).then((result) => {
        if (result) {
          deleteCustomer(id);
          if (success.value) {
            init({
              message: "Deleted Successfully",
              color: "success",
            });
            items.value = items.value.filter((item) => item.id != id);
          } else {
            init({
              message: errorMsg.value,
              color: "danger",
            });
          }
        }
      });
    };

    const handleView = (id) => {
      router.push({ name: "Customer's Details", params: { id: id } });
    };

    return { items, columns, links, loadCustomers, handleDelete, handleView };
  },
};
</script>

<style lang="scss" scoped>
.table-slots {
  background-color: var(--va-background-element);
  color: var(--va-on-background-element);
}
</style>
