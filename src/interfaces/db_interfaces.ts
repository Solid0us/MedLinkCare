export interface Appointment {
  id: string;
  clientsId: string | null;
  providersId: string;
  startDate: Date;
  endDate: Date;
  appointmentReasonsId: string | null;
  locationsId: string;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRoles {
  id: string;
  usersId: string;
  rolesId: string;
}

export interface Roles {
  id: string;
  role: string;
}

export interface Locations {
  id: string;
  address: string;
}

export interface AppointmentReasons {
  id: string;
  reason: string;
  description: string;
  priceInCents?: number;
}

export interface AppointmentInvoices {
  id: string;
  invoiceDate: Date;
  dueDate: Date;
  usersId: string;
}

export interface AppointmentInvoiceDetails {
  id: string;
  quantity: number;
  lineTotalInCents: BigInt;
  appointmentInvoiceId: string;
  appointmentReasonsId: string;
}

export interface AppointmentPayments {
  id: string;
  amountPaidInCents: number;
  transactionDate: Date;
  appointmentInvoiceId: string;
}
