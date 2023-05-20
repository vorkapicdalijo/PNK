import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-estate-header',
  templateUrl: './real-estate-header.component.html',
  styleUrls: ['./real-estate-header.component.css']
})
export class RealEstateHeaderComponent implements OnInit {

  navLinks = [
    { path: 'real-estates', label: 'NEKRETNINE' },
    { path: 'real-estates/categories', label: 'KATEGORIJE' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToHomePage() {
    this.router.navigate(['']);
  }

}
