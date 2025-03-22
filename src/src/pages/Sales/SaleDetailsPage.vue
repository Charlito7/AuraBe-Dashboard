<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <BreadcrumbMenu pageTitle="Sale Details" />
    <SaleDetailsTemp :saleDetails="selectedSale" />
    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>

  <div
    class="delete-popup offcanvas offcanvas-end border-0"
    tabindex="-1"
    id="deletePopup"
  >
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainHeader from "@/components/Layouts/MainHeader.vue"
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import SaleDetailsTemp from "../../components/Sales/SalesList/SaleDetailsTemp.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import { SalesMetadataAndProductResponseDTO } from "@/interfaces/interfaces/salesInterface";
import api from "@/services/api";
import { formatDateHT } from "@/useful/formatDate";


export default defineComponent({
  name: "SaleDetailsPage",
  components: {
    MainHeader,
    MainSidebar,
    BreadcrumbMenu,
    SaleDetailsTemp,
    MainFooter,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedSaleId: this.id,
      selectedSale: {} as SalesMetadataAndProductResponseDTO,
    };
  },
  watch: {
    id(newId) {
      this.selectedSaleId = newId;
      alert(this.selectedSaleId)
      this.fetchSaleDetails();
    },
  },
  async mounted() {
    await this.fetchSaleDetails();
  },
  methods: {
    async fetchSaleDetails() {
      try {
        const response = await api.post(`${process.env.VUE_APP_GET_SALES_DETAILS}=${this.selectedSaleId}`);
        if (response.data && response.data.result && response.data.result.length > 0) {
          this.selectedSale = response.data.result[0];
          this.selectedSale.transactionDate = formatDateHT(this.selectedSale.transactionDate)
        } else {
          this.selectedSale = {} as SalesMetadataAndProductResponseDTO;
        }
      } catch (error) {
        console.error("Error fetching sales ", error);
      }
    },
  },
  formatDateHT
});
</script>