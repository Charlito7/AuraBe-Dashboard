import { defineComponent } from "vue";
import axios from "axios";

// Define the interface for the Product object
interface Product {
  id: string;
  name: string;
  description: string;
  barCode: string;
  categoryName: string;
  expiredDate: string;
  quantity: number;
  price: number;
  minimumReorderQuantity: number;
}

export default defineComponent({
  name: "ProductsList",
  data() {
    return {
      products: [] as Product[], // Explicitly typing the products array as an array of Product objects
      productToDelete: null as Product | null, // To store the selected product for deletion
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    // Fetch product list from the backend
    async fetchProducts() {
      try {
        const response = await axios.post("http://localhost:5254/api/products/GetProductList");
        this.products = response.data.result;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
});
