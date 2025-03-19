export interface SalesMetadataAndProductResponseDTO {
    id: string; 
    transactionDate: string;
    status?: string;
    totalAmount: number;
    paymentType?: string;
    paymentCustomerName?: string;
    paymentTypeTransactionId?: string;
    sellerFullName?: string;
    discount : number,
    shippingCost : number,
    shippingAddress? : string,
    orderTaxPercentage : number
    productSales?: ProductSaleDetail[];
}

export interface ProductSaleDetail {
    productCode?: string;
    quantity: number;
    unitCost: number;
    productName?: string;
}