<template>
    <div class="container mt-5">
      <div class="card shadow-lg">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="text-title">Sales Details</h5>
          <button class="btn-close" @click="$router.go(-1)">
           <!--<img src="../../../assets/img/icons/close-circle-2.svg" alt="Close" />--> 
          </button>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4">
              <h6 class="fs-16 fw-bold text-title mb-3">Invoice Details:</h6>
              <ul class="list-group">
                <li class="list-group-item">DATE: <strong>26/01/2022</strong></li>
                <li class="list-group-item">TIME: <strong>20:31</strong></li>
                <li class="list-group-item">REFERENCE: <strong>5389607</strong></li>
                <li class="list-group-item">WAREHOUSE: <strong>Warehouse 01</strong></li>
                <li class="list-group-item">PAYMENT STATUS: <span class="badge bg-success">Paid</span></li>
              </ul>
            </div>
            <div class="col-lg-4">
              <h6 class="fs-16 fw-bold text-title mb-3">Customer Info:</h6>
              <ul class="list-group">
                <li class="list-group-item">NAME: <strong>Jhon Smith</strong></li>
                <li class="list-group-item">MAIL: <strong>Smith123@gmail.com</strong></li>
                <li class="list-group-item">PHONE: <strong>+00 983 234 396</strong></li>
                <li class="list-group-item">ADDRESS: <strong>2750 Quadra Street, Canada</strong></li>
              </ul>
            </div>
            <div class="col-lg-4">
              <h6 class="fs-16 fw-bold text-title mb-3">Company Info:</h6>
              <ul class="list-group">
                <li class="list-group-item">NAME: <strong>KODE Corporation</strong></li>
                <li class="list-group-item">MAIL: <strong>hello@KODE.com</strong></li>
                <li class="list-group-item">PHONE: <strong>+00 793 234 609</strong></li>
                <li class="list-group-item">ADDRESS: <strong>413 North Las Vegas, NV 89032</strong></li>
              </ul>
            </div>
          </div>
  
          <div class="table-responsive mt-4">
            <table class="table table-bordered">
              <thead>
                <tr class="bg-light">
                  <th>NO.</th>
                  <th>PRODUCT</th>
                  <th>CODE</th>
                  <th>UNIT PRICE</th>
                  <th>QUANTITY</th>
                  <th>DISCOUNT</th>
                  <th>TAX</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01.</td>
                  <td>Headphone</td>
                  <td>9860532</td>
                  <td>$50.00</td>
                  <td>100pc</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$5000.00</td>
                </tr>
                <tr>
                  <td colspan="6"></td>
                  <td>ORDER TAX</td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td colspan="6"></td>
                  <td>DISCOUNT</td>
                  <td>$150.00</td>
                </tr>
                <tr>
                  <td colspan="6"></td>
                  <td>Shipping</td>
                  <td>$50.00</td>
                </tr>
                <tr>
                  <td colspan="6"></td>
                  <td><strong>GRAND TOTAL</strong></td>
                  <td><strong>$200.00</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end gap-3">
          <button class="btn btn-primary">SMS</button>
          <button class="btn btn-secondary">EMAIL</button>
          <a href="../../../assets/img/products.pdf" class="btn btn-warning">PDF</a>
          <button class="btn btn-success" @click="printPage">Print</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SaleDetailsPage",
    methods: {
      printPage() {
        window.print();
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .card {
    border-radius: 10px;
  }
  .card-header {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  </style>
  