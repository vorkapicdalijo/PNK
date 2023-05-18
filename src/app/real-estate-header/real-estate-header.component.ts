import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-estate-header',
  templateUrl: './real-estate-header.component.html',
  styleUrls: ['./real-estate-header.component.css']
})
export class RealEstateHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

}
