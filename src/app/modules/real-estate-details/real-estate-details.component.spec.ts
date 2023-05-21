import { RealEstate } from 'src/app/models/real-estate.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateDetailsComponent } from './real-estate-details.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RealEstateService } from '../real-estate.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RealEstateDetailsComponent', () => {
  let component: RealEstateDetailsComponent;
  let fixture: ComponentFixture<RealEstateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealEstateDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [RealEstateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
