export const formatMonth = (monthNumber) => {
  switch (monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'Match';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
};

export const formatDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const diff = Date.now() - milliseconds;
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInYears = date.getFullYear() - new Date().getFullYear();

  if (diffInMinutes < 1) {
    return '1 minute ago';
  }
  if (diffInMinutes < 5) {
    return '5 minutes ago';
  }
  if (diffInMinutes < 10) {
    return '10 minutes ago';
  }
  if (diffInMinutes < 30) {
    return '30 minutes ago';
  }
  if (diffInHours < 24) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  if (diffInYears < 1) {
    return `${date.getDate()} ${formatMonth(date.getMonth())}`;
  }
  return `${date.getDate()} ${formatMonth(date.getMonth())} ${date.getFullYear()} Year`;
};
