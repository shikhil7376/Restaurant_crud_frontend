export interface FormDetails {
    restaurantName: string;
    address: string;
    contactNo: string;
    image: File | null;
  }
  
  export interface ValidationErrors {
    restaurantName: string;
    address: string;
    contactNo: string;
    image: string;
  }
  

  export interface getDetails extends ValidationErrors{
    id:string
  }