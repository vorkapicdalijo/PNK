import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { RealEstate } from '../models/real-estate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RealEstateDetails } from '../models/real-estate-details.model';
import { RealEstateType } from '../models/real-estate-type';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(private http: HttpClient) { }

  //TODO: dodaj backend
  getRealEstates(): Observable<RealEstate[]> {
    return this.http.get<RealEstate[]>(
      environment.apiUrl + "/real-estates"
    ).pipe(map((res) => res as RealEstate[] || []))
  }

  //TODO: dodaj backend
  getRealEstateById(realEstateId: number): Observable<RealEstateDetails> {
    return this.http.get<RealEstateDetails>(
      environment.apiUrl + `/real-estates/${realEstateId}`
    ).pipe(map((res) => res as RealEstateDetails || []))
  }

  //TODO: dodaj backend
  addRealEstate(realEstate: RealEstateDetails): Observable<String> {
    return this.http.post<RealEstateDetails>(
      environment.apiUrl + '/real-estates/add',
      realEstate
    ).pipe(map((res) => res as String || null))
  }

  //TODO: dodaj backend
  deleteRealEstate(realEstateId: number): Observable<String> {
    return this.http.post(
      environment.apiUrl + '/real-estates/delete',
      realEstateId
    ).pipe(map((res) => res as String || null))
  }

  //TODO: dodaj backend
  getRealEstateTypes(): Observable<RealEstateType[]> {
    return this.http.get<RealEstateType[]>(
      environment.apiUrl + '/real-estates/types'
    ).pipe(map((res) => res as RealEstateType[] || null))
  }
}
