<template>
  <div class="row mb-40">
    <div class="col-xxl-10 col-lg-8 pe-xxl-8">
  <div class="card border-0 rounded-1 w-xxl-5 pt-12 pb-12 mb-md-25">
    <form class="p-4">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
          Payment Infos
        </h6>
      <!-- Discount Field -->
      <div class="row mb-3 align-items-center">
        <div class="col-4">
          <label for="discount" class="form-label">Discount</label>
        </div>
        <div class="col-8">
          <input type="number" 
            min="0" 
            v-model.number="submitPurchaseResume.discount" 
            class="form-control" id="discount" 
            name="discount" 
            placeholder="Enter discount"
            >
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
                <input type="text" class="form-control" id="customerId" name="customerId" placeholder="Enter Customer ID" >
              </div>
            </div>

            <div class="row mb-3 align-items-center">
              <div class="col-4">
                <label for="customerName" class="form-label">Customer Name</label>
              </div>
              <div class="col-8">
                <input type="text" class="form-control" id="customerName" name="customerName" placeholder="Enter Customer Name">
              </div>
            </div>
          </div>

      <!-- Amount Field -->
      <div class="row mb-3 align-items-center">
        <div class="col-4">
          <label for="amount" class="form-label">Amount</label>
        </div>
        <div class="col-8">
          <input type="number"  
            v-model.number="submitPurchaseResume.cash"  
            class="form-control" 
            id="amount" 
            name="amount" 
            :placeholder="submitPurchaseResume.cash === 0 ? 'Enter amount' : ''"
            >
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
        class="btn style-one d-inline-block transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 mb-20"
        type="submit">
        Submit Sales
      </button>
    </div>

  </div>

</template>

<script lang="ts">
import { ref, computed, watch } from 'vue';
import SalesShippingModal from './SalesShippingModal.vue';

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
      type: Array,
      required: true,
    },
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
      returnAmount: 0.00
    });

    //const cash = ref(0.00); // New cash input
    const methodOfPayment = ref("Cash");
    const total = props.totalCost;
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
        alert('Grand total is negative. Discount has been reset to 0.');
      }
    });

    watch(() => submitPurchaseResume.value.discount, (newVal) => {   
  if (newVal < 0 || typeof newVal === "string") {
    submitPurchaseResume.value.discount = 0; // Reset discount to 0
    alert('Discount cannot be negative. It has been reset to 0.');
  }
});

watch(() => submitPurchaseResume.value.cash, (newVal) => {
  if (newVal < 0 || typeof newVal === "string") {
    submitPurchaseResume.value.cash = 0; // Reset cash to 0
    alert('Cash amount cannot be negative. It has been reset to 0.');
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

    return {
      submitPurchaseResume,
      grandTotal,
      total,
      cash,
      returnAmount,
      updateDiscount,
      updateShippingInfo,
      methodOfPayment
    };
  },
};
</script>