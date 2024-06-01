export interface Appointment {
  id: string;
  clientsId: string;
  providersId: string;
  startDate: Date;
  endDate: Date;
  providers: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
