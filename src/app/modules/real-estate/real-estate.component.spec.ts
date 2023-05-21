import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RealEstate } from 'src/app/models/real-estate.model';
import { RealEstateService } from '../real-estate.service';
import { RealEstateComponent } from './real-estate.component';
import { EditRealEstateDialogComponent } from '../dialogs/edit-real-estate-dialog/edit-real-estate-dialog.component';
import { DeleteRealEstateDialogComponent } from '../dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('RealEstateComponent', () => {
  let component: RealEstateComponent;
  let fixture: ComponentFixture<RealEstateComponent>;
  let mockRealEstateService: jasmine.SpyObj<RealEstateService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockRealEstates: RealEstate[] = [
    {
      id: 1,
      realEstateName: 'Mock Real Estate 1',
      realEstateType: 'Type 1',
      realEstateCity: 'Location 1',
      realEstateCountry: 'Location 1',
      dateAdded: '12.12.12',
      price: 100000,
    },
    {
      id: 2,
      realEstateName: 'Mock Real Estate 2',
      realEstateType: 'Type 2',
      realEstateCity: 'Location 2',
      realEstateCountry: 'Location 1',
      dateAdded: '12.12.12',
      price: 200000,
    },
  ];

  beforeEach(async () => {
    mockRealEstateService = jasmine.createSpyObj('RealEstateService', [
      'getRealEstates',
      'deleteRealEstate',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [RealEstateComponent],
      providers: [
        { provide: RealEstateService, useValue: mockRealEstateService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve real estates on initialization', () => {
    mockRealEstateService.getRealEstates.and.returnValue(of(mockRealEstates));

    component.ngOnInit();

    expect(mockRealEstateService.getRealEstates).toHaveBeenCalled();
    expect(component.realEstates).toEqual(mockRealEstates);
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
  });

  it('should navigate to real estate details', () => {
    const realEstateId = 1;

    component.openRealEstateDetails(realEstateId);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      `/real-estates/details/${realEstateId}`,
    ]);
  });

  it('should apply filter to the data source', () => {
    const filterValue = 'test filter';
    const mockData: RealEstate[] = [
      {
        id: 1,
        realEstateName: 'Mock Real Estate 1',
        realEstateType: 'Type 1',
        realEstateCity: 'Location 1',
        realEstateCountry: 'Location 1',
        dateAdded: '12.12.12',
        price: 100000,
      },
      {
        id: 2,
        realEstateName: 'Mock Real Estate 2',
        realEstateType: 'Type 2',
        realEstateCity: 'Location 2',
        realEstateCountry: 'Location 1',
        dateAdded: '12.12.12',
        price: 200000,
      },
    ];

    const mockDataSource = new MatTableDataSource(mockData);
    const mockPaginator: MatPaginator = jasmine.createSpyObj('MatPaginator', [
      'firstPage',
    ]);
    Object.defineProperty(mockDataSource, 'paginator', {
      get: () => mockPaginator,
    });

    component.dataSource = mockDataSource;

    component.applyFilter({
      target: { value: filterValue },
    } as unknown as Event);

    expect(component.dataSource.filter).toBe(filterValue);
    expect(mockPaginator.firstPage).toHaveBeenCalled();
  });

  it('should open the add real estate dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(123));

    mockDialog.open.and.returnValue(dialogRef);

    component.addRealEstate();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/real-estates`]);
  });

  it('should open the edit real estate dialog', () => {
    const realEstateId = 1;
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(123));
    mockDialog.open.and.returnValue(dialogRef);

    component.editRealEstate(realEstateId);

    expect(mockDialog.open).toHaveBeenCalledWith(
      EditRealEstateDialogComponent,
      { data: { realEstateId: realEstateId } }
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      `/real-estates/details/${123}`,
    ]);
  });

  it('should open the delete real estate dialog', () => {
    const realEstate: RealEstate = {
      id: 0,
      dateAdded: '12.12.2012',
      price: 1200,
      realEstateCity: 'Test',
      realEstateCountry: 'Test',
      realEstateName: 'Test',
      realEstateType: 'Test',
    };
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(123));

    mockDialog.open.and.returnValue(dialogRef);
    mockRealEstateService.deleteRealEstate.and.returnValue(of({}));

    component.deleteRealEstate(realEstate);

    expect(mockDialog.open).toHaveBeenCalledWith(
      DeleteRealEstateDialogComponent,
      {
        data: { realEstateName: realEstate.realEstateName },
        position: { top: '3rem' },
      }
    );
    expect(mockRealEstateService.deleteRealEstate).toHaveBeenCalledWith(
      realEstate.id
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/real-estates`]);
  });
});
