import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RealEstate } from 'src/app/models/real-estate.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RealEstateDetails } from 'src/app/models/real-estate-details.model';
import { RealEstateService } from '../../real-estate.service';
import { RealEstateType } from 'src/app/models/real-estate-type.model';
import { MatTableDataSource } from '@angular/material/table';
import { RealEstateContent } from 'src/app/models/real-estate-content.model';
import { MatTab } from '@angular/material/tabs';

export interface DialogData {
  realEstateId: number
}

@Component({
  selector: 'app-edit-real-estate-dialog',
  templateUrl: './edit-real-estate-dialog.component.html',
  styleUrls: ['./edit-real-estate-dialog.component.css']
})
export class EditRealEstateDialogComponent implements OnInit {

  realEstateId!: number;
  realEstateToEdit!: RealEstateDetails;

  realEstateTypes!: RealEstateType[];
  selectedTypeId: number = 0;

  editForm!: FormGroup;

  contentEditForm!: FormGroup;
  selectedContent: RealEstateContent = {contentId: 0, contentName: '', description: '', quantity:0};
  editingContent: boolean = false;
  addingContent: boolean = false;

  content!:RealEstateContent[];

  contentDataSource!: MatTableDataSource<RealEstateContent>;
  displayedColumns = ['no', 'contentName', 'quantity', 'description', 'actions'];

  constructor(public dialogRef: MatDialogRef<EditRealEstateDialogComponent>,
              private realEstateService: RealEstateService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.realEstateId = this.data.realEstateId;
    //TODO: add fetch for real estate details to edit and for types
    this.realEstateTypes = this.realEstateService.realEstateTypesMockData;

    this.realEstateService.realEstateDetailsMockData.forEach(el => {
      if (this.realEstateId == el.id)
        this.realEstateToEdit = el;
    })
    if(this.realEstateToEdit)
      this.content = this.realEstateToEdit.content;
    this.contentDataSource = new MatTableDataSource<RealEstateContent>(this.content);

    this.editForm = this.fb.group({
      realEstateName: new FormControl('', Validators.required),
      realEstateCountry: new FormControl('', Validators.required),
      realEstateCity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      realEstateTypeId: new FormControl('', Validators.required)
    })

    this.contentEditForm = this.fb.group({
      contentName: new FormControl('', Validators.required),
      quantity: new FormControl('' , Validators.required),
      description: new FormControl('')
    })

    this.setOldValues();
  }

  setOldValues() {
    this.editForm.patchValue({
      realEstateName: this.realEstateToEdit?.realEstateName,
      realEstateCountry: this.realEstateToEdit?.realEstateCountry,
      realEstateCity: this.realEstateToEdit?.realEstateCity,
      realEstateTypeId: this.realEstateToEdit?.realEstateType?.realEstateTypeId,
      price: this.realEstateToEdit?.price
    })

    this.selectedTypeId = this.realEstateToEdit?.realEstateType?.realEstateTypeId;
  }

  editContent(contentId: number) {
    this.editingContent = true;
    if(this.addingContent) {
      this.content.shift();
      this.contentDataSource = new MatTableDataSource(this.content);
      this.addingContent = false;
    }

    this.selectedContent = {... this.content.filter(el => {
      return el.contentId == contentId
    })[0] };

    this.contentEditForm.setValue({
      contentName: this.selectedContent.contentName,
      quantity: this.selectedContent.quantity,
      description: this.selectedContent.description
    })
  }

  saveContent(form: FormGroup) {
    this.editingContent = false;
    this.addingContent = false;

    //TODO: save
    for(let con of this.content) {
      if(con.contentId == this.selectedContent.contentId) {
        con.contentName = form.get('contentName')?.value;
        con.quantity = form.get('quantity')?.value;
        con.description = form.get('description')?.value;
        break
      }
    }
    this.contentDataSource = new MatTableDataSource(this.content);

    this.selectedContent = {contentId: 0, contentName: '', description: '', quantity:0};
  }

  deleteContent(contentId: number) {
    this.content = this.content.filter(el => {
      return el.contentId != contentId
    })
    this.addingContent = false;
    this.editingContent = false;
    this.selectedContent = {contentId: 0, contentName: '', description: '', quantity:0};
    this.contentDataSource = new MatTableDataSource(this.content)
  }

  addContent() {
    this.addingContent = true;

    let newContentId = this.content.length + 2
    this.content.unshift({
      contentId: newContentId,
      contentName: '',
      quantity: 0,
      description: ''
    });

    this.editingContent = true;
    this.selectedContent = {... this.content.filter(el => {
      return el.contentId == newContentId
    })[0]}
    this.contentDataSource = new MatTableDataSource(this.content)


    this.contentEditForm.reset();
  }

  onSubmit() {
    let type: RealEstateType = this.realEstateTypes.filter(type => {return type.realEstateTypeId == this.editForm.get('realEstateTypeId')?.value})[0];
    //u obje forme pohranjeno - TODO posalji sa update na back
    this.realEstateToEdit.realEstateName = this.editForm.get('realEstateName')?.value;
    this.realEstateToEdit.realEstateCountry = this.editForm.get('realEstateCountry')?.value;
    this.realEstateToEdit.realEstateCity = this.editForm.get('realEstateCity')?.value;
    this.realEstateToEdit.realEstateType = {
      realEstateTypeId: this.editForm.get('realEstateTypeId')?.value,
      typeName: type.typeName,
      description: type.description};
    this.realEstateToEdit.price = this.editForm.get('price')?.value;
    this.realEstateToEdit.content = this.content;

    for(let el of this.realEstateService.realEstateDetailsMockData) {
      if(el.id == this.realEstateToEdit.id) {
        el = this.realEstateToEdit
        break
      }
    }
  }

  cancelContent() {
    this.contentEditForm.reset();
    if(this.addingContent) {
      this.content.shift();
      this.contentDataSource = new MatTableDataSource(this.content);
      this.addingContent = false;
    }
    this.editingContent=false;
    this.selectedContent = {contentId: 0, contentName: '', description: '', quantity:0};

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
