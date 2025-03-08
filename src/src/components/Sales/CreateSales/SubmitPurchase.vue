<template>
  <div class="row mb-40">

    <div class="col-xxl-10 col-lg-8 pe-xxl-8">
      <div class="card border-0 rounded-1">
        <form class="p-4" @submit.prevent="submitSales">
          <h6 class="fs-18 mb-35 text-title fw-semibold">
            Payment Infos
          </h6>
          <!-- Discount Field -->
          <div class="row mb-3 align-items-center">
            <div class="col-4">
              <label for="discount" class="form-label">Discount</label>
            </div>
            <div class="col-8">
              <input 
      type="number" 
      v-model.number="submitPurchaseResume.discount" 
      class="form-control" 
      id="discount" 
      name="discount" 
      :class="{'is-invalid': cashError}"
      @input="validatePositiveField('discount')"
      placeholder="Enter discount"
    >
    <span v-if="cashError" class="text-danger small">Discount cannot be negative.</span>
            </div>
          </div>


          <!-- Method of Payment Field -->
          <div class="row mb-3 align-items-center">
            <div class="col-4">
              <label for="methodOfPayment" class="form-label">Method of Payment</label>
            </div>
            <div class="col-8">
              <select class="form-select" id="methodOfPayment" name="methodOfPayment" v-model="methodOfPayment">
                <option value="Cash">Cash</option>
                <option value="MonCash">MonCash</option>
                <option value="NatCash">NatCash</option>
              </select>
            </div>
          </div>

          <!-- Additional Fields for NatCash or MonCash -->
          <div v-if="methodOfPayment === 'MonCash' || methodOfPayment === 'NatCash'">
            <div class="row mb-3 align-items-center">
              <div class="col-4">
                <label for="customerId" class="form-label">Customer ID</label>
              </div>
              <div class="col-8">
                <input type="text" v-model="submitPurchaseResume.customerID" class="form-control" id="customerId"
                  name="customerId" placeholder="Enter Customer ID">
              </div>
            </div>

            <div class="row mb-3 align-items-center">
              <div class="col-4">
                <label for="customerName" class="form-label">Customer Name</label>
              </div>
              <div class="col-8">
                <input type="text" v-model="submitPurchaseResume.customerName" class="form-control" id="customerName"
                  name="customerName" placeholder="Enter Customer Name">
              </div>
            </div>
          </div>

          <!-- Amount Field -->
  
<div class="row mb-3 align-items-center">
  <div class="col-4">
    <label for="amount" class="form-label">Amount</label>
  </div>
  <div class="col-8">
    <input 
      type="number" 
      v-model.number="submitPurchaseResume.cash" 
      class="form-control" 
      id="amount" 
      name="amount" 
      :class="{'is-invalid': cashError}"
      @input="validatePositiveField('cash')"
      placeholder="Enter amount"
    >
    <span v-if="cashError" class="text-danger small">Cash amount cannot be negative.</span>
  </div>
</div>


        </form>
      </div>
    </div>

    <div class="col-xxl-2 col-lg-4">
      <div class="card border-0 rounded-1 w-xxl-5 pt-12 pb-12 mb-md-25">
        <h6 class="fs-18 mb-35 text-title fw-semibold p-4 pb-0">
          Payment summary
        </h6>
        <table class="table style-two">
          <tbody>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">TOTAL :</th>
              <td class="fs-14 fw-bold lh-1 text-purple text-end">
                ${{ total.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">DISCOUNT :</th>
              <td class="fs-14 fw-semibold lh-1 text-optional text-end">
                ${{ submitPurchaseResume.discount }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">SHIPPING :</th>
              <td class="fs-14 fw-semibold lh-1 text-optional text-end">
                ${{ submitPurchaseResume.shippingCost }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">GRAND TOTAL :</th>
              <td class="fs-14 fw-bold lh-1 text-purple text-end">
                ${{ grandTotal.toFixed(2) }}
              </td>
            </tr>
            <!-- New Return Field -->
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">Cash :</th>
              <td class="fs-14 fw-semibold lh-1 text-optional text-end">
                ${{ cash }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">RETURN :</th>
              <td class="fs-14 fw-bold lh-1 text-purple text-end">
                ${{ returnAmount.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-xl-4">
      <button 
      v-if="returnAmount >= 0" 
      @click.prevent="submitSales"
        class="btn style-one d-inline-block transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 mb-20">
        Submit Sales
      </button>
    </div>

  </div>

  <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header" :class="modalStatus === 'success' ? 'bg-success text-white' : 'bg-danger text-white'">
        <h5 class="modal-title">{{ modalStatus === 'success' ? 'Success' : 'Error' }}</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <p v-if="modalStatus === 'success'">
          Sales submitted successfully! Redirecting in <strong>{{ countdown }}</strong> seconds...
        </p>
        <p v-else>Failed to submit sales data. Please try again.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="redirectToSalesList">
          Go to Sales List Now
        </button>
      </div>
    </div>
  </div>
</div>
<!-- Backdrop for modal -->
<div v-if="showModal" class="modal-backdrop fade show"></div>

<!-- Backdrop for modal -->
<div v-if="showModal" class="modal-backdrop fade show"></div>

    
    <!-- Backdrop for modal -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
 
</template>

<script lang="ts">
import { ref, computed, watch, PropType } from 'vue';
import SalesShippingModal from './SalesShippingModal.vue';
import api from '@/services/api';
import router from '@/router';

interface SubmitPurchase {
  discount: number;
  shippingCost: number;
  grandTotal: number;
  notes: string;
  shippingAddress: string;
  recipientContact: string;
  recipientName: string;
  deliveryCode: string;
  delivery: string;
  cash: number;
  returnAmount: number;
  customerID: string;
  customerName: string;
}

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

interface SalesMetadata {
  discount: number;
  notes: string;
  cashReceived: number;
  paymentType: string;
  paymentCustomerName: string;
  paymentTypeTransactionID: string;
}

interface ProductSale {
  productCode: string;
  productName: string;
  unitCost: number;
  quantity: number;
  discount: number;
}

interface SalesData {
  salesMetadata: SalesMetadata;
  productSales: ProductSale[];
}
export default {
  name: "SubmitPurchase",
  components: {
    SalesShippingModal
  },
  props: {
    totalCost: {
      type: Number,
      required: true,
    },
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    }
  },
  setup(props: any) {
    const submitPurchaseResume = ref<SubmitPurchase>({
      discount: 0.00,
      shippingCost: 0.00,
      grandTotal: 0.00,
      notes: "",
      shippingAddress: "",
      recipientContact: "",
      recipientName: '',
      deliveryCode: "",
      delivery: "standard",
      cash: 0.00,
      returnAmount: 0.00,
      customerID: "",
      customerName: ""
    });
  
    const cashError = ref(false);


    const countdown = ref(5); // Start countdown from 5
    let countdownInterval: ReturnType<typeof setInterval> | null = null;
const validatePositiveField = (field: "cash" | "discount") => {
  if (submitPurchaseResume.value[field] < 0) {
    cashError.value = true;
    submitPurchaseResume.value[field] = 0; // Reset field to 0
  } else {
    cashError.value = false;
  }
};
    const methodOfPayment = ref("Cash");
    const showModal = ref(false);
    const modalStatus = ref<'success' | 'failed'>('success');
    const total = computed(() => {
      return props.totalCost;
    });
    const grandTotal = computed(() => {
      return props.totalCost + submitPurchaseResume.value.shippingCost - submitPurchaseResume.value.discount;
    });
    const cash = computed(() => {
      return submitPurchaseResume.value.cash;
    });

    const returnAmount = computed(() => {
      return cash.value - grandTotal.value; // Return is cash minus grand total
    });

    // Watch the grandTotal and check if it's negative
    watch(grandTotal, (newVal) => {
      if (newVal < 0) {
        submitPurchaseResume.value.discount = 0; // Reset discount to 0
        cashError.value = true;
      }else{
        cashError.value = false;
      }
    });

    watch(() => submitPurchaseResume.value.discount, (newVal) => {
      if (newVal < 0 || typeof newVal === "string") {
        submitPurchaseResume.value.discount = 0; // Reset discount to 0
        cashError.value = true;
      }else{
        cashError.value = false;
      }
    });

    watch(() => submitPurchaseResume.value.cash, (newVal) => {
      if (newVal < 0 || typeof newVal === "string") {
        submitPurchaseResume.value.cash = 0; // Reset cash to 0
        cashError.value = true;
      }else{
        cashError.value = false;
      }
    });
    // Method to update the discount from the modal
    const updateDiscount = (newDiscount: number) => {
      submitPurchaseResume.value.discount = newDiscount;
    };


    const updateShippingInfo = (shippingInfo: {
      shippingCost: number;
      shippingAddress: string;
      recipientContact: string;
      recipientName: string;
      delivery: string;
    }) => {
      submitPurchaseResume.value.shippingCost = shippingInfo.shippingCost;
      submitPurchaseResume.value.shippingAddress = shippingInfo.shippingAddress;
      submitPurchaseResume.value.recipientContact = shippingInfo.recipientContact;
      submitPurchaseResume.value.recipientName = shippingInfo.recipientName;
      submitPurchaseResume.value.delivery = shippingInfo.delivery;
    };

  // Redirect to sales list
const redirectToSalesList = () => {
  if (countdownInterval) clearInterval(countdownInterval); // Clear interval
  showModal.value = false;
  router.push('/sales-list');
};

// Close modal manually (without redirect)
const closeModal = () => {
  if (countdownInterval) clearInterval(countdownInterval); // Clear interval
  showModal.value = false;
};
    const submitSales = async () => {
      const salesData: SalesData = {
        salesMetadata: {
          discount: submitPurchaseResume.value.discount,
          notes: submitPurchaseResume.value.notes,
          cashReceived: submitPurchaseResume.value.cash,
          paymentType: methodOfPayment.value,
          paymentCustomerName: submitPurchaseResume.value.customerName,
          paymentTypeTransactionID: submitPurchaseResume.value.customerID,
        },
        productSales: props.products.map((product: Product) => ({
          productCode: product.barCode,
          productName: product.name,
          unitCost: product.price,
          quantity: product.salesQuantity,
          discount: 0,
        })),
      };

      try {
        const response = await api.post('/api/sales/CreateSales', salesData);

        if (!response) {
          throw new Error("Failed to submit sales data");
        }
        modalStatus.value = "success";
        showModal.value = true;
        countdown.value = 5;
        
    // Start countdown
    countdownInterval = setInterval(() => {
      if (countdown.value > 1) {
        countdown.value--;
      } else {
        clearInterval(countdownInterval!);
        redirectToSalesList();
      }
    }, 1000);


      } catch (error) {
        modalStatus.value = "failed"; // Set failed state
        showModal.value = true;
      }
    };


    return {
      submitPurchaseResume,
      grandTotal,
      total,
      cash,
      returnAmount,
      updateDiscount,
      updateShippingInfo,
      methodOfPayment,
      submitSales,
      showModal,
      modalStatus,
      cashError,
      validatePositiveField,
      closeModal,
      redirectToSalesList,
      countdown
    };
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>