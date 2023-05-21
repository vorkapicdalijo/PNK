import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCategoryDialogComponent } from './edit-category-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('EditCategoryDialogComponent', () => {
  let component: EditCategoryDialogComponent;
  let fixture: ComponentFixture<EditCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
