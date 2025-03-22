import { defineComponent } from "vue";
import axios from "axios";
import api from "@/services/api";

// Define the structure of the Product interface
interface Product {
  id: string;
  name: string;
  barCode: string;
  categoryName: string;
  price: number;
  quantity: number;
}

export default defineComponent({
  name: "ProductsList",
  data() {
    return {
      products: [] as Product[], // Explicitly type products as an array of Product objects
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      visiblePages: [] as number[], // Array to store the visible page numbers
      pagesToShow: 5, // Number of pages to show at a time
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.post(
          `${process.env.VUE_APP_GET_PRODUCTS_LIST_PAGINATION}?page=${this.currentPage}&pageSize=${this.pageSize}`
        );
        this.products = response.data.result.products;
        this.totalPages = response.data.result.pagination.totalPages; // Set total pages based on response
        this.setVisiblePages(); // Calculate visible pages after fetching the data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    setVisiblePages() {
      // Calculate the range of pages to show dynamically based on the currentPage
      const start = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
      const end = Math.min(this.totalPages, start + this.pagesToShow - 1);

      this.visiblePages = [];
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    },
    goToPage(page: number) {
      this.currentPage = page;
      this.fetchProducts();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.setVisiblePages();
        this.fetchProducts();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.setVisiblePages();
        this.fetchProducts();
      }
    },
    changePageSize() {
      this.currentPage = 1; // Reset to the first page when page size changes
      this.fetchProducts();
    },
  },
});
