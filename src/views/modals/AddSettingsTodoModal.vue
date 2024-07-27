<template>
  <div class="float-right mb-1">
    <VaButton icon="add" color="primary" @click="showModal = !showModal">
      Add Todo
    </VaButton>
  </div>
  <VaModal
    v-model="showModal"
    ok-text="Save"
    @Ok="handleSave()"
    size="large"
    max-width="100%"
  >
    <h3 class="va-h6">Add Todo</h3>
    <VaForm class="mb-2 flex flex-col gap-4">
      <VaAlert
        color="#fdeae7"
        text-color="#940909"
        v-if="errorMsg"
        v-html="errorMsg"
      >
      </VaAlert>
      <VaInput v-model="name" label="Todo Name" />
      <VaRadio
        v-model="type"
        :options="[
          {
            text: 'Prospects',
            type: 'P',
          },
          {
            text: 'Customers',
            type: 'C',
          },
        ]"
        value-by="type"
      />
    </VaForm>
  </VaModal>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vuestic-ui";
import settingsTodoController from "../../controllers/settingsTodoController";

export default {
  props: ['todos'],
  setup(props) {
    const { init } = useToast();
    const showModal = ref(false);
    const name = ref(null);
    const type = ref(null);

    const { data, errorMsg, addTodo } = settingsTodoController();

    const handleSave = async () => {
      await addTodo("http://127.0.0.1:8000/api/v1/settings-todos", {
        name: name.value,
        type: type.value,
      });
      if (errorMsg.value) {
        showModal.value = true;
        init({ message: "Saved Failed", color: "danger" });
      } else {
        init({ message: "Saved Successfully", color: "success" });
        props.todos.push(data.value.data);
        clearAddTodoForm();
      }
    };

    const clearAddTodoForm = () => {
      name.value = null;
      type.value = null;
    };

    return { showModal, name, type, errorMsg, handleSave };
  },
};
</script>
