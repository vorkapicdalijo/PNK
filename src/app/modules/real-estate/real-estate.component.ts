import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RealEstateService } from '../real-estate.service';
import { RealEstate } from 'src/app/models/real-estate.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
  displayedColumns = ['realEstateName', 'realEstateType', 'realEstateLocation', 'price', 'actions'];

  mockData: RealEstate[] = [
    {
      id: 1,
      realEstateName: 'LUKSUZNI APARTMAN',
      price: '140 000 €',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Split',
      realEstateType: 'APARTMAN'
    },
    {
      id: 2,
      realEstateName: 'VILLA MARINA',
      price: '220 000 €',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Dubrovnik',
      realEstateType: 'KUĆA'
    },
    {
      id: 3,
      realEstateName: 'POSLOVNI PROSTOR KVATRIĆ',
      price: '80 000 €',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Zagreb',
      realEstateType: 'POSLOVNI PROSTOR'
    },
  ];

  constructor(private realEstateService: RealEstateService,
              private router: Router) {}


  ngAfterViewInit(): void {
   this.paginator._intl.itemsPerPageLabel="Broj nekretnina po stranici:";
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //dohvati sve nekretnine
    // this.realEstateService.getRealEstates().subscribe((res) => {
    //   this.realEstates = res;

    //   this.dataSource = new MatTableDataSource<RealEstate>();
    // });

    //Mock data
    this.realEstates = this.mockData;
    this.dataSource = new MatTableDataSource(this.realEstates);
  }

  openRealEstateDetails(realEstateId: number) {
    this.router.navigate([`/real-estates/${realEstateId}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
