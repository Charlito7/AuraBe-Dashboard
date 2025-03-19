import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import CreateProductsPage from "../pages/Products/CreateProductsPage.vue";
import ProductsListPage from "../pages/Products/ProductsListPage.vue";
import EditProductsPage from "../pages/Products/EditProductsPage.vue";
import PrintBarcodePage from "../pages/Products/PrintBarcodePage.vue";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage.vue";
import CreateAdjustmentsPage from "../pages/Adjustments/CreateAdjustmentsPage.vue";
import AdjustmentListPage from "../pages/Adjustments/AdjustmentListPage.vue";
import EditAdjustmentPage from "../pages/Adjustments/EditAdjustmentPage.vue";
import CreateTransferPage from "../pages/Transfer/CreateTransferPage.vue";
import TransferListPage from "../pages/Transfer/TransferListPage.vue";
import EditTransferPage from "../pages/Transfer/EditTransferPage.vue";
import CreateExpensesPage from "../pages/Expenses/CreateExpensesPage.vue";
import ExpensesListPage from "../pages/Expenses/ExpensesListPage.vue";
import EditExpensesPage from "../pages/Expenses/EditExpensesPage.vue";
import ExpenseCategoryPage from "../pages/Expenses/ExpenseCategoryPage.vue";
import CreateQuotationPage from "../pages/Quotations/CreateQuotationPage.vue";
import QuotationListPage from "../pages/Quotations/QuotationListPage.vue";
import EditQuotationPage from "../pages/Quotations/EditQuotationPage.vue";
import CreatePurchasePage from "../pages/Purchases/CreatePurchasePage.vue";
import PurchaseListPage from "../pages/Purchases/PurchaseListPage.vue";
import EditPurchasePage from "../pages/Purchases/EditPurchasePage.vue";
import CreateSalesPage from "../pages/Sales/CreateSalesPage.vue";
import SalesListPage from "../pages/Sales/SalesListPage.vue";
import EditSalesPage from "../pages/Sales/EditSalesPage.vue";
import PosPage from "../pages/Sales/PosPage.vue";
import ShipmentPage from "../pages/Sales/ShipmentPage.vue";
import CreateSalesReturnPage from "../pages/SalesReturn/CreateSalesReturnPage.vue";
import SalesReturnListPage from "../pages/SalesReturn/SalesReturnListPage.vue";
import EditSalesReturnPage from "../pages/SalesReturn/EditSalesReturnPage.vue";
import CreatePurchaseReturnPage from "../pages/PurchaseReturn/CreatePurchaseReturnPage.vue";
import PurchaseReturnListPage from "../pages/PurchaseReturn/PurchaseReturnListPage.vue";
import EditPurchaseReturnPage from "../pages/PurchaseReturn/EditPurchaseReturnPage.vue";
import CustomerListPage from "../pages/People/CustomerListPage.vue";
import SupplierListPage from "../pages/People/SupplierListPage.vue";
import UserListPage from "../pages/People/UserListPage.vue";
import SystemSettingsPage from "../pages/Settings/SystemSettingsPage.vue";
import MyProfilePage from "../pages/Settings/MyProfilePage.vue";
import GroupPermissionPage from "../pages/Settings/GroupPermissionPage.vue";
import CreateGroupPermissionPage from "../pages/Settings/CreateGroupPermissionPage.vue";
import EditGroupPermissionPage from "../pages/Settings/EditGroupPermissionPage.vue";
import WarehousePage from "../pages/Settings/WarehousePage.vue";
import CategoryPage from "../pages/Settings/CategoryPage.vue";
import BrandListPage from "../pages/Settings/BrandListPage.vue";
import CurrncyListPage from "../pages/Settings/CurrncyListPage.vue";
import UnitListPage from "../pages/Settings/UnitListPage.vue";
import BackupPage from "../pages/Settings/BackupPage.vue";
import PurchaseReportPage from "../pages/Reports/PurchaseReportPage.vue";
import PurchasePaymentReportPage from "../pages/Reports/PurchasePaymentReportPage.vue";
import PurchaseReturnReportPage from "../pages/Reports/PurchaseReturnReportPage.vue";
import SalesReportPage from "../pages/Reports/SalesReportPage.vue";
import SalesPaymentReportPage from "../pages/Reports/SalesPaymentReportPage.vue";
import SalesReturnReportPage from "../pages/Reports/SalesReturnReportPage.vue";
import ProductQuantityAlertPage from "../pages/Reports/ProductQuantityAlertPage.vue";
import ProfitLossPage from "../pages/Reports/ProfitLossPage.vue";
import ProductReportPage from "../pages/Reports/ProductReportPage.vue";
import StockReportPage from "../pages/Reports/StockReportPage.vue";
import StockReportDetailsPage from "../pages/Reports/StockReportDetailsPage.vue";
import WarehouseReportPage from "../pages/Reports/WarehouseReportPage.vue";
import CustomerReportPage from "../pages/Reports/CustomerReportPage.vue";
import SupplierReportPage from "../pages/Reports/SupplierReportPage.vue";
import UserReportPage from "../pages/Reports/UserReportPage.vue";
import LandingPage from "../pages/BestElectronicsShop/LandingPage.vue";
import ShopRightSidebarPage from "../pages/BestElectronicsShop/ShopRightSidebarPage.vue";
import ShopLeftSidebarPage from "../pages/BestElectronicsShop/ShopLeftSidebarPage.vue";
import ShopGridPage from "../pages/BestElectronicsShop/ShopGridPage.vue";
import ShopDetailsPage from "../pages/BestElectronicsShop/ShopDetailsPage.vue";
import CartPage from "../pages/BestElectronicsShop/CartPage.vue";
import WishlistPage from "../pages/BestElectronicsShop/WishlistPage.vue";
import CheckoutPage from "../pages/BestElectronicsShop/CheckoutPage.vue";
import LoginPage from "../pages/BestElectronicsShop/LoginPage.vue";
import TermsConditionsPage from "../pages/BestElectronicsShop/TermsConditionsPage.vue";
import OfferPage from "../pages/BestElectronicsShop/OfferPage.vue";
import FaqPage from "../pages/BestElectronicsShop/FaqPage.vue";
import ContactPage from "../pages/BestElectronicsShop/ContactPage.vue";
import NotFoundPage from "../pages/NotFound/NotFoundPage.vue";
import SaleDetailsPage from "../pages/Sales/SaleDetailsPage.vue";


import { tokenVerification, roleVerification } from "@/services/users";
import api from "@/services/api";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DashboardPage",
    component: DashboardPage,
   meta: { requiresAuth: true, roles: ["Seller","Admin", "MANAGER","ITAdmin"] }
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for bad URLs
    name: "NotFound",
    component: NotFoundPage
  },
  {
    path: "/create-product",
    name: "CreateProductsPage",
    component: CreateProductsPage,
    meta: { requiresAuth: true, roles: ["User", "MANAGER"] }
  },
  {
    path: "/product-list",
    name: "ProductsListPage",
    component: ProductsListPage,
    meta: { requiresAuth: true, roles: ["User", "MANAGER"] }
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProductsPage, // Assuming you have a component for editing products
    props: true,
    meta: { requiresAuth: true, roles: ["User", "MANAGER"] }
  },
  {
    path: '/product-details/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage, // or import it dynamically if needed
    props: true, // allows the id to be passed as a prop
    meta: { requiresAuth: true, roles: ["User", "MANAGER"] }
  },
  {
    path: "/print-barcode",
    name: "PrintBarcodePage",
    component: PrintBarcodePage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-adjustment",
    name: "CreateAdjustmentsPage",
    component: CreateAdjustmentsPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/adjustment-list",
    name: "AdjustmentListPage",
    component: AdjustmentListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-adjustment",
    name: "EditAdjustmentPage",
    component: EditAdjustmentPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-transfer",
    name: "CreateTransferPage",
    component: CreateTransferPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/transfer-list",
    name: "TransferListPage",
    component: TransferListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-transfer",
    name: "EditTransferPage",
    component: EditTransferPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-expense",
    name: "CreateExpensesPage",
    component: CreateExpensesPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/expense-list",
    name: "ExpensesListPage",
    component: ExpensesListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-expense",
    name: "EditExpensesPage",
    component: EditExpensesPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/expense-category",
    name: "ExpenseCategoryPage",
    component: ExpenseCategoryPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-quotation",
    name: "CreateQuotationPage",
    component: CreateQuotationPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/quotation-list",
    name: "QuotationListPage",
    component: QuotationListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-quotation",
    name: "EditQuotationPage",
    component: EditQuotationPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-purchase",
    name: "CreatePurchasePage",
    component: CreatePurchasePage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/purchase-list",
    name: "PurchaseListPage",
    component: PurchaseListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-purchase",
    name: "EditPurchasePage",
    component: EditPurchasePage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
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
    path: "/edit-sales",
    name: "EditSales",
    component: EditSalesPage,
    props: true,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/pos",
    name: "PosPage",
    component: PosPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/shipment-list",
    name: "ShipmentPage",
    component: ShipmentPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-sales-return",
    name: "CreateSalesReturnPage",
    component: CreateSalesReturnPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/sales-return-list",
    name: "SalesReturnListPage",
    component: SalesReturnListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-sales-return",
    name: "EditSalesReturnPage",
    component: EditSalesReturnPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-purchase-return",
    name: "CreatePurchaseReturnPage",
    component: CreatePurchaseReturnPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/purchase-return-list",
    name: "PurchaseReturnListPage",
    component: PurchaseReturnListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-purchase-return",
    name: "EditPurchaseReturnPage",
    component: EditPurchaseReturnPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/customer-list",
    name: "CustomerListPage",
    component: CustomerListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/supplier-list",
    name: "SupplierListPage",
    component: SupplierListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/user-list",
    name: "UserListPage",
    component: UserListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/system-settings",
    name: "SystemSettingsPage",
    component: SystemSettingsPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/my-profile",
    name: "MyProfilePage",
    component: MyProfilePage,
    meta: { requiresAuth: true, roles: ["User"] }
  },
  {
    path: "/group-permission",
    name: "GroupPermissionPage",
    component: GroupPermissionPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/create-group-permission",
    name: "CreateGroupPermissionPage",
    component: CreateGroupPermissionPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/edit-group-permission",
    name: "EditGroupPermissionPage",
    component: EditGroupPermissionPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/warehouse-list",
    name: "WarehousePage",
    component: WarehousePage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/category-list",
    name: "CategoryPage",
    component: CategoryPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/brand-list",
    name: "BrandListPage",
    component: BrandListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/currency-list",
    name: "CurrncyListPage",
    component: CurrncyListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/unit-list",
    name: "UnitListPage",
    component: UnitListPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/backup",
    name: "BackupPage",
    component: BackupPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/purchase-report",
    name: "PurchaseReportPage",
    component: PurchaseReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/purchase-payment-report",
    name: "PurchasePaymentReportPage",
    component: PurchasePaymentReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/purchase-return-report",
    name: "PurchaseReturnReportPage",
    component: PurchaseReturnReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/sales-report",
    name: "SalesReportPage",
    component: SalesReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/sale-details/:id",
    name: "SaleDetailsPage",
    component: SaleDetailsPage,
    props: true,
    meta: { requiresAuth: true, roles: ["Seller", "Admin"] }
  },
  {
    path: "/sales-payment-report",
    name: "SalesPaymentReportPage",
    component: SalesPaymentReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/sales-return-report",
    name: "SalesReturnReportPage",
    component: SalesReturnReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/product-quantity-alert",
    name: "ProductQuantityAlertPage",
    component: ProductQuantityAlertPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/profit-loss",
    name: "ProfitLossPage",
    component: ProfitLossPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/product-report",
    name: "ProductReportPage",
    component: ProductReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/stock-report",
    name: "StockReportPage",
    component: StockReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/stock-report-details",
    name: "StockReportDetailsPage",
    component: StockReportDetailsPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/warehouse-report",
    name: "WarehouseReportPage",
    component: WarehouseReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/customer-report",
    name: "CustomerReportPage",
    component: CustomerReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/supplier-report",
    name: "SupplierReportPage",
    component: SupplierReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  {
    path: "/user-report",
    name: "UserReportPage",
    component: UserReportPage,
    meta: { requiresAuth: true, roles: ["ITAdmin"] }
  },
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/shop-right-sidebar", name: "ShopRightSidebarPage", component: ShopRightSidebarPage },
  { path: "/shop-left-sidebar", name: "ShopLeftSidebarPage", component: ShopLeftSidebarPage },
  { path: "/shop-grid", name: "ShopGridPage", component: ShopGridPage },
  { path: "/shop-details", name: "ShopDetailsPage", component: ShopDetailsPage },
  { path: "/cart", name: "CartPage", component: CartPage },
  { path: "/wishlist", name: "WishlistPage", component: WishlistPage },
  { path: "/checkout", name: "CheckoutPage", component: CheckoutPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/terms-conditions", name: "TermsConditionsPage", component: TermsConditionsPage },
  { path: "/offers", name: "OfferPage", component: OfferPage },
  { path: "/faq", name: "FaqPage", component: FaqPage },
  { path: "/contact", name: "ContactPage", component: ContactPage },
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