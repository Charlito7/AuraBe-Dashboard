<template>
  <form action="#" class="pb-60" @submit.prevent="submitProduct">
    <!-- Bootstrap Alert for Success or Error -->
    <!-- Bootstrap Alert for Success or Error -->
    <div v-if="alertMessage" :class="`alert alert-${alertType} alert-dismissible fade show`" role="alert">
      {{ alertMessage }}
      <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
    </div>

    <div class="row">
      <div class="col-xxl-12 col-xl-12 col-lg-12 pe-xxl-12 mb-md-25">
        <div class="row gx-xxl-6">
          <!-- Form Fields -->
          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Product Name</label>
              <input
                v-model="productName"
                type="text"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Enter Product Name"
                required
              />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Product Number (Barcode)</label>
              <input
                v-model="productNumber"
                type="text"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Scan Code"
                required
              />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Category</label>
              <select
                v-model="selectedCategory"
                class="bg-white border-0 rounded-1 fs-14 text-optional"
              >
                <option value="0">Choose Category</option>
                <option
                  v-for="category in categories"
                  :key="category.name"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Product Price</label>
              <input
                v-model="productPrice"
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Enter Product Price"
                required
              />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Product Quantity</label>
              <input
                v-model="productQuantity"
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="01"
                required
              />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Stock Alert (Reorder Quantity)</label>
              <input
                v-model="minimumReorderQuantity"
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Expiry Date</label>
              <input
                v-model="expiryDate"
                type="date"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                required
              />
            </div>
          </div>
          <!-- Is Return Accepted Field -->
          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Is Return Accepted</label>
              <select
                v-model="isReturnAccepted"
                class="bg-white border-0 rounded-1 fs-14 text-optional"
                required
              >
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>

          <!-- Return Time Accepted Field -->
          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Return Time Accepted (Hours)</label>
              <input
                v-model="returnTimeAccepted"
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Enter Return Time in Hours"
                min="0"
                required
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Notes</label>
              <textarea
                v-model="productDescription"
                cols="30"
                rows="10"
                placeholder="Add a note"
                class="d-block w-100 bg-white border-0 rounded-1 resize-none fs-14 text-title"
              ></textarea>
            </div>
          </div>

          <div class="col-12">
            <button
              class="btn style-one transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Submit Product
            </button>
          </div>
        </div>
      </div>

     <!--
 <div class="col-xxl-3 col-xl-4 col-lg-4">
        <AddImages />
      </div>
      -->
    </div>
  </form>
</template>
<script lang="ts" src="./CreateProducts.ts"></script>