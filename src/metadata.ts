/* eslint-disable */
export default async () => {
    const t = {
        ["./customer/dto/customer.dto"]: await import("./customer/dto/customer.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./customer/dto/customer.dto"), { "CreateCustomerDto": { email: { required: false, type: () => String }, phoneNo: { required: false, type: () => Number } } }]], "controllers": [[import("./customer/customer.controller"), { "CustomerController": { "getCustomers": {}, "createCustomer": { type: t["./customer/dto/customer.dto"].CreateCustomerDto } } }]] } };
};