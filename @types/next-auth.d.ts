import { DefaultSession } from "next-auth";
import { JWT } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    UserRoles: {
      id: string;
      usersId: string;
      rolesId: string;
      roles: {
        id: string;
        role: string;
      };
    }[];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    firstName: string;
    lastName: string;
    roles: string[];
  }
}
