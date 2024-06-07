export interface Appointment {
  id: string;
  clientsId: string | null;
  providersId: string;
  startDate: Date;
  endDate: Date;
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
