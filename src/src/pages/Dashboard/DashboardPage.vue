<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <StatusContent />
    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import StatusContent from "../../components/Dashboard/StatusContent.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";

export default defineComponent({
  name: "DashboardPage",
  components: {
    MainHeader,
    MainSidebar,
    StatusContent,
    MainFooter,
  },
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin: 0 -10px;
  .card {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>