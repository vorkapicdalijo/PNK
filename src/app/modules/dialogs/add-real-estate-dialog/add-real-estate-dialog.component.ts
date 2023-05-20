import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-real-estate-dialog',
  templateUrl: './add-real-estate-dialog.component.html',
  styleUrls: ['./add-real-estate-dialog.component.css'],
})
export class AddRealEstateDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddRealEstateDialogComponent>) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
