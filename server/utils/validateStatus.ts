import { UserStatus } from '../types/User';

const validStatuses: UserStatus[] = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
];

export const isValidStatus = (status: any): status is UserStatus => {
  return validStatuses.includes(status);
};
