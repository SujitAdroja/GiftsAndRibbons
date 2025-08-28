export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  userId: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  products: object[];
  totalAmout: number;
  shippingFee: number;
  totalQuantity: number;
  placeAt: object;
  updateAt: object;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  description: string;
  stock: number;
  image: string[];
  features: string[];
  tags: string[];
  category: String;
  categoryId: string;
  createdAt: object;
  updatedAt: object;
};

export type OrderDetails = {
  _id: string;
  userId: string;
  firstsName: string;
  lastName: String;
  address: object;
  mobile: number;
  extension: string;
  orderedAt: Date;
  paymentStatus: string;
  products: {
    productId: string;
    productName: string;
    category: string;
    actualPrice: number;
    priceInOrder: number;
    quantity: number;
    images: string[];
  }[];
};
