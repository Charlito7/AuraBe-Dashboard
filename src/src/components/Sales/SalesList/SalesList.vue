<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive style-three">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">DATE</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">SELLER</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">CUSTOMER</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">STATUS</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">TOTAL AMOUNT</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">PAYMENT TYPE</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in sales" :key="sale.id">
              <td class="shadow-none text-black">{{ formatDateHT(sale.transactionDate)}}</td>
              <td class="shadow-none">{{ sale.sellerFullName }}</td>
              <td class="shadow-none">{{ sale.paymentCustomerName || 'N/A' }}</td>
              <td class="shadow-none">
                <button :class="sale.status || 'PendingDelivery'">
                {{ sale.status || 'N/A' }}
                </button>
              </td>
              <td class="shadow-none">
                ${{ sale.totalAmount ? sale.totalAmount.toFixed(2) : '0.00' }}</td>
                <td class="shadow-none">
                  <button :class="sale.paymentType">
  {{ sale.paymentType || 'N/A' }}
</button>
</td>
              <td class="shadow-none text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center">
                  <router-link :to="{ name: 'SaleDetailsPage', params: { id: sale.id} }" title="View" class="me-2">
                    <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="row pb-45 align-items-center">
    <div class="col-sm-6">
      <div class="d-flex align-items-center page-unit">
        <span class="fs-13">Showing sales per page</span>
        <select v-model="pageSize" @change="changePageSize" class="text-title border-0 fs-14 bg-transparent">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
    <div class="col-sm-6 text-sm-end text-center">
      <ul class="page-nav list-style">
        <li>
          <a @click="previousPage" :disabled="currentPage === 1">
            <img src="../../../assets/img/icons/left-arrow-purple.svg" alt="Previous" />
          </a>
        </li>
        <li v-for="page in visiblePages" :key="page">
          <a @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</a>
        </li>
        <li>
          <a @click="nextPage" :disabled="currentPage === totalPages">
            <img src="../../../assets/img/icons/right-arrow-purple.svg" alt="Next" />
          </a>
        </li>
      </ul>
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDateHT } from "@/useful/formatDate";
import api from "@/services/api";
import { SalesMetadataAndProductResponseDTO } from "@/interfaces/interfaces/salesInterface";
import router from "@/router";

interface Sale {
  id: string;
  transactionDate: string;
  sellerFullName: string;
  paymentCustomerName?: string;
  status: string;
  totalAmount: number;
  paymentType: string;
}


export default defineComponent({
  name: "SalesList",
  data() {
    return {
      sales: [] as Sale[],
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      visiblePages: [] as number[],
      pagesToShow: 5,
      selectedSaleId: '',
      selectedSale: {} as SalesMetadataAndProductResponseDTO,
    };
  },
  mounted() {
    this.fetchSales();
  },

  methods: {
    async fetchSales() {
      try {
        const response = await api.post(
          `${process.env.VUE_APP_GET_SALES_LIST_PAGINATION}?page=${this.currentPage}&pageSize=${this.pageSize}`
        );
        this.sales = response.data.result.sales;
        this.totalPages = response.data.result.pagination.totalPages;
        this.setVisiblePages();
      } catch {
        console.error("Error fetching sales");
      }
    },
    setVisiblePages() {
      const start = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
      const end = Math.min(this.totalPages, start + this.pagesToShow - 1);
      this.visiblePages = [];
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    },
    goToPage(page: number) {
      this.currentPage = page;
      this.fetchSales();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchSales();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchSales();
      }
    },
    changePageSize() {
      this.currentPage = 1;
      this.fetchSales();
    },
    viewSale(saleId: string) {
      router.push({
  path: process.env.VUE_APP_SALE_DETAILS_PAGE,
  query: { id: saleId } // Pass only the ID as a query parameter
});
    },
    deleteSale(id: string) {
    },
formatDateHT
  },
});
</script>

<style scoped>
.Cash, .DELIVERED{
  background-color: #22c55e; 
    color: #ffffff; 
    padding-left: 0.5rem; 
    padding-right: 0.5rem; 
    border-radius: 1rem;
    border: none; 
    outline: none;
}
.MonCash{
  background-color: #a30e0e; 
    color: #ffffff; 
    padding-left: 0.5rem; 
    padding-right: 0.5rem; 
    border-radius: 1rem;
    border: none; 
    outline: none;
}
.NatCash{
  background-color: #5008cb; 
    color: #ffffff; 
    padding-left: 0.5rem; 
    padding-right: 0.5rem; 
    border-radius: 1rem;
    border: none; 
    outline: none;
}

</style>