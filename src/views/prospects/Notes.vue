<template>
  <div class="mt-4">
    <VaInput
      v-model="notes"
      label="Enter your notes here"
      class="w-10/12 p-2"
    />
    <VaButton @click="handleSaveNote()">Add Notes</VaButton>
  </div>
  <div class="h-[700px] w-full">
    <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ rowIndex }">
        <VaButton
          icon="check"
          color="success"
          size="small"
          v-if="!items[rowIndex].todos_id"
          @click="handleComplete(items[rowIndex].id)"
          >Mark as Complete</VaButton
        >
        <VaButton icon="check" size="small" v-if="items[rowIndex].todos_id" />
      </template>
    </VaDataTable>
  </div>
</template>

<script>
import { ref } from "vue";
import notesController from "../../controllers/notesController";
import { formatDatetime } from "../../helper.js";
import { useToast, useModal } from "vuestic-ui";

export default {
  props: ["prospectID"],
  setup(props) {
    const items = ref([]);
    const columns = [{ key: "created_date" }, { key: "notes" }];
    const notes = ref("");

    const { data, errorMsg, success, getNotes, insertNote } = notesController();
    const { init } = useToast();

    const loadData = async () => {
      await getNotes(props.prospectID);
      data.value.map((item) => {
        items.value.push({
          created_date: formatDatetime(item.created_at),
          notes: item.notes,
        });
      });
    };
    loadData();

    const handleSaveNote = async () => {
      if (!notes.value) {
        init({
          message: "Please enter notes",
          color: "warning",
        });
        return;
      }

      await insertNote(notes.value, props.prospectID);
      if (success.value) {
        init({
          message: "Added Successfully",
          color: "success",
        });
        items.value.unshift({
          created_date: formatDatetime(new Date()),
          notes: data.value.notes,
        });
        notes.value = "";
      } else {
        init({
          message: errorMsg.value,
          color: "danger",
        });
      }
    };

    return { items, columns, notes, handleSaveNote };
  },
};
</script>
