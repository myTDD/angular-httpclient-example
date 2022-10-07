import { assertPlatform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a paragraph with the text "An Angular 9 example application that demonstrates how to use HttpClient to consume REST APIs"', () => {
    //arrange
    const pText = fixture.debugElement.query(By.css('p')).nativeElement;

    // act and assert
    expect(pText.innerHTML).toBe('An Angular 9 example application that demonstrates how to use HttpClient to consume REST APIs');
  });
});
