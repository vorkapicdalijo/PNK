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
  styleUrls: ['./real-estate-details.component.css'],
})
export class RealEstateDetailsComponent implements OnInit {
  realEstateId: number = 0;
  realEstateDetails!: RealEstateDetails;
  realEstateContent!: RealEstateContent[];

  displayedColumns = ['no', 'contentName', 'quantity', 'description'];

  contentDataSource!: MatTableDataSource<RealEstateContent>;

  realEstateDetailsMock!: RealEstateDetails;

  constructor(
    private realEstateService: RealEstateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.realEstateId = params['id'];

        this.realEstateService
          .getRealEstateById(this.realEstateId)
          .subscribe((realEstate) => {
            this.realEstateDetails = realEstate;
            this.contentDataSource = new MatTableDataSource<RealEstateContent>(
              this.realEstateDetails.content
            );
          });

      }
    });
  }

  editRealEstate(realEstateId: number) {
    const dialogRef = this.dialog.open(EditRealEstateDialogComponent, {
      data: { realEstateId: realEstateId },
    });

    dialogRef.afterClosed().subscribe((realEstateId: number) => {
      if (realEstateId) {
        this.contentDataSource = new MatTableDataSource<RealEstateContent>(
          this.realEstateDetails.content
        );
        this.router.navigate([`/real-estates`]);
      }
    });
  }

  deleteRealEstate(realEstate: RealEstateDetails) {
    const dialogRef = this.dialog.open(DeleteRealEstateDialogComponent, {
      data: { realEstateName: realEstate.realEstateName },
      position: { top: '3rem' },
    });

    dialogRef.afterClosed().subscribe((realEstateId) => {
      this.realEstateService
        .deleteRealEstate(realEstate.id)
        .subscribe((res) => {
          console.log(res);
        });
      this.contentDataSource = new MatTableDataSource<RealEstateContent>(
        this.realEstateDetails.content
      );
      this.router.navigate([`/real-estates`]);
    });
  }
}
