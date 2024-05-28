<template>
  <AddProspectModal></AddProspectModal>
  <ProspectTable />
</template>

<script>
import ProspectTable from "../datatables/ProspectTable.vue";
import AddProspectModal from "../modals/AddProspectModal.vue";

export default {
  components: {
    ProspectTable,
    AddProspectModal
  }
};
</script>
