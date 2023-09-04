<template>
  <va-data-table :items="items" :columns="columns">
    <template #colgroup>
      <col span="5" />
      <col class="table-slots" />
    </template>
  </va-data-table>
  <button @click="get_prospects(links.prev)">Prev</button>
  <button @click="get_prospects(links.first)">First</button>
  <button @click="get_prospects(links.next)">Next</button>
  <button @click="get_prospects(links.last)">Last</button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [];

    const columns = [
      { key: "id" },
      { key: "name" },
      { key: "email" },
      { key: "postcode" },
    ];

    const links = {
      prev: "",
      first: "",
      next: "",
      last: "",
    };

    return {
      items,
      columns,
      links,
    };
  },
  mounted() {
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

    fetch("http://127.0.0.1:8000/api/v1/customers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.data.map((el) => {
          this.items.push({
            id: el.id,
            name: el.name,
            email: el.email,
            postcode: el.postalCode,
          });
        });

        const links = result.links;
        this.links.prev = links.prev;
        this.links.first = links.first;
        this.links.next = links.next;
        this.links.last = links.last;

        console.log(result);
      })
      .catch((error) => console.log("error", error));
  },
  methods: {
    get_prospects(link) {
      if (!link) return;
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
              postcode: el.postalCode,
            });
          });
          const links = result.links;
          this.links.prev = links.prev;
          this.links.first = links.first;
          this.links.next = links.next;
          this.links.last = links.last;
          console.log(result);
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
