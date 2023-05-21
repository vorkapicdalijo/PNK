import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RealEstateService } from '../../real-estate.service';
import { RealEstateType } from 'src/app/models/real-estate-type.model';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css'],
})
export class AddCategoryDialogComponent implements OnInit {
  form!: FormGroup;

  categoryToAdd: RealEstateType = {
    realEstateTypeId: 0,
    typeName: '',
    description: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    public fb: FormBuilder,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    //TODO: add backend call
    this.categoryToAdd.typeName = this.form.get('categoryName')?.value;
    this.categoryToAdd.description = this.form.get('description')?.value;

    this.realEstateService.addRealEstateType(this.categoryToAdd)
      .subscribe(res => {
        console.log(res)
      })
  }
}
