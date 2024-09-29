<template>
  <div
    class="modal fade"
    id="salesDiscountModal"
    tabindex="-1"
    aria-labelledby="salesDiscountModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-rl modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="salesDiscountModalLabel">
            Discount Details
          </h5>
          <button
            type="button"
            class="btn-close p-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <img
              src="../../../assets/img/icons/close-circle-2.svg"
              alt="Image"
            />
          </button>
        </div>
        <div class="modal-body">
          <div class="col-md-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Discount</label>
              <input
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                v-model="localDiscount"
                @input="emitDiscount"
                style="border: 1px solid #ccc;"
              />
              <span
                class="percent-sign position-absolute rounded-1 text-center d-flex flex-column justify-content-center fw-semibold fs-16">
                $
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer pt-20 pb-35">
          <a
            class="btn style-five upload-btn px-xxl-6 ms-auto"
            onclick="window.print();"
          >
            Print
            <img src="../../../assets/img/icons/download.svg" alt="Image" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "SalesDiscountModal",
  props: {
    discount: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const localDiscount = ref(props.discount);

    // Emit the updated discount value to the parent component
    const emitDiscount = () => {
      emit('update-discount', localDiscount.value);
    };

    // Watch for changes in the parent prop and update localDiscount
    watch(() => props.discount, (newDiscount) => {
      localDiscount.value = newDiscount;
    });

    return {
      localDiscount,
      emitDiscount
    };
  }
};
</script>
