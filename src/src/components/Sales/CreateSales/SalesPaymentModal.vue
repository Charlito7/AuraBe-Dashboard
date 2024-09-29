<template>
  <div
    class="modal fade"
    id="salesPaymentModal"
    tabindex="-1"
    aria-labelledby="salesPaymentModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-rl modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="salesPaymentModalLabel">
            Payment Options
          </h5>
          <button
            type="button"
            class="btn-close p-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <img
              src="../../../assets/img/icons/close-circle-2.svg"
              alt="Close"
            />
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="row">
              <div class="col-3">Grand Total</div>
              <div class="col-3">5000</div>
            </div>
            <div class="row">
              <div class="col-3">Return</div>
              <div class="col-3">0</div>
            </div>
          </div>

          <div
          class="btn-wrapper d-flex justify-content-between align-items-center flex-wrap"
        >
          <button class="btn style-five" @click="showCashInputField">
            Cash
            <img src="../../../assets/img/icons/cards.svg" alt="Image" />
          </button>
          <button class="btn style-seven" @click="showMonCashInputField">
            Mon Cash
            <img src="../../../assets/img/icons/moneys.svg" alt="Image" />
          </button>
          <button class="btn style-eight" @click="showNatCashInputField">
            Nat Cash
            <img src="../../../assets/img/icons/paypal.svg" alt="Image" />
          </button>
          <button class="btn style-ten"  @click="showGiftInputField">
            Gift Card
            <img src="../../../assets/img/icons/money-2.svg" alt="Image" />
          </button>
        </div>

          <!-- Cash Input Field (Shown when Cash button is clicked) below the buttons -->
          <div v-if="showCashInput" class="d-flex align-items-center mb-3 mt-3">
            <label for="cashInput" class="form-label me-3" style="width: 150px;">Cash</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
          </div>
      <!-- Cash Input Field (Shown when Cash button is clicked) below the buttons -->
           <div v-if="showMonCashInput">
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Cash</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Mon Cash ID</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer name</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer ID</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>

          </div>
       <!-- Cash Input Field (Shown when Cash button is clicked) below the buttons -->
                <div v-if="showNatCashInput">
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Cash</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Nat Cash ID</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer name</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer ID</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>

          </div>
       <!-- Gift Input Field (Shown when Cash button is clicked) below the buttons -->
       <div v-if="showGiftInput">
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Gift code</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Cash Value</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer name</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>
            <div class="d-flex align-items-center mb-3 mt-3">
              <label for="cashInput" class="form-label me-3" style="width: 150px;">Customer ID</label>
            <input
              type="number"
              id="cashInput"
              class="form-control"
              v-model="cash"
              @input="calculateReturnCash"
              style="flex: 1;"
            />
            </div>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesPaymentModal",
  data() {
    return {
      grandTotal: 5000.00,  // Example grand total value
      cash: '',             // Cash input value
      returnCash: '',       // Return cash value
      showCashInput: false,
      showMonCashInput:false,
      showNatCashInput:false, 
      showGiftInput: false  // Controls visibility of cash input field
    };
  },
  methods: {
    showCashInputField() {
      this.showCashInput = !this.showCashInput; 
      this.showMonCashInput= false,
      this.showNatCashInput = false,
      this.showGiftInput = false // Show the cash input field
    },
    showMonCashInputField(){
      this.showMonCashInput = !this.showMonCashInput;
      this.showCashInput = false,
      this.showNatCashInput = false,
      this.showGiftInput = false
    },
    showNatCashInputField(){
      this.showNatCashInput = !this.showNatCashInput;
      this.showCashInput = false,
      this.showMonCashInput = false,
      this.showGiftInput = false
    },
    showGiftInputField(){
      this.showGiftInput = !this.showGiftInput;
      this.showNatCashInput = false;
      this.showCashInput = false,
      this.showMonCashInput = false
    },
    calculateReturnCash() {
      if (this.cash && this.cash >= this.grandTotal) {
        this.returnCash = (this.cash - this.grandTotal).toFixed(2);
      } else {
        this.returnCash = '';
      }
    }
  }
};
</script>
