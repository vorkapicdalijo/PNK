import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { RealEstate } from '../models/real-estate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RealEstateDetails } from '../models/real-estate-details.model';
import { RealEstateType } from '../models/real-estate-type.model';
import { RealEstateContent } from '../models/real-estate-content.model';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(private http: HttpClient) { }

  getRealEstates(): Observable<RealEstate[]> {
    return this.http.get<RealEstate[]>(
      environment.apiUrl + "/real-estates"
    ).pipe(map((res) => res as RealEstate[] || []))
  }

  getRealEstateById(realEstateId: number): Observable<RealEstateDetails> {
    return this.http.get<RealEstateDetails>(
      environment.apiUrl + `/real-estates/${realEstateId}`
    ).pipe(map((res) => res as RealEstateDetails || []))
  }

  addRealEstate(realEstate: RealEstateDetails): Observable<RealEstateDetails> {
    return this.http.post<RealEstateDetails>(
      environment.apiUrl + '/real-estates/add',
      realEstate
    ).pipe(map((res) => res as any || null))
  }

  updateRealEstate(realEstate: RealEstateDetails): Observable<any> {
    return this.http.put<RealEstateDetails>(
      environment.apiUrl + `/real-estates/update/${realEstate.id}`,
      realEstate
    ).pipe(map((res) => res as any || null))
  }

  deleteRealEstate(realEstateId: number): Observable<any> {
    return this.http.delete(
      environment.apiUrl + `/real-estates/delete/${realEstateId}`
    ).pipe(map((res) => res as any || null))
  }

  getRealEstateTypes(): Observable<RealEstateType[]> {
    return this.http.get<RealEstateType[]>(
      environment.apiUrl + '/real-estates/types'
    ).pipe(map((res) => res as RealEstateType[] || null))
  }

  addRealEstateType(type: RealEstateType): Observable<RealEstateType> {
    return this.http.post<RealEstateType>(
      environment.apiUrl + '/real-estates/types/add',
      type
    ).pipe(map((res) => res as any || null))
  }

  updateRealEstateType(type: RealEstateType): Observable<any> {
    return this.http.put<RealEstateType>(
      environment.apiUrl + `/real-estates/types/update/${type.id}`,
      type
    ).pipe(map((res) => res as any || null))
  }

  deleteRealEstateType(typeId: number): Observable<any> {
    return this.http.delete(
      environment.apiUrl + `/real-estates/types/delete/${typeId}`
    ).pipe(map((res) => res as any || null))
  }

  getContentByRealEstateId(realEstateId: number): Observable<RealEstateContent[]> {
    return this.http.get<RealEstateContent[]>(
      environment.apiUrl + `real-estates/content/${realEstateId}`
    ).pipe(map((res) => res as RealEstateContent[] || null))
  }

}
