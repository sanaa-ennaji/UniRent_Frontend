export interface PropertyRequest {
    title: string;
    address: string;
    price: number;
    available: boolean;
    description: string;
    type: string;
    landlordId: number;
    universityIds: number[];
    images: ImageRequest[];
    amenityIds: number[];
    start: string ; 
    personNumbers: number; 
  }

  export interface ImageRequest {
    imageUrl: string;
  }
  export interface PropertyResponse {
    id: number;
    title: string;
    address: string;
    price: number;
    available: boolean;
    description: string;
    type: string;
    landlordId: number;
    universityIds: number[];
    imageUrls: string[]; 
    amenities: AmenityResponse[];
    landlordName: string;
    start: string ; 
    personNumbers: number; 
  }
  
  export interface AmenityResponse {
    id: number;
    name: string;
  }
