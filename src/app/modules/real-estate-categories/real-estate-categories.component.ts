import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';
import { RealEstateType } from 'src/app/models/real-estate-type.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-real-estate-categories',
  templateUrl: './real-estate-categories.component.html',
  styleUrls: ['./real-estate-categories.component.css']
})
export class RealEstateCategoriesComponent implements OnInit {

  realEstateCategories!: RealEstateType[];
  dataSource!: MatTableDataSource<RealEstateType>;

  displayedColumns = ['id', 'typeName', 'description'];

  constructor(private realEstateService: RealEstateService) { }

  ngOnInit(): void {
    //this.realEstateCategories = this.realEstateService.realEstateTypesMockData;
    this.realEstateService.getRealEstateTypes()
      .subscribe(res => {
        this.realEstateCategories = res;
        this.dataSource = new MatTableDataSource<RealEstateType>(this.realEstateCategories);
      })
  }

}
