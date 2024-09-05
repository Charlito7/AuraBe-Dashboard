import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import AddImages from "./AddImages.vue";

type Category = {
  name: string;
  description: string;
};

export default defineComponent({
  name: "CreateProducts",
  components: {
    AddImages,
  },
  setup() {
    // Define form fields
    const productName = ref("");
    const productNumber = ref("");
    const selectedCategory = ref("");
    const productPrice = ref(0);
    const productQuantity = ref(0);
    const minimumReorderQuantity = ref(0);
    const expiryDate = ref("1970-01-01");
    const productDescription = ref("");

    // Define the categories array
    const categories = ref<Category[]>([]);

    // Alert properties
    const alertMessage = ref("");
    const alertType = ref("success");

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.post("http://localhost:5254/api/category/GetAll");
        categories.value = response.data.result;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Clear form fields
    const clearForm = () => {
      productName.value = "";
      productNumber.value = "";
      selectedCategory.value = "";
      productPrice.value = 0;
      productQuantity.value = 0;
      minimumReorderQuantity.value = 0;
      expiryDate.value = "1970-01-01";
      productDescription.value = "";
    };

    // Close alert function
    const closeAlert = () => {
      alertMessage.value = "";
    };

    // Submit form
    const submitProduct = async () => {
      const productRequest = {
        name: productName.value,
        description: productDescription.value,
        barCode: productNumber.value,
        categoryName: selectedCategory.value,
        expiredDate: expiryDate.value,
        quantity: productQuantity.value,
        price: productPrice.value,
        minimumReorderQuantity: minimumReorderQuantity.value,
      };

      try {
        const response = await axios.post("http://localhost:5254/api/products", [productRequest]);
        alertMessage.value = "Product created successfully!";
        alertType.value = "success";
        clearForm(); // Clear the form after success
      } catch (error) {
        alertMessage.value = "Error creating product, please try again.";
        alertType.value = "danger";
        console.error("Error creating product:", error);
      }
    };

    // Fetch categories when the component is mounted
    onMounted(() => {
      fetchCategories();
    });

    return {
      productName,
      productNumber,
      selectedCategory,
      productPrice,
      productQuantity,
      minimumReorderQuantity,
      expiryDate,
      productDescription,
      categories,
      submitProduct,
      alertMessage,
      alertType,
      closeAlert,
    };
  },
});