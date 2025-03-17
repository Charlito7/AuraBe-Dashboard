export interface SalesMetadataAndProductResponseDTO {
    id: string; 
    transactionDate: string;
    status?: string;
    totalAmount: number;
    paymentType?: string;
    paymentCustomerName?: string;
    paymentTypeTransactionId?: string;
    sellerFullName?: string;
    productSales?: ProductSaleDetail[];
}

export interface ProductSaleDetail {
    productCode?: string;
    quantity: number;
    unitCost: number;
    productName?: string;
}