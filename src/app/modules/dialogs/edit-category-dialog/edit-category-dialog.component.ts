import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RealEstateService } from '../../real-estate.service';
import { RealEstateType } from 'src/app/models/real-estate-type.model';

export interface DialogData {
  category: RealEstateType;
  categoryNames: String[];
}

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent implements OnInit {
  categoryToEdit!: RealEstateType;
  categoryNameTaken: boolean = false;
  editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private realEstateService: RealEstateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      categoryId: new FormControl({ value: '', disabled: true }),
      categoryName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.categoryToEdit = this.data.category;

    this.setValues();
  }

  setValues() {
    this.editForm.patchValue({
      categoryId: this.categoryToEdit?.id,
      categoryName: this.categoryToEdit?.typeName,
      description: this.categoryToEdit?.description,
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.categoryToEdit.typeName = this.editForm.get('categoryName')?.value;
    this.categoryToEdit.description = this.editForm.get('description')?.value;

    this.realEstateService.updateRealEstateType(this.categoryToEdit)
      .subscribe(res => {
        console.log(res)
      })
  }

  nameInputChange() {
    if(this.data.categoryNames.includes(this.editForm.get('categoryName')?.value.toLowerCase()))
      this.categoryNameTaken = true;
    else
      this.categoryNameTaken = false;
  }
}
