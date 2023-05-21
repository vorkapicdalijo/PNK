import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RealEstateService } from '../real-estate.service';
import { RealEstate } from 'src/app/models/real-estate.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteRealEstateDialogComponent } from '../dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';
import { EditRealEstateDialogComponent } from '../dialogs/edit-real-estate-dialog/edit-real-estate-dialog.component';
import { AddRealEstateDialogComponent } from '../dialogs/add-real-estate-dialog/add-real-estate-dialog.component';
import { RealEstateDetails } from 'src/app/models/real-estate-details.model';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css'],
})
export class RealEstateComponent implements OnInit, AfterViewInit {
  realEstates!: RealEstate[];
  dataSource!: MatTableDataSource<RealEstate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = [
    'realEstateName',
    'realEstateType',
    'realEstateLocation',
    'price',
    'actions',
  ];

  mockData: RealEstate[] = [];

  constructor(
    private realEstateService: RealEstateService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator)
      this.paginator._intl.itemsPerPageLabel = 'Broj nekretnina po stranici:';
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<RealEstate>([]);
    //this.mockData = this.realEstateService.realEstateMockData;
    //dohvati sve nekretnine
    this.realEstateService.getRealEstates()?.subscribe((res) => {
      this.realEstates = res;
      console.log(res);
      this.dataSource = new MatTableDataSource<RealEstate>(this.realEstates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    //Mock data
    //this.realEstates = this.mockData;
    //this.dataSource = new MatTableDataSource(this.realEstates);
  }

  openRealEstateDetails(realEstateId: number) {
    this.router.navigate([`/real-estates/details/${realEstateId}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.paginator?.firstPage();
    }
  }

  //TODO modali?
  addRealEstate() {
    //TODO: add service add
    const dialogRef = this.dialog.open(AddRealEstateDialogComponent, {});

    dialogRef.afterClosed().subscribe((realEstateId: number) => {
      if (typeof realEstateId == 'number') {
        //navigiraj na novu nekretninu u details
        this.router.navigate([`/real-estates`]);
      }
    });
  }

  editRealEstate(realEstateId: number) {
    //TODO: add service edit
    const dialogRef = this.dialog.open(EditRealEstateDialogComponent, {
      data: { realEstateId: realEstateId },
    });

    dialogRef.afterClosed().subscribe((updatedRealEstateId: number) => {
      if (typeof updatedRealEstateId == 'number') {
        //navigiraj na azuriranu nekretninu u details
        this.router.navigate([`/real-estates/details/${updatedRealEstateId}`]);
      }
    });
  }

  deleteRealEstate(realEstate: RealEstate) {
    //TODO: add service delete
    const dialogRef = this.dialog.open(DeleteRealEstateDialogComponent, {
      data: { realEstateName: realEstate.realEstateName },
      position: { top: '3rem' },
    });

    dialogRef.afterClosed().subscribe((closed) => {
      if (typeof realEstate.id == 'number') {
        //TODO: delete by id
        this.realEstateService
          .deleteRealEstate(realEstate.id)
          .subscribe((res) => {
            console.log(res);
          });
        this.router.navigate([`/real-estates`]);
      }
    });
  }
}
