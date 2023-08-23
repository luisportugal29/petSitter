import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  name: string;

  @Expose()
  lastName: string;
}
