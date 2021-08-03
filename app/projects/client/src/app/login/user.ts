export interface User {
  default: boolean;
  email: string;
  team: string;
}

export class UserDefault implements User {
  default = true;
  email = '';
  team = '';
}
