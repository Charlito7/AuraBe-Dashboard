<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <StatusContent />
          <div class="card border-0 rounded-1 mb-20">
        <div class="card-body p-xl-40">
          <h6 class="card-title fw-semiBold fs-18 mb-30">
            Sales report 
          </h6>
          <ThisWeeksSalesPurchasesChart />
        </div>
      </div>
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
import ThisWeeksSalesPurchasesChart from "../../components/Dashboard/ThisWeeksSalesPurchasesChart.vue";

export default defineComponent({
  name: "DashboardPage",
  components: {
    MainHeader,
    MainSidebar,
    StatusContent,
    ThisWeeksSalesPurchasesChart,
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