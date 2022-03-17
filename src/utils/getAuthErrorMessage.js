export const getAuthErrorMessage = (message) => {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'This email has already been registered';
    case 'EMAIL_NOT_FOUND':
      return 'Account with this email is not registered';
    case 'INVALID_PASSWORD':
      return 'Password is not correct';
    default:
      return 'Too many authentication requests';
  }
};
