import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // it(`should have as title 'angular-httpclient-example'`, () => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   // const app = fixture.componentInstance;
  //   expect(component.title).toEqual('angular-httpclient-example');
  // });

  // it('should render title', () => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   // fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('angular-httpclient-example app is running!');
  // });
});
