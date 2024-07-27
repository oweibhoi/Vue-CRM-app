<template>
  <AddSettingsTodoModal :todos="items"/>
  <UpdateSettingsTodoModal
    :showUpdateModal="showUpdateModal"
    :updateID="updateID"
    @closed="closeUpdateModal()"
    :todos="items"
  />
  <div class="h-[700px] w-full">
    <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ rowIndex }">
        <VaButton
          preset="plain"
          icon="edit"
          @click="handleEdit(items[rowIndex].id, !showUpdateModal)"
        />
        <VaButton
          preset="plain"
          icon="delete"
          @click="handleDelete(items[rowIndex])"
          class="ml-3"
        />
      </template>
    </VaDataTable>
  </div>
  <VaButtonGroup size="small" class="mt-3">
    <VaButton @click="getTodosLink(links.first)">First</VaButton>
    <VaButton @click="getTodosLink(links.prev)">Prev</VaButton>
    <VaButton @click="getTodosLink(links.next)">Next</VaButton>
    <VaButton @click="getTodosLink(links.last)" id="btn-record-last"
      >Last</VaButton
    >
  </VaButtonGroup>
</template>

<script>
import { ref } from "vue";
import AddSettingsTodoModal from "../modals/AddSettingsTodoModal.vue";
import UpdateSettingsTodoModal from "../modals/UpdateSettingsTodoModal.vue";
import settingsTodoController from "../../controllers/settingsTodoController";
import { useToast, useModal } from "vuestic-ui";

export default {
  components: {
    AddSettingsTodoModal,
    UpdateSettingsTodoModal,
  },
  setup() {
    const items = ref([]);
    const columns = ref([
      { key: "id" },
      { key: "name" },
      { key: "actions", width: 80 },
    ]);
    const links = ref({
      prev: "",
      first: "",
      next: "",
      last: "",
      current: "",
    });

    //for update..
    const showUpdateModal = ref(false);
    const updateID = ref(0);

    const { init } = useToast();
    const { getTodos, data, errorMsg, deleteTodo } = settingsTodoController();
    const { confirm } = useModal();

    const loadTodo = async (
      url = "http://127.0.0.1:8000/api/v1/settings-todos"
    ) => {
      if (url) {
        items.value = [];
        await getTodos(url);
        const todoData = data.value.data;
        todoData.map((item) => {
          items.value.push(item);
        });
        links.value.prev = data.value.links.prev;
        links.value.first = data.value.links.first;
        links.value.next = data.value.links.next;
        links.value.last = data.value.links.last;
      }
    };

    loadTodo();

    const getTodosLink = (url) => {
      loadTodo(url);
    };

    const handleEdit = (id, modalState) => {
      updateID.value = id;
      showUpdateModal.value = modalState;
    };

    const closeUpdateModal = () => {
      showUpdateModal.value = false;
    };

    const handleDelete = (item) => {
      confirm({
        message: "Do you want to delete this todo?",
        title: "Are you sure?",
        okText: "Yes",
        cancelText: "Cancel",
      }).then((result) => {
        if (result) {
          handleDeleteTodo(item);
        }
      });
    };

    const handleDeleteTodo = async (item) => {
      await deleteTodo("http://127.0.0.1:8000/api/v1/todos-status/" + item.id);
      if (data.value.success) {
        init({
          message: "Deleted Successfully",
          color: "success",
        });
        items.value = items.value.filter((row) => row.id != item.id);
      } else {
        init({
          message: errorMsg.value,
          color: "danger",
        });
      }
    };

    return {
      items,
      columns,
      links,
      showUpdateModal,
      updateID,
      getTodosLink,
      handleEdit,
      closeUpdateModal,
      handleDelete,
      loadTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-slots {
  background-color: var(--va-background-element);
  color: var(--va-on-background-element);
}
</style>
