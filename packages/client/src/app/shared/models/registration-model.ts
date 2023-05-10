import { UserRegistration } from '@tfab/shared';

export class RegistrationModel implements UserRegistration {
  email = '';
  firstName = '';
  lastName = '';
  password = '';
}
