<template>
  <MainHeader />
  <MainSidebar />
  <div class="main-content bg_gray d-flex flex-column transition overflow-hidden">
    <BreadcrumbMenu pageTitle="Create Sales" />

    <div class="row mb-40">
      <div class="col-12">
        <div class="form-group">
          <label class="d-block fs-14 text-black mb-2">Choose Product</label>
          <div class="search-area style-two position-relative w-100">
            <input type="text" placeholder="Scan / Search product by code"
              class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white" v-model="barcode"
              @keydown.enter="searchProduct" />
            <button type="submit" class="bg-transparent border-0 position-absolute top-0 end-0 h-100 pt-0 py-0 px-2"
              @click="searchProduct">
              <img src="../../assets/img/icons/search.svg" alt="Search Icon" />
            </button>
            <!-- Suggestions Dropdown -->
  <ul v-if="suggestions.length" class="suggestions-dropdown">
    <li v-for="product in suggestions" :key="product.suggestion" @click="selectProduct(product)">
      {{ product.suggestion }}
    </li>
  </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-none rounded-1 mb-30">
      <div class="card-body p-xl-40">
        <h6 class="fs-18 mb-35 text-title fw-semibold">
          Selected Products For Sales
        </h6>
        <div class="table-responsive">
          <table class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
                  PRODUCT
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  CODE
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  UNIT COST
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  STOCK
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  QUANTITY
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  SUBTOTAL
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1 text-end pe-0">
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="products.length === 0">
                <td colspan="9" class="text-center fs-14">
                  No products are selected yet
                </td>
              </tr>
              <tr v-for="product in products" :key="product.id">
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
                  {{ product.name }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{ product.barCode }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  $ {{ product.price }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  <span class="badge badge-success fw-semibold fs-14">
                    {{ product.quantity }}
                  </span>
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  <div class="v-counter style-two">
                    <button class="plusBtn" @click="decrement(product)"></button>
                    <input type="text" size="25" v-model.number="product.salesQuantity" :max="product.quantity"
                      class="count" @change="onQuantityChange(product)" />
                    <button class="minusBtn" @click="increment(product)"></button>
                  </div>
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  $ {{ formatNumber(product.salesQuantity * product.price) }}
                </td>
                <td class="shadow-none lh-1 text-end pe-0">
                  <div class="button-group style-two ms-auto d-flex flex-wrap align-items-center">
                    <a class="delete-btn" data-bs-toggle="offcanvas" href="#deletePopup" role="button"
                      aria-controls="deletePopup">
                      <img src="../../assets/img/icons/close.svg" alt="Close Icon" @click="deleteProduct(product)" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>

    <SubmitPurchase v-if="products.length > 0" :totalCost="totalCost" :products="products" />

    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>

  <div class="delete-popup offcanvas offcanvas-end border-0" tabindex="-1" id="deletePopup">
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../assets/img/icons/tick-circle.svg" alt="Tick Icon" />
        <span class="text-white fw-medium">
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import axios from "axios";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import SubmitPurchase from "../../components/Sales/CreateSales/SubmitPurchase.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import { debounce } from "lodash";
import api from "@/services/api";


// Define the Product interface
interface Product {
  id: string;
  name: string; // Name is required, based on the validation attribute in your C# class
  description: string;
  barCode?: string; // Optional field, represented with ?
  categoryName?: string; // Optional field, represented with ?
  expiredDate: Date;
  quantity: number;
  price: number;
  minimumReorderQuantity: number;
  salesQuantity: number;
}
interface SuggestionsResponse{
  suggestion: string
}
export default defineComponent({
  name: "CreateSalesPage",
  components: {
    MainHeader,
    MainSidebar,
    BreadcrumbMenu,
    SubmitPurchase,
    MainFooter,
  },
  setup() {
    const barcode = ref('');
    const products = ref<Product[]>([]); // Define an array to store products
    const suggestions = ref<SuggestionsResponse[]>([]); // Store product suggestions
    const loadingSuggestions = ref(false);

     // Function to fetch product suggestions
    const fetchSuggestions = async (searchTerm: string) => {
      if (!searchTerm) {
        suggestions.value = [];
        return;
      }

      try {
        loadingSuggestions.value = true;
        const response = await api.post(`/api/products/suggestions/get?userInput=${searchTerm}`);
        suggestions.value = response.data; 
      } catch (error) {
        console.error("Error fetching suggestions:", error);
       suggestions.value = [];

      } finally {
        loadingSuggestions.value = false;
      }
    };

    // Debounced version of fetchSuggestions
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

    // Watch for changes in barcode input
    watch(barcode, (newVal) => {
      debouncedFetchSuggestions(newVal);
    });

    // Function to handle product selection from suggestions
    const selectProduct = async (suggestion: SuggestionsResponse) => {
      barcode.value = suggestion.suggestion.split(' - ')[1];
      suggestions.value = []; 
     await searchProduct();
    };
   
    const searchProduct = async () => {
      if (!barcode.value) {
        alert('Please enter a product code.');
        return;
      }

      try {
        const response = await api.post('/api/products/GetProductByBarCode', {
          value: barcode.value
        });
        //remove the value on Search bar
        barcode.value = '';
        const existingProduct = products.value.find(p => p.barCode === response.data.result.barCode);

        if (existingProduct) {
          if (existingProduct.salesQuantity < existingProduct.quantity) {
            existingProduct.salesQuantity += 1; // Increment salesQuantity if product exists
          } else {
            alert("Cannot add more than the existing quantity")
          }

        } else {
          products.value.push({
            ...response.data.result,
            salesQuantity: 1 // Set default to 1 if undefined or null
          });
        }


      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Product not found.');
      }
    };

    const quantity = ref(1);

    const increment = (product: Product) => {

      if (product.salesQuantity < product.quantity) {
        product.salesQuantity++;
      } else {
        alert("Cannot add more than the existing quantity")
      }
    };

    const decrement = (product: Product) => {
      if (product.salesQuantity > 1) {
        product.salesQuantity--;
      }
    };
    const formatNumber = (num: number) => {
      return num.toFixed(2);
    };
    const onQuantityChange = (product: Product) => {
      // Ensure the entered quantity is within the allowable stock range
      if (product.salesQuantity > product.quantity) {
        alert("Quantity exceeds available stock.");
        product.salesQuantity = product.quantity; // Reset to max quantity
      } else if (product.salesQuantity < 1) {
        alert("Quantity cannot be less than 1.");
        product.salesQuantity = 1; // Reset to minimum quantity
      }

      // Additional logic for quantity change can be added here
    };

    const deleteProduct = (product: Product) => {
      // Find the index of the product in the array
      const index = products.value.findIndex(p => p.id === product.id);

      // If the product is found, remove it from the array
      if (index !== -1) {
        products.value.splice(index, 1);
      }
    };

    const totalCost = computed(() => {
      return products.value.reduce((acc, product) => {
        return acc + product.salesQuantity * product.price;
      }, 0);
    });

    // Get today's date in the format DD-MM-YYYY
  

    // Function to format the date as DD-MM-YYYY
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    const todayDate = ref(formatDate(new Date()));
    const editDate = () => {
      // Your logic for enabling editing the date or any custom functionality
      alert("Only admin can change the date")
    };
    return {
      barcode,
      products,
      quantity,
      totalCost,
      todayDate,
      suggestions,
      loadingSuggestions,
      selectProduct,
      increment,
      decrement,
      searchProduct,
      formatNumber,
      onQuantityChange,
      deleteProduct,
      editDate
    };
  }
});
</script>

<style scoped>
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions-dropdown li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestions-dropdown li:hover {
  background: #f0f0f0;
}
</style>
