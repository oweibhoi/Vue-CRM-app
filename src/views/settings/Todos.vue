<template>
    <div class="h-[700px] w-full">
      <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
        <template #cell(actions)="{ rowIndex }">
          <VaButton preset="plain" icon="visibility" @click="handleView(items[rowIndex].id)" />
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
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      const items = [];
  
      const columns = [
        { key: "id" },
        { key: "name" },
        { key: "actions", width: 80 },
      ];
  
      const links = {
        prev: "",
        first: "",
        next: "",
        last: "",
        current: "",
      };
  
      return {
        items,
        columns,
        links,
      };
    },
    mounted() {
      this.getAllTodos();
    },
    methods: {
      handleView(id) {
        this.$router.push({ name: "Prospect's Details", params: { id: id } });
      },
      handleDelete(item) {
        this.$vaModal
          .confirm("Are you sure you want to delete this prospect?")
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
                body: JSON.stringify({status: 0})
              };
  
              fetch("http://127.0.0.1:8000/api/v1/customer-status/"+item.id, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  this.$vaToast.init({ message: "Deleted Successfully", color: "success" });
                  this.getAllTodos();
                })
                .catch((error) => console.log("error", error));
            }
          });
      },
      getAllTodos() {
        this.items = [];
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("auth_token")
        );
  
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
  
        fetch("http://127.0.0.1:8000/api/v1/settingstodos", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            result.data.map((el) => {
              this.items.push({
                id: el.id,
                name: el.name,
              });
            });
  
            const links = result.links;
            this.links.prev = links.prev;
            this.links.first = links.first;
            this.links.next = links.next;
            this.links.last = links.last;
  
            // console.log(result);
          })
          .catch((error) => console.log("error", error));
      },
      getTodosLink(link) {
        if (!link) return;
        this.current = link;
        this.items = [];
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("auth_token")
        );
  
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
  
        fetch(link, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            result.data.map((el) => {
              this.items.push({
                id: el.id,
                name: el.name,
                email: el.email,
                phone: el.phone,
                postcode: el.postalCode,
              });
            });
            const links = result.links;
            this.links.prev = links.prev;
            this.links.first = links.first;
            this.links.next = links.next;
            this.links.last = links.last;
            // console.log(result);
          })
          .catch((error) => console.log("error", error));
      },
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .table-slots {
    background-color: var(--va-background-element);
    color: var(--va-on-background-element);
  }
  </style>
  