import { of } from 'rxjs';
import { Product } from '../models/product/product';

type productListResponseType = Array<Product>;

// const dummyProductListResponse: productListResponseType = [];

const dummyProductListResponse: productListResponseType = [
  { id: 1, name: 'name 1', description: 'description 1', price: '15', quantity: '3', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 2, name: 'name 2', description: 'description 2', price: '36', quantity: '1', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 3, name: 'name 3', description: 'description 3', price: '72', quantity: '4', imageUrl: 'https://source.unsplash.com/1600x900/?product' }
];

export class DataServiceMock {
  // getProducts() {
  //   return dummyProductListResponse;
  // }

  getProducts() {
    return of(dummyProductListResponse);
  }
}
