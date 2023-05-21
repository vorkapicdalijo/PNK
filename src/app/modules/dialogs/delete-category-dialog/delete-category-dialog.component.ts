import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RealEstateService } from '../../real-estate.service';

export interface DialogData {
  categoryName: String;
  categoryId: number;
}

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css'],
})
export class DeleteCategoryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  deleteCategory() {
    this.realEstateService
      .deleteRealEstateType(this.data.categoryId)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
