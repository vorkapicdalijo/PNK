import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteRealEstateDialogComponent } from '../dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';

import { RealEstateComponent } from './real-estate.component';

describe('RealEstateComponent', () => {
  let component: RealEstateComponent;
  let fixture: ComponentFixture<RealEstateComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RealEstateComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the DeleteRealEstateDialogComponent with the provided real estate name', () => {
    const dialogRef: any = {
      afterClosed: () => {}
    };
    const mockRealEstate = {
      id: 1,
      realEstateName: 'Test Real Estate',
      price: 100000,
      realEstateCountry: 'Test Country',
      realEstateCity: 'Test City',
      realEstateType: 'Test Type',
      dateAdded: '2021-01-01'
    };
    mockDialog.open.and.returnValue(dialogRef);

    component.deleteRealEstate(mockRealEstate);

    expect(mockDialog.open).toHaveBeenCalledWith(DeleteRealEstateDialogComponent, {
      data: { realEstateName: mockRealEstate.realEstateName },
      position: { top: '3rem' }
    });
  });

  it('should navigate to the real estates page when dialog is closed with a number', () => {
    const dialogRef: any = {
      afterClosed: () => {}
    };
    const mockRealEstateId = 1;
    mockDialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(Promise.resolve(mockRealEstateId));

    component.deleteRealEstate({
      id: 1,
      realEstateName: 'Test Real Estate',
      price: 100000,
      realEstateCountry: 'Test Country',
      realEstateCity: 'Test City',
      realEstateType: 'Test Type',
      dateAdded: '2021-01-01'
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/real-estates']);
  });

  it('should not navigate when dialog is closed without a number', () => {
    const dialogRef: any = {
      afterClosed: () => {}
    };
    mockDialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(Promise.resolve(null));

    component.deleteRealEstate({
      id: 1,
      realEstateName: 'Test Real Estate',
      price: 100000,
      realEstateCountry: 'Test Country',
      realEstateCity: 'Test City',
      realEstateType: 'Test Type',
      dateAdded: '2021-01-01'
    });

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
