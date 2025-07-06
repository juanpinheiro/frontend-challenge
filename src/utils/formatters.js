export const capitalize = str => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const maskPassword = password => {
  if (!password || typeof password !== 'string') return '';
  return '*'.repeat(password.length);
};
