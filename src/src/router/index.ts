import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import CreateSalesPage from "../pages/Sales/CreateSalesPage.vue";
import SalesListPage from "../pages/Sales/SalesListPage.vue";
import LoginPage from "../pages/Login/LoginPage.vue";
import NotFoundPage from "../pages/NotFound/NotFoundPage.vue";
import SaleDetailsPage from "../pages/Sales/SaleDetailsPage.vue";


import { tokenVerification, roleVerification } from "@/services/users";
import api from "@/services/api";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DashboardPage",
    component: DashboardPage,
   meta: { requiresAuth: true, roles: ["Seller"] }
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for bad URLs
    name: "NotFound",
    component: NotFoundPage
  },
  {
    path: "/create-sales",
    name: "CreateSalesPage",
    component: CreateSalesPage,
    meta: { requiresAuth: true, roles: ["Seller","User"] }
  },
  {
    path: "/sales-list",
    name: "SalesListPage",
    component: SalesListPage,
    meta: { requiresAuth: true, roles: ["User","Seller"] }
  },
  {
    path: "/sale-details/:id",
    name: "SaleDetailsPage",
    component: SaleDetailsPage,
    props: true,
    meta: { requiresAuth: true, roles: ["Seller", "Admin"] }
  },
  { path: "/login", name: "LoginPage", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

// Navigation guard to check authentication and permissions
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    let isAuthenticated =  false;// Check authentication status (e.g., by checking token)
    let hasPermission =  false// Check user's permissions (e.g., by comparing roles)

   // /user/token/validate
   try{
    const response = await api.post('/user/token/validate');
    if(response.status === 200){
     isAuthenticated = true;
    }else{
     isAuthenticated = false;
    }
   
     if (!isAuthenticated) {
       sessionStorage.setItem("redirectAfterLogin", to.fullPath);
       return next({ name: 'LoginPage' });
     }
 
     // Check if the user has required permissions
     const roles = to?.meta?.roles;
     if (Array.isArray(roles)) {
      const response = await roleVerification(roles);
      if(response){
       hasPermission = true;
      }
     } else {
       console.error("Bad request");
     }
    
     if (hasPermission == false) {
       return next('/login');
     }
   }catch{
    return next('/login');
   }

  }
  // If authentication and permissions are valid, proceed to the route
  next();
});


export default router;