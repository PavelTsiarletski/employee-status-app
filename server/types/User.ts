export type UserStatus =
  | 'Working'
  | 'OnVacation'
  | 'LunchTime'
  | 'BusinessTrip';

export interface User {
  id: string;
  name: string;
  status: UserStatus;
  img?: string;
}
