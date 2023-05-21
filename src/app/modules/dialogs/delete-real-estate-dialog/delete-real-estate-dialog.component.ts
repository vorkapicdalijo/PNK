import { RealEstateService } from './../../real-estate.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

export interface DialogData {
  realEstateName: String;
  realEstateId: number;
}

@Component({
  selector: 'app-delete-real-estate-dialog',
  templateUrl: './delete-real-estate-dialog.component.html',
  styleUrls: ['./delete-real-estate-dialog.component.css'],
})
export class DeleteRealEstateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteRealEstateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  deleteRealEstate() {
    this.realEstateService
      .deleteRealEstate(this.data.realEstateId)
      .subscribe((res) => {
        console.log(res)
      });
  }
}
