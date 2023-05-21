import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
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


  realEstateMockData: RealEstate[] = [
    {
      id: 1,
      realEstateName: 'LUKSUZNI APARTMAN',
      price: 140000,
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Split',
      realEstateType: 'APARTMAN',
      dateAdded: '12.12.2012'
    },
    {
      id: 2,
      realEstateName: 'VILLA MARINA',
      price: 220000,
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Dubrovnik',
      realEstateType: 'KUĆA',
      dateAdded: '12.12.2012'
    },
    {
      id: 3,
      realEstateName: 'POSLOVNI PROSTOR KVATRIĆ',
      price: 80000,
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Zagreb',
      realEstateType: 'POSLOVNI PROSTOR',
      dateAdded: '12.12.2012'
    },
  ];

  realEstateDetailsMockData: RealEstateDetails[] = [
    {
      id: 1,
      price: 120000,
      realEstateName: 'LUKSUZNI APARTMAN',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Zagreb',
      realEstateType: {
        realEstateTypeId: 1,
        typeName: 'VELIKA KUĆA',
        description: 'Villa'
      },
      content: [
      {
        contentId: 1,
        contentName: 'Kupaonica',
        quantity: 4,
        description: 'Luksuzne kupaonice'
      },
      {
        contentId: 2,
        contentName: 'Spavaća soba',
        quantity: 5,
        description: 'Renovirane sobe'
      },
      {
        contentId: 3,
        contentName: 'Bazen',
        quantity: 1,
        description: 'Veliki bazen'
      },
      {
        contentId: 4,
        contentName: 'Kuhinja',
        quantity: 2,
        description: 'Moderna i opremljena kuhinja'
      },
      {
        contentId: 5,
        contentName: 'Zimski vrt',
        quantity: 1,
        description: 'Prelijepi zimski vrt'
      },
      ]
    },
    {
      id: 2,
      price: 120000,
      realEstateName: 'VILLA MARINA',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Zagreb',
      realEstateType: {
        realEstateTypeId: 1,
        typeName: 'VELIKA KUĆA',
        description: 'Villa'
      },
      content: [
      {
        contentId: 1,
        contentName: 'Kupaonica',
        quantity: 4,
        description: 'Luksuzne kupaonice'
      },
      {
        contentId: 2,
        contentName: 'Spavaća soba',
        quantity: 5,
        description: 'Renovirane sobe'
      },
      {
        contentId: 3,
        contentName: 'Bazen',
        quantity: 1,
        description: 'Veliki bazen'
      },
      {
        contentId: 4,
        contentName: 'Kuhinja',
        quantity: 2,
        description: 'Moderna i opremljena kuhinja'
      },
      {
        contentId: 5,
        contentName: 'Zimski vrt',
        quantity: 1,
        description: 'Prelijepi zimski vrt'
      },
      ]
    },
    {
      id: 3,
      price: 120000,
      realEstateName: 'POSLOVNI PROSTOR KVATRIĆ',
      realEstateCountry: 'Hrvatska',
      realEstateCity: 'Zagreb',
      realEstateType: {
        realEstateTypeId: 1,
        typeName: 'VELIKA KUĆA',
        description: 'Villa'
      },
      content: [
      {
        contentId: 1,
        contentName: 'Kupaonica',
        quantity: 4,
        description: 'Luksuzne kupaonice'
      },
      {
        contentId: 2,
        contentName: 'Spavaća soba',
        quantity: 5,
        description: 'Renovirane sobe'
      },
      {
        contentId: 3,
        contentName: 'Bazen',
        quantity: 1,
        description: 'Veliki bazen'
      },
      {
        contentId: 4,
        contentName: 'Kuhinja',
        quantity: 2,
        description: 'Moderna i opremljena kuhinja'
      },
      {
        contentId: 5,
        contentName: 'Zimski vrt',
        quantity: 1,
        description: 'Prelijepi zimski vrt'
      },
      ]
    },

  ]

  realEstateTypesMockData: RealEstateType[] = [
    {
      realEstateTypeId: 1,
      typeName: 'KUĆA',
      description: 'Villa'
    },
    {
      realEstateTypeId: 2,
      typeName: 'POSLOVNI PROSTOR',
      description: 'Villa'
    },
    {
      realEstateTypeId: 3,
      typeName: 'GARAŽA',
      description: 'Villa'
    },
    {
      realEstateTypeId: 4,
      typeName: 'APARTMAN',
      description: 'Villa'
    },
    {
      realEstateTypeId: 5,
      typeName: 'SKLADIŠNI PROSTOR',
      description: 'Villa'
    },
    {
      realEstateTypeId: 6,
      typeName: 'STAN',
      description: 'Villa'
    },
    {
      realEstateTypeId: 7,
      typeName: 'POLJOPRIVREDNO ZEMLJIŠTE',
      description: 'Villa'
    },
    {
      realEstateTypeId: 8,
      typeName: 'GRAĐEVNO ZEMLJIŠTE',
      description: 'Villa'
    },
    {
      realEstateTypeId: 9,
      typeName: 'VILA',
      description: 'Villa'
    },
  ]

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
  addRealEstate(realEstate: RealEstateDetails): Observable<RealEstateDetails> {
    return this.http.post<RealEstateDetails>(
      environment.apiUrl + '/real-estates/add',
      realEstate
    ).pipe(map((res) => res as any || null))
  }

  //TODO: dodaj backend
  updateRealEstate(realEstate: RealEstateDetails): Observable<RealEstateDetails> {
    return this.http.put<RealEstateDetails>(
      environment.apiUrl + `/real-estates/update/${realEstate.id}`,
      realEstate
    ).pipe(map((res) => res as any || null))
  }

  //TODO: dodaj backend
  deleteRealEstate(realEstateId: number): Observable<RealEstateDetails> {
    return this.http.delete(
      environment.apiUrl + `/real-estates/delete/${realEstateId}`
    ).pipe(map((res) => res as any || null))
  }

  //TODO: dodaj backend
  getRealEstateTypes(): Observable<RealEstateType[]> {
    return this.http.get<RealEstateType[]>(
      environment.apiUrl + '/real-estates/types'
    ).pipe(map((res) => res as RealEstateType[] || null))
  }

  //TODO: backend
  getContentByRealEstateId(realEstateId: number): Observable<RealEstateContent[]> {
    return this.http.get<RealEstateContent[]>(
      environment.apiUrl + `real-estates/content/${realEstateId}`
    ).pipe(map((res) => res as RealEstateContent[] || null))
  }

}
