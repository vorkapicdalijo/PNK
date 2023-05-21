import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateCategoriesComponent } from './real-estate-categories.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RealEstateService } from '../real-estate.service';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RealEstateCategoriesComponent', () => {
  let component: RealEstateCategoriesComponent;
  let fixture: ComponentFixture<RealEstateCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealEstateCategoriesComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatTableModule,
      ],
      providers: [RealEstateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
