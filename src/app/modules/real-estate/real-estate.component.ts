import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor(private realEstateService: RealEstateService) { }

  ngOnInit(): void {
  }

}
