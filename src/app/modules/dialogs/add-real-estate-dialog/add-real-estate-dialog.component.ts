import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RealEstateType } from 'src/app/models/real-estate-type.model';
import { RealEstateService } from '../../real-estate.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RealEstateContent } from 'src/app/models/real-estate-content.model';
import { MatTableDataSource } from '@angular/material/table';
import { RealEstateDetails } from 'src/app/models/real-estate-details.model';

@Component({
  selector: 'app-add-real-estate-dialog',
  templateUrl: './add-real-estate-dialog.component.html',
  styleUrls: ['./add-real-estate-dialog.component.css'],
})
export class AddRealEstateDialogComponent implements OnInit {
  realEstateToAdd: RealEstateDetails = {
    id: 0,
    content: [],
    price: 0,
    realEstateCity: '',
    realEstateCountry: '',
    realEstateName: '',
    realEstateType: {description: '', realEstateTypeId: 0, typeName: ''},
  }

  realEstateTypes!: RealEstateType[];

  content: RealEstateContent[] = [];
  selectedContent: RealEstateContent = {
    contentId: 0,
    contentName: '',
    description: '',
    quantity: 0,
  };
  editingContent: boolean = false;
  addingContent: boolean = false;

  editForm!: FormGroup;
  contentEditForm!: FormGroup;

  contentDataSource!: MatTableDataSource<RealEstateContent>;
  displayedColumns = [
    'no',
    'contentName',
    'quantity',
    'description',
    'actions',
  ];

  constructor(
    public dialogRef: MatDialogRef<AddRealEstateDialogComponent>,
    private realEstateService: RealEstateService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //TODO: add fetch for real estate details to edit and for types
    this.realEstateTypes = this.realEstateService.realEstateTypesMockData;

    this.editForm = this.fb.group({
      realEstateName: new FormControl('', Validators.required),
      realEstateCountry: new FormControl('', Validators.required),
      realEstateCity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      realEstateTypeId: new FormControl('', Validators.required),
    });

    this.contentEditForm = this.fb.group({
      contentName: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

    this.contentDataSource = new MatTableDataSource<RealEstateContent>(
      this.content
    );
  }

  editContent(contentId: number) {
    this.editingContent = true;
    if (this.addingContent) {
      this.content.shift();
      this.contentDataSource = new MatTableDataSource(this.content);
      this.addingContent = false;
    }

    this.selectedContent = {
      ...this.content.filter((el) => {
        return el.contentId == contentId;
      })[0],
    };

    this.contentEditForm.setValue({
      contentName: this.selectedContent.contentName,
      quantity: this.selectedContent.quantity,
      description: this.selectedContent.description,
    });
  }

  saveContent(form: FormGroup) {
    this.editingContent = false;
    this.addingContent = false;

    //TODO: save
    for (let con of this.content) {
      if (con.contentId == this.selectedContent.contentId) {
        con.contentName = form.get('contentName')?.value;
        con.quantity = form.get('quantity')?.value;
        con.description = form.get('description')?.value;
        break;
      }
    }
    this.contentDataSource = new MatTableDataSource(this.content);

    this.selectedContent = {
      contentId: 0,
      contentName: '',
      description: '',
      quantity: 0,
    };
  }

  deleteContent(contentId: number) {
    this.content = this.content.filter((el) => {
      return el.contentId != contentId;
    });
    this.addingContent = false;
    this.editingContent = false;
    this.selectedContent = {
      contentId: 0,
      contentName: '',
      description: '',
      quantity: 0,
    };
    this.contentDataSource = new MatTableDataSource(this.content);
  }

  addContent() {
    this.addingContent = true;
    let newContentId = this.content.length + 2;
    this.content.unshift({
      contentId: newContentId,
      contentName: '',
      quantity: 0,
      description: '',
    });

    this.editingContent = true;
    this.selectedContent = {
      ...this.content.filter((el) => {
        return el.contentId == newContentId;
      })[0],
    };
    this.contentDataSource = new MatTableDataSource(this.content);

    this.contentEditForm.reset();
  }

  onSubmit() {
    let type: RealEstateType = this.realEstateTypes.filter((type) => {
      return (
        type.realEstateTypeId == this.editForm.get('realEstateTypeId')?.value
      );
    })[0];
    //u obje forme pohranjeno - TODO posalji sa update na back
    this.realEstateToAdd.realEstateName =
      this.editForm.get('realEstateName')?.value;
    this.realEstateToAdd.realEstateCountry =
      this.editForm.get('realEstateCountry')?.value;
    this.realEstateToAdd.realEstateCity =
      this.editForm.get('realEstateCity')?.value;
    this.realEstateToAdd.realEstateType = {
      realEstateTypeId: this.editForm.get('realEstateTypeId')?.value,
      typeName: type.typeName,
      description: type.description,
    };
    this.realEstateToAdd.price = this.editForm.get('price')?.value;
    this.realEstateToAdd.content = this.content;

    this.realEstateService.realEstateDetailsMockData.push(this.realEstateToAdd);
  }

  cancelContent() {
    this.contentEditForm.reset();
    if (this.addingContent) {
      this.content.shift();
      this.contentDataSource = new MatTableDataSource(this.content);
      this.addingContent = false;
    }
    this.editingContent = false;
    this.selectedContent = {
      contentId: 0,
      contentName: '',
      description: '',
      quantity: 0,
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
