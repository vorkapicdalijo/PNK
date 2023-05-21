import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateCategoriesComponent } from './real-estate-categories.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RealEstateService } from '../real-estate.service';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
        MatDialogModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [RealEstateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
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
