<template>
  <div class="h-[700px] w-full">
    <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
      <template #cell(actions)="{ rowIndex }">
        <VaButton
          icon="check"
          color="success"
          size="small"
          v-if="!items[rowIndex].todos_id"
          @click="handleComplete(items[rowIndex].id)"
          >Mark as Complete</VaButton>
          <VaButton
          icon="check"
          size="small"
          v-if="items[rowIndex].todos_id"
          />
      </template>
    </VaDataTable>
  </div>
</template>

<script>
export default {
  props: ["prospectID"],
  data() {
    const items = [];

    const columns = [
      { key: "task" },
      { key: "status" },
      { key: "actions", width: 80 },
    ];

    return {
      items,
      columns,
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      this.items = [];
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("auth_token")
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(
        "http://127.0.0.1:8000/api/v1/todos/" + this.prospectID,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const data = result;
          data.forEach((item) => {
            this.items.push({
              id: item.id,
              task: item.name,
              todos_id: item.todos_id,
              status: item.todos_id ? "Completed" : "Ongoing",
            });
          });
        })
        .catch((error) => console.log("error", error));
    },
    handleComplete(id) {
      this.$vaModal
        .confirm({
          message: "Do you want to mark this as complete?",
          title: "Are you sure?",
          okText: "Yes",
          cancelText: "Cancel",
        })
        .then((ok) => {
          if (ok) {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
              "Authorization",
              "Bearer " + localStorage.getItem("auth_token")
            );

            var requestOptions = {
              method: "PUT",
              headers: myHeaders,
            };

            fetch(
              "http://127.0.0.1:8000/api/v1/complete-todo/" +
                id +
                "/" +
                this.prospectID,
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                if (result.success) {
                  this.$vaToast.init({
                    message: "Completed Successfully",
                    color: "success",
                  });
                  this.getTodos();
                } else {
                  this.$vaToast.init({
                    message: "Mark as Complete Failed!",
                    color: "danger",
                  });
                }
              })
              .catch((error) => console.log("error", error));
          }
        });
    },
  },
};
</script>
