import { RealEstateContent } from './real-estate-content.model';
import { RealEstateType } from './real-estate-type.model';

export interface RealEstateDetails {
    // TODO: dodaj atribute
    id: number;
    realEstateName: String;
    price: number;
    realEstateCountry: String;
    realEstateCity: String;
    realEstateType: RealEstateType;
    content: RealEstateContent[];


}
