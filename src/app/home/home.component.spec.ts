import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../models/product/product';
import { DataServiceMock } from './data.service.mock';
import { HomeComponent } from './home.component';

type productListResponseType = Array<Product>;

// const dummyProductListResponse: productListResponseType = [];

const dummyProductListResponse: productListResponseType = [
  { id: 1, name: 'name 1', description: 'description 1', price: '15', quantity: '3', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 2, name: 'name 2', description: 'description 2', price: '36', quantity: '1', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 3, name: 'name 3', description: 'description 3', price: '72', quantity: '4', imageUrl: 'https://source.unsplash.com/1600x900/?product' }
];

// class MockedProductService {
//   getProducts() {
//     return dummyProductListResponse;
//   }
// }

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let productService: MockedProductService;
  let productService: DataServiceMock;
  let productList: any = [];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // productService = new MockedProductService();
    productService = new DataServiceMock();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  // it('should have "productList" populated from MockedProductService', () => {
  //   productList = productService.getProducts();
  //   expect(productList.length).toBeGreaterThan(0);
  // });

  // it('should have "productList" populated from DataServiceMock', () => {
  //   productList = productService.getProducts();
  //   expect(productList.length).toBeGreaterThan(0);
  // });

  // it('should have "productList" populated from DataServiceMock through an observable', () => {
  //   productService.getProducts()
  //     .subscribe(products => productList = products);
  //   expect(productList.length).toBeGreaterThan(0);
  // });

  it('should have "productList" populated from DataService through an observable of mocked data using a Spy', () => {
    spyOn(productService, 'getProducts').and.returnValue(of(dummyProductListResponse));
    //spyOn(messageService, 'getMessages').and.callThrough();
    productService.getProducts()
      .subscribe(products => productList = products);
    // expect(productList.length).toBe(0);
    expect(productList.length).toBeGreaterThan(0);
    expect(productList.length).toBe(3);
  });
});
