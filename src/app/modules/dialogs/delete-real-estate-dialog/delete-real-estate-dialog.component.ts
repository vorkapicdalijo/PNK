import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  realEstateName: String;
}

@Component({
  selector: 'app-delete-real-estate-dialog',
  templateUrl: './delete-real-estate-dialog.component.html',
  styleUrls: ['./delete-real-estate-dialog.component.css']
})
export class DeleteRealEstateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRealEstateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
