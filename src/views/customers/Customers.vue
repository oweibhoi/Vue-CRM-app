<template>
  <h5>Customers</h5>
  <CustomerTable/>
</template>

<script>
import CustomerTable from '../datatables/CustomerTable.vue'; 

export default {
  components: {
    CustomerTable,
  }
};
</script>