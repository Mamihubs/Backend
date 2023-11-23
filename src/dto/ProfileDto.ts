export interface ProfileDoc {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNo?: string;
  street1?: string;
  street2?: string;
  dateOfBirth?: string;
  stateOfOrigin?: string;
  identificationDoc?: string;
  identificationNum?: string;
  identificationName?: string;
  passport?: string;
  active?: boolean;
  created_by?: object;
  updated_by?: object;
}
export interface VendorProfileDoc {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNo?: string;
  street1?: string;
  street2?: string;
  dateOfBirth?: string;
  stateOfOrigin?: string;
  identificationDoc?: string;
  identificationNum?: string;
  identificationName?: string;
  passport?: string;
  active?: boolean;
  created_by?: object;
  updated_by?: object;
  storeName?: string;
  storeDescription?: string;
  phoneNumber?: string;
}
