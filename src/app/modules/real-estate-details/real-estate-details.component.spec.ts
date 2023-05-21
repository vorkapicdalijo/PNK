import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RealEstateDetailsComponent } from './real-estate-details.component';
import { RealEstateService } from '../real-estate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRealEstateDialogComponent } from '../dialogs/edit-real-estate-dialog/edit-real-estate-dialog.component';
import { DeleteRealEstateDialogComponent } from '../dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';
import { RealEstateDetails } from 'src/app/models/real-estate-details.model';

describe('RealEstateDetailsComponent', () => {
  let component: RealEstateDetailsComponent;
  let fixture: ComponentFixture<RealEstateDetailsComponent>;
  let mockRealEstateService: jasmine.SpyObj<RealEstateService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockRealEstateDetails: RealEstateDetails = {
    realEstateName: 'Mock Real Estate',
    price: 100000,
    realEstateCountry: 'Mock Country',
    realEstateCity: 'Mock City',
    realEstateType: {
      typeName: 'Mock Type',
      realEstateTypeId: 0,
      description: 'des',
    },
    id: 123,
    content: [],
  };

  beforeEach(async () => {
    mockRealEstateService = jasmine.createSpyObj('RealEstateService', [
      'getRealEstateById',
      'deleteRealEstate',
    ]);
    mockActivatedRoute = { params: of({ id: 123 }) };
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [RealEstateDetailsComponent],
      providers: [
        { provide: RealEstateService, useValue: mockRealEstateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: EditRealEstateDialogComponent, useValue: {} },
        { provide: DeleteRealEstateDialogComponent, useValue: {} },
      ],
      imports: [BrowserAnimationsModule],
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

  it('should load real estate details and content on initialization', () => {
    mockRealEstateService.getRealEstateById.and.returnValue(
      of(mockRealEstateDetails)
    );

    component.ngOnInit();

    expect(component.realEstateDetails).toEqual(mockRealEstateDetails);
    expect(component.contentDataSource.data).toEqual(
      component.realEstateDetails.content
    );
  });

  it('should open edit real estate dialog on editRealEstate', () => {
    const dialogRef = jasmine.createSpyObj<
      MatDialogRef<EditRealEstateDialogComponent>
    >(['afterClosed']);
    mockDialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(456));
    component.realEstateDetails = mockRealEstateDetails;

    component.editRealEstate(component.realEstateDetails.id);

    expect(mockDialog.open).toHaveBeenCalledWith(
      EditRealEstateDialogComponent,
      {
        data: { realEstateId: component.realEstateDetails.id },
      }
    );
    expect(component.contentDataSource.data).toEqual(
      component.realEstateDetails.content
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/real-estates/details/456',
    ]);
  });

  it('should open delete real estate dialog on deleteRealEstate', () => {
    const dialogRef = jasmine.createSpyObj<
      MatDialogRef<DeleteRealEstateDialogComponent>
    >(['afterClosed']);
    mockDialog.open.and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of(true));
    component.realEstateDetails = mockRealEstateDetails;

    mockRealEstateService.deleteRealEstate.and.returnValue(of(null));

    component.deleteRealEstate(component.realEstateDetails);

    expect(mockDialog.open).toHaveBeenCalledWith(
      DeleteRealEstateDialogComponent,
      {
        data: { realEstateName: component.realEstateDetails.realEstateName },
        position: { top: '3rem' },
      }
    );
    expect(mockRealEstateService.deleteRealEstate).toHaveBeenCalledWith(
      component.realEstateDetails.id
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/real-estates']);
  });
});
