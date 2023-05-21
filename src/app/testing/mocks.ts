import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { RealEstate } from '../models/real-estate.model';

export class RouterMock {
  navigate(commands: any[], extras?: any) {
    // Mock implementation for navigate method
  }
}

export class MatDialogMock {
  private _afterClosedSubject: Subject<any> = new Subject();

  open(component: any, config: any) {
    // Mock implementation for open method
  }

  afterClosed() {
    return this._afterClosedSubject.asObservable();
  }

  close(data?: any) {
    this._afterClosedSubject.next(data);
    this._afterClosedSubject.complete();
  }
}

export class RealEstateServiceMock {
  realEstateMockData: RealEstate[] = [
    // Mock data for RealEstate array
  ];

  getRealEstates(): Observable<RealEstate[]> {
    return of(this.realEstateMockData);
  }

  // You can add more mock methods as needed for testing purposes
}
