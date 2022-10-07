import { TestBed, getTestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product/product';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

type productListResponseType = Array<Product>;

// const dummyProductListResponse: productListResponseType = [];

const dummyProductListResponse: productListResponseType = [
  { id: 1, name: 'name 1', description: 'description 1', price: '15', quantity: '3', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 2, name: 'name 2', description: 'description 2', price: '36', quantity: '1', imageUrl: 'https://source.unsplash.com/1600x900/?product' },
  { id: 3, name: 'name 3', description: 'description 3', price: '72', quantity: '4', imageUrl: 'https://source.unsplash.com/1600x900/?product' }
];

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let productList = [];
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    injector = getTestBed();
    service = injector.inject(DataService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should have created the data service', () => {
    expect(service).toBeTruthy();
  });

  // it('getProducts() should return just an empty array', () => {
  //   productList = service.getProducts();
  //   expect(productList).toEqual([]);
  // });

  // it('getProducts() should return just mocked data', () => {
  //   service.getProducts().subscribe((res) => {
  //     expect(res).toEqual(dummyProductListResponse);
  //   });
  // });

  it('getProducts() should return data through using a mocked http request', () => {
    service.getProducts().subscribe((res) => {
      expect(res).toEqual(dummyProductListResponse);
    });

    // const req = httpMock.expectOne('http://localhost:3000/products');
    // to solve the CORS issue, we use a relative path through the api proxy defined in proxy.conf.json
    const req = httpMock.expectOne('/api/products?_page=1&_limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductListResponse);
  });

  it('sendGetRequest() should return the general mocked http request for GET operations', () => {
    service.sendGetRequest().subscribe((res: HttpResponse<Product[]>) => {
      expect(res.body).toEqual(dummyProductListResponse);
    });

    // const req = httpMock.expectOne('http://localhost:3000');
    const req = httpMock.expectOne('/api/products?_page=1&_limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductListResponse);
  });
});
