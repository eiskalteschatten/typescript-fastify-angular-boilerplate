import { UserRegistration } from '@tfab/shared';

export class RegistrationModel implements UserRegistration {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
}
