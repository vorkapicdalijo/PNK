import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate-details',
  templateUrl: './real-estate-details.component.html',
  styleUrls: ['./real-estate-details.component.css']
})
export class RealEstateDetailsComponent implements OnInit {

  constructor(private realEstateService: RealEstateService) { }

  ngOnInit(): void {
  }

}
