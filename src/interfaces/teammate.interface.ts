export interface TeammateData {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}