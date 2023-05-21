import { RealEstateContent } from './../../models/real-estate-content.model';
import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RealEstateDetails } from 'src/app/models/real-estate-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { EditRealEstateDialogComponent } from '../dialogs/edit-real-estate-dialog/edit-real-estate-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRealEstateDialogComponent } from '../dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';

@Component({
  selector: 'app-real-estate-details',
  templateUrl: './real-estate-details.component.html',
  styleUrls: ['./real-estate-details.component.css']
})
export class RealEstateDetailsComponent implements OnInit {

  realEstateId: number = 0;
  realEstate!: RealEstateDetails;
  realEstateContent!: RealEstateContent[];

  displayedColumns = ['no', 'contentName', 'quantity', 'description']

  contentDataSource!: MatTableDataSource<RealEstateContent>;

  realEstateDetailsMock!: RealEstateDetails;

  constructor(private realEstateService: RealEstateService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params['id']) {
        this.realEstateId = params['id']

        this.realEstateService.realEstateDetailsMockData.forEach(el => {
          if (el.id == this.realEstateId)
              this.realEstateDetailsMock = el;
        })
        this.contentDataSource = new MatTableDataSource<RealEstateContent>(this.realEstateDetailsMock.content);

        //TODO: make api call for details, add backend
        // this.realEstateService.getRealEstateById(this.realEstateId)
        //   .subscribe(realEstate => {
        //     this.realEstate = realEstate
        //   });

        // this.realEstateService.getContentByRealEstateId(this.realEstateId)
        //   .subscribe(content => {
        //     this.realEstateContent = content
        //   })

      }
    })
  }

  editRealEstate(realEstateId: number) {
    //TODO: add service edit
    const dialogRef = this.dialog.open(EditRealEstateDialogComponent,
      {
        data: {realEstateId: realEstateId},
      })

    dialogRef.afterClosed().subscribe((realEstateId: number) => {
      if(realEstateId) {
        //navigiraj na azuriranu nekretninu u details
        this.contentDataSource = new MatTableDataSource<RealEstateContent>(this.realEstateDetailsMock.content);
        this.router.navigate([`/real-estates/details/${realEstateId}`])
      }
    })
  }

  deleteRealEstate(realEstateName: String) {
    //TODO: add service delete
    const dialogRef = this.dialog.open(DeleteRealEstateDialogComponent,
      {
        data: {realEstateName: realEstateName},
        position: {top: '3rem'}
      })

    dialogRef.afterClosed().subscribe(realEstateId => {
      //if(result)
        //TODO: delete by id
      this.router.navigate([`/real-estates`])
    })
  }

}
