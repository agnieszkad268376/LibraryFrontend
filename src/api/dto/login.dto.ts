export class LoginDto {
  userName: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  token: string | undefined;
}
