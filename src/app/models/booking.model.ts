export interface BookingRequestDTO {
    startDate: string; 
    endDate: string; 
    propertyId: number;
    status?: string; 
    studentId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
  }