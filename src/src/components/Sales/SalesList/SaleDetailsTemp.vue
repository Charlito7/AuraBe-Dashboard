<template>
    <div class="container">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6">
              <h6 class="fs-16 fw-bold text-title mb-20">Invoice Details:</h6>
              <ul class="details-title list-style mb-40">
                <li class="fs-14 fw-semibold text-title lh-1">
                  DATE :<span class="text-optional ms-1">{{ saleDetails?.transactionDate}}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  REFERENCE :<span class="text-optional ms-1">{{ saleDetails?.id }}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  SELLER :<span class="text-optional ms-1">{{ saleDetails?.sellerFullName }}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  PAYMENT METHOD :<span class="badge badge-outline-green fw-semibold ms-1 fs-14">{{ saleDetails?.paymentType }}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  PAYMENT STATUS :<span class="badge badge-outline-green fw-semibold ms-1 fs-14">{{ saleDetails?.status }}</span>
                </li>
              </ul>
            </div>

            <div class="col-lg-6 ps-xxl-6">
              <h6 class="fs-16 fw-bold text-title mb-20">Company info:</h6>
              <ul class="details-title list-style mb-40">
                <li class="fs-14 fw-semibold text-title lh-1">
                  NAME :<span class="ms-1 text-optional">AuraBe</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  MAIL :<span class="text-optional ms-1">aurabegroup@kode.com</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  PHONE :<span class="text-optional ms-1">+509 3718 0660</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  ADDRESS :<span class="text-optional ms-1">#4 Portail Bainet, Jacmel,Sud-Est, Haiti</span>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="table-responsive style-two">
            <table class="table text-nowrap align-middle mb-0 border-0">
              <thead>
                <tr class="bg_mild">
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    NO.
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    PRODUCT
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    CODE
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    UNIT PRICE
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    QUANTITY
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    DISCOUNT
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    TAX
                  </th>
                  <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                    SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="br-s-1" v-for="product in saleDetails?.productSales" :key="product?.productCode">
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                    01.
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    {{product.productName}}
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    {{product.productCode}}
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $  {{product.unitCost}}
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    {{product.quantity}}
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $ 0.00
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $ 0.00
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $  {{(product.quantity * product.unitCost).toFixed(2)}}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1">
                    ORDER TAX
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph float-right">
                    $ {{ saleDetails?.orderTaxPercentage }}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1">
                    DISCOUNT
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $ {{ saleDetails?.discount }}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1">
                    Shipping
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $ {{ saleDetails?.shippingCost }}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-title br-s-1">
                    GRAND TOTAL
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-black text-purple">
                    $ {{ saleDetails?.totalAmount }}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1">
                    PAID
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                    $ {{ saleDetails?.totalAmount }}
                  </td>
                </tr>
                <tr>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"></td>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1 br-1">
                    DUE
                  </td>
                  <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-1">
                    $ 0.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
      </div>
      <!--EnD Body -->
      <div class="pt-25 pb-35 d-flex flex-wrap justify-content-end me-xxl-3">  
  <a href="../../../assets/img/products.pdf" class="btn style-eight me-2">
    Whatsapp
    <img src="../../../assets/img/icons/whatsapp.png" alt="Image" />
  </a>
  <a class="btn style-five upload-btn px-xxl-6" onclick="window.print();">
    Print
    <img src="../../../assets/img/icons/download.svg" alt="Image" />
  </a>
</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { SalesMetadataAndProductResponseDTO } from "@/interfaces/interfaces/salesInterface";
  import { ref, defineProps, Ref, watch } from "vue";
  
  const props = defineProps<{
    saleDetails?: SalesMetadataAndProductResponseDTO;
    
  }>();
  const defaultSale: SalesMetadataAndProductResponseDTO = {
    id: '',
    transactionDate: '',
    status: '',
    totalAmount: 0,
    paymentType: '',
    paymentCustomerName: '',
    paymentTypeTransactionId: '',
    sellerFullName: '',
    discount : 0,
    shippingCost : 0,
    shippingAddress : 'N/A',
    orderTaxPercentage : 0,
    productSales: []
};
const selectedSale = ref<SalesMetadataAndProductResponseDTO>(props.saleDetails || defaultSale);
  
  const printPage = () => {
    window.print();
  };
  watch(
  selectedSale,
  (newValue, oldValue) => {
    console.log("selectedSale changed:", newValue);
    // Perform any actions you need when selectedSale changes
  },
  { deep: true } // Enable deep watching for nested objects
);
  </script>
  