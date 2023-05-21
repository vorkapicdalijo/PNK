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
    public dialog: MatDialog,
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
    this.loadData();
  }

  loadData() {
    this.dataSource = new MatTableDataSource<RealEstate>([]);
    //ucitaj nekretnine
    this.realEstateService.getRealEstates()?.subscribe((res) => {
      this.realEstates = res;
      this.dataSource = new MatTableDataSource<RealEstate>(
        this.realEstates.reverse()
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openRealEstateDetails(realEstateId: number) {
    this.router.navigate([`/real-estates/details/${realEstateId}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.paginator?.firstPage();
    }
  }

  addRealEstate() {
    const dialogRef = this.dialog.open(AddRealEstateDialogComponent, {});

    dialogRef.afterClosed().subscribe((added: number) => {
      if(added) {
        this.loadData();
        this.router.navigate([`/real-estates`]);
      }
    });
  }

  editRealEstate(realEstateId: number) {
    const dialogRef = this.dialog.open(EditRealEstateDialogComponent, {
      data: { realEstateId: realEstateId },
    });

    dialogRef.afterClosed().subscribe((edited: number) => {
      if(edited) {
        this.loadData();
        this.router.navigate([`/real-estates`]);
      }
    });
  }

  deleteRealEstate(realEstate: RealEstate) {
    const dialogRef = this.dialog.open(DeleteRealEstateDialogComponent, {
      data: { realEstateName: realEstate.realEstateName,
              realEstateId: realEstate.id },
      position: { top: '3rem' },
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if(deleted) {
        this.loadData();
        this.router.navigate([`/real-estates`]);
      }
    });
  }
}
