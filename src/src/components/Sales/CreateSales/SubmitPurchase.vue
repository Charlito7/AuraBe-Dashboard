<template>
  <div class="row mb-40">
    <div class="col-xxl-10 col-lg-8 pe-xxl-8">
      <div class="col-xxl-10 col-lg-8 pe-xxl-8">
        <!-- Buttons for opening modals -->
        <div class="d-flex justify-content-between" style="gap: 15px;">
          <div class="col-md-4">
            <a href="javascript:void(0)" title="View" data-bs-toggle="modal" data-bs-target="#salesDiscountModal"
              class="btn btn-primary w-100 mb-3"
              style="background-color: #007bff; color: white; text-decoration: none;">
              <i class="fas fa-tag"></i>
              DISCOUNT
            </a>
          </div>
          <div class="col-md-4">
            <a href="javascript:void(0)" title="View" data-bs-toggle="modal" data-bs-target="#salesPaymentModal"
              class="btn btn-success w-100 mb-3"
              style="background-color: #28a745; color: white; text-decoration: none;">
              <i class="fas fa-credit-card"></i> PAYMENT
            </a>
          </div>
          <div class="col-md-4">
            <a href="javascript:void(0)" title="View" data-bs-toggle="modal" data-bs-target="#salesShippingModal"
              class="btn btn-info w-100 mb-3"
              style="background-color: #17a2b8; color: white; text-decoration: none;">
              <i class="fas fa-shipping-fast"></i> SHIPPING
            </a>
          </div>
        </div>
      </div>
    </div>


    <div class="col-xxl-2 col-lg-4">
      <div class="card border-0 rounded-1 w-xxl-5 pt-12 pb-12 mb-md-25">
        <table class="table style-two">
          <tbody>
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

    <div class="col-12">
      <div class="form-group mb-25">
        <label class="d-block fs-14 text-black mb-2">Notes</label>
        <textarea cols="30" rows="10" placeholder="Add a note"
          class="d-block w-100 bg-white border-0 rounded-1 resize-none fs-14 text-title"
          v-model="submitPurchaseResume.notes"></textarea>
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
  <SalesDiscountModal
      :discount="submitPurchaseResume.discount"
      @update-discount="updateDiscount"
    />
    <SalesShippingModal
      :shippingCost="submitPurchaseResume.shippingCost"
      :shippingAddress="submitPurchaseResume.shippingAddress"
      :recipientContact="submitPurchaseResume.recipientContact"
      :recipientName="submitPurchaseResume.recipientName"
      :delivery="submitPurchaseResume.delivery"
      @update-shipping-info="updateShippingInfo"
    />
  <SalesPaymentModal />

</template>

<script lang="ts">
import { ref, computed, watch } from 'vue';
import SalesDiscountModal from './SalesDiscountModal.vue';
import SalesPaymentModal from './SalesPaymentModal.vue';
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
    SalesDiscountModal,
    SalesPaymentModal,
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

    const cash = ref(0.00); // New cash input

    const grandTotal = computed(() => {
      return props.totalCost + submitPurchaseResume.value.shippingCost - submitPurchaseResume.value.discount;
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
      cash,
      returnAmount,
      updateDiscount,
      updateShippingInfo
    };
  },
};
</script>