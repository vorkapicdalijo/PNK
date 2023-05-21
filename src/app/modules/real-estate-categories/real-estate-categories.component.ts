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
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-estate-categories',
  templateUrl: './real-estate-categories.component.html',
  styleUrls: ['./real-estate-categories.component.css'],
})
export class RealEstateCategoriesComponent implements OnInit, AfterViewInit {
  realEstateCategories!: RealEstateType[];
  dataSource!: MatTableDataSource<RealEstateType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['id', 'typeName', 'description', 'actions'];

  constructor(
    private realEstateService: RealEstateService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator)
      this.paginator._intl.itemsPerPageLabel = 'Broj kategorija po stranici:';
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.dataSource = new MatTableDataSource<RealEstateType>([]);

    this.realEstateService.getRealEstateTypes().subscribe((res) => {
      this.realEstateCategories = res;
      this.dataSource = new MatTableDataSource<RealEstateType>(
        this.realEstateCategories
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editType(type: RealEstateType) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: { category: type,
              categoryNames: this.realEstateCategories.map(a => a.typeName.toLowerCase()).filter(el => el != type.typeName.toLowerCase()) },
    });

    dialogRef.afterClosed().subscribe((edited) => {
      if(edited){
        this.loadData();
        this.router.navigate([`/real-estates/categories`]);
      }
    });
  }

  deleteType(type: RealEstateType) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: { categoryName: type.typeName, categoryId: type.id },
      position: { top: '3rem' },
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted == true) {
          this.loadData();
          this.router.navigate([`/real-estates/categories`]);
      }
    });
  }

  addType() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {categoryNames: this.realEstateCategories.map(a => a.typeName.toLowerCase())}
    });

    dialogRef.afterClosed().subscribe((added) => {
      if(added==true){
        this.loadData();
        this.router.navigate([`/real-estates/categories`]);
      }
    });
  }
}
