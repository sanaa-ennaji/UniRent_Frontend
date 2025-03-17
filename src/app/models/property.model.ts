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
    amenityProperties: AmenityPropertyRequest[];
  }
  
  export interface ImageRequest {
    imageUrl: string;
  }
  
  export interface AmenityPropertyRequest {
    quantity: number;
    amenityId: number;
  }