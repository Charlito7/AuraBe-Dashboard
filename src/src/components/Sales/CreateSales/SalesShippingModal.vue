<template>
  <div class="modal fade" id="salesShippingModal" tabindex="-1" aria-labelledby="salesShippingModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-rl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="salesShippingModalLabel">
            Shipping Details
          </h5>
          <button type="button" class="btn-close p-0" data-bs-dismiss="modal" aria-label="Close">
            <img src="../../../assets/img/icons/close-circle-2.svg" alt="Image" />
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-dollar-sign icon-blue"></i> Shipping Cost
                </label>
                <input type="number" class="custom-input" v-model="localShippingCost" @input="emitChanges" />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-map-marker-alt icon-blue"></i> Shipping Address
                </label>
                <input type="text" class="custom-input" v-model="localShippingAddress" placeholder="Enter Shipping Address" @input="emitChanges" required />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-user icon-blue"></i> Recipient Name
                </label>
                <input type="text" class="custom-input" v-model="localRecipientName" placeholder="Enter Recipient Name" @input="emitChanges" required />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-phone icon-blue"></i> Recipient Contact
                </label>
                <input type="tel" class="custom-input" v-model="localRecipientContact" placeholder="Enter Recipient Contact" @input="emitChanges" required />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-barcode icon-blue"></i> Delivery Code
                </label>
                <input type="text" class="custom-input" v-model="localDeliveryCode" placeholder="Enter Delivery Code" @input="emitChanges" required />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-25">
                <label class="d-block fs-14 text-black mb-2">
                  <i class="fas fa-truck icon-blue"></i> Delivery
                </label>
                <select class="custom-input" v-model="localDelivery" @change="emitChanges">
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer pt-20 pb-35">
          <a class="btn style-five upload-btn px-xxl-6 ms-auto" onclick="window.print();">
            Print<img src="../../../assets/img/icons/download.svg" alt="Image" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "SalesShippingModal",
  props: {
    shippingCost: Number,
    shippingAddress: String,
    recipientName: String,
    recipientContact: String,
    deliveryCode: String,
    delivery: String
  },
  setup(props, { emit }) {
    const localShippingCost = ref(props.shippingCost);
    const localShippingAddress = ref(props.shippingAddress);
    const localRecipientName = ref(props.recipientName);
    const localRecipientContact = ref(props.recipientContact);
    const localDeliveryCode = ref(props.deliveryCode);
    const localDelivery = ref(props.delivery);

    const emitChanges = () => {
      emit('update-shipping-info', {
        shippingCost: localShippingCost.value,
        shippingAddress: localShippingAddress.value,
        recipientName: localRecipientName.value,
        recipientContact: localRecipientContact.value,
        deliveryCode: localDeliveryCode.value,
        delivery: localDelivery.value
      });
    };

    // Watch for props changes and update local values
    watch(
      () => [props.shippingCost, props.shippingAddress, props.recipientName, props.recipientContact, props.deliveryCode, props.delivery],
      ([newShippingCost, newShippingAddress, newRecipientName, newRecipientContact, newDeliveryCode, newDelivery]) => {
        localShippingCost.value = newShippingCost;
        localShippingAddress.value = newShippingAddress;
        localRecipientName.value = newRecipientName;
        localRecipientContact.value = newRecipientContact;
        localDeliveryCode.value = newDeliveryCode;
        localDelivery.value = newDelivery;
      }
    );

    return {
      localShippingCost,
      localShippingAddress,
      localRecipientName,
      localRecipientContact,
      localDeliveryCode,
      localDelivery,
      emitChanges
    };
  }
};
</script>

<style scoped>
.icon-blue {
  color: #007bff;
}

.custom-input {
  border: 2px solid #007bff;
  border-radius: 100px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
