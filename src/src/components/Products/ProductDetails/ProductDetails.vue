<template>
  <div class="card border-0 shadow-none rounded-1 mb-40">
    <div class="card-body p-xl-60">
      <div v-if="product" class="row gx-xxl-6">
        <div class="col-xl-4 col-lg-5 pe-xxl-1">
          <div class="single-product-img">
            <img :src="product.imageUrl" alt="Product" />
          </div>
        </div>
        <div class="col-xl-8 col-lg-7 ps-xxl-6">
          <table class="table single-product-table mb-60">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Single</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Product Code</th>
                <td>{{ product.barCode }}</td> <!-- Use camelCase for barCode -->
              </tr>
              <tr>
                <th scope="row">Product Name</th>
                <td>{{ product.name }}</td> <!-- Use camelCase for name -->
              </tr>
              <tr>
                <th scope="row">Category</th>
                <td>{{ product.categoryName }}</td> <!-- Use camelCase for categoryName -->
              </tr>
              <tr>
                <th scope="row">Brand</th>
                <td>{{ product.brand }}</td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>{{ product.price }}</td> <!-- Use camelCase for price -->
              </tr>
              <tr>
                <th scope="row">Product Quantity</th>
                <td>{{ product.quantity }}</td> <!-- Use camelCase for quantity -->
              </tr>
              <tr>
                <th scope="row">Stock Alert</th>
                <td>{{ product.minimumReorderQuantity }}</td> <!-- Use camelCase for minimumReorderQuantity -->
              </tr>
              <tr>
                <th scope="row">Expiry Date</th>
                <td>{{ product.expiredDate }}</td> <!-- Use camelCase for expiredDate -->
              </tr>
              <tr>
                <th scope="row">Notes</th>
                <td>{{ product.description }}</td> <!-- Use camelCase for description -->
              </tr>
              <!-- Additional product details here -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ProductDetails.ts"></script>
