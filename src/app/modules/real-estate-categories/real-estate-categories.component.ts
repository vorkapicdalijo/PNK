import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RealEstateService } from '../real-estate.service';
import { RealEstateType } from 'src/app/models/real-estate-type.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../dialogs/delete-category-dialog/delete-category-dialog.component';
import { EditCategoryDialogComponent } from '../dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddCategoryDialogComponent } from '../dialogs/add-category-dialog/add-category-dialog.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-real-estate-categories',
  templateUrl: './real-estate-categories.component.html',
  styleUrls: ['./real-estate-categories.component.css']
})
export class RealEstateCategoriesComponent implements OnInit, AfterViewInit {

  realEstateCategories!: RealEstateType[];
  dataSource!: MatTableDataSource<RealEstateType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['id', 'typeName', 'description', 'actions'];

  constructor(private realEstateService: RealEstateService,
              public dialog: MatDialog) { }


  ngAfterViewInit(): void {
    if(this.paginator)
      this.paginator._intl.itemsPerPageLabel="Broj kategorija po stranici:";
    if(this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.realEstateCategories = this.realEstateService.realEstateTypesMockData;
    this.dataSource = new MatTableDataSource<RealEstateType>(this.realEstateCategories);
    // this.realEstateService.getRealEstateTypes()
    //   .subscribe(res => {
    //     this.realEstateCategories = res;
    //     this.dataSource = new MatTableDataSource<RealEstateType>(this.realEstateCategories);
    //   })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editType(type: RealEstateType) {
    //TODO: add backend
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,
      {
        data: {category: type}
      })

    dialogRef.afterClosed().subscribe(closed => {
      this.realEstateCategories = this.realEstateService.realEstateTypesMockData;
      this.dataSource = new MatTableDataSource<RealEstateType>(this.realEstateCategories);
      if(this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })

  }

  deleteType(type: RealEstateType)  {
    //TODO: add backend

    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: {categoryName: type.typeName},
      position: {top: '3rem'}
    })

   dialogRef.afterClosed().subscribe(closed => {
      this.realEstateService.realEstateTypesMockData = this.realEstateService.realEstateTypesMockData.filter(el => {return el.realEstateTypeId != type.realEstateTypeId})
      this.realEstateCategories = this.realEstateService.realEstateTypesMockData;
      this.dataSource = new MatTableDataSource<RealEstateType>(this.realEstateCategories);
      if(this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  addType() {
    //TODO: add backend

    const dialogRef = this.dialog.open(AddCategoryDialogComponent)

   dialogRef.afterClosed().subscribe(closed => {

   })
  }

}
