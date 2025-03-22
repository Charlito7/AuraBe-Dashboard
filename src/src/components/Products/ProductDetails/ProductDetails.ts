import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to access route params

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  barCode: string;
  categoryName: string;
  expiredDate: string;
  quantity: number;
  price: number;
  minimumReorderQuantity: number;
}

export default {
  name: "ProductDetails",
  setup() {
    const route = useRoute(); // Get route details
    const productId = route.params.id; // Get the id from the route params
    const product = ref<Product | null>(null); // Use Product type for the ref

    onMounted(async () => {
      if (productId) {
        try {
          // Use POST request to fetch product details
          const response = await axios.post('http://localhost:5254/api/products/GetProduct', { productId });
          
          // Ensure the response is properly assigned to the product
          const data = response.data.result; 
          if (data) {
            product.value = {
              id: data.id,
              name: data.name,
              description: data.description,
              barCode: data.barCode,
              categoryName: data.categoryName,
              expiredDate: data.expiredDate,
              quantity: data.quantity,
              price: data.price,
              minimumReorderQuantity: data.minimumReorderQuantity
            };
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      } else {
        console.error('Product ID is undefined');
      }
    });

    return { product };
  }
};
