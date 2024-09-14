<template>
  <MainHeader />
  <MainSidebar />
  <div class="main-content bg_gray d-flex flex-column transition overflow-hidden">
    <BreadcrumbMenu pageTitle="Create Sales" />
    <div class="row mb-40">
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Date</label>
          <input type="date" class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white" />
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Customer</label>
          <select class="bg-white border-0 rounded-1 fs-14 text-optional">
            <option value="0">John Victim</option>
            <option value="1">Tony Stark</option>
          </select>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Warehouse</label>
          <select class="bg-white border-0 rounded-1 fs-14 text-optional">
            <option value="0">Select Warehouse</option>
            <option value="1">Warehouse 01</option>
            <option value="2">Warehouse 02</option>
          </select>
        </div>
      </div>
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
                  DISCOUNT
                </th>
                <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                  TAX
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
                  $ {{ 0 }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  $ {{ 0 }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  $ {{ formatNumber(product.salesQuantity * product.price) }}
                </td>
                <td class="shadow-none lh-1 text-end pe-0">
                  <div class="button-group style-two ms-auto d-flex flex-wrap align-items-center">
                    <a class="delete-btn" data-bs-toggle="offcanvas" href="#deletePopup" role="button"
                      aria-controls="deletePopup">
                      <img src="../../assets/img/icons/close.svg" alt="Close Icon" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <SubmitPurchase />

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
import { defineComponent, ref } from "vue";
import axios from "axios";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import SubmitPurchase from "../../components/Sales/CreateSales/SubmitPurchase.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";


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

    const searchProduct = async () => {
      if (!barcode.value) {
        alert('Please enter a product code.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5254/api/products/GetProductByBarCode', {
          value: barcode.value
        });
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

    return {
      barcode,
      products,
      quantity,
      increment,
      decrement,
      searchProduct,
      formatNumber,
      onQuantityChange
    };
  }
});
</script>
