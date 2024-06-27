export function validateLogin(str: string) {
  return new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/).test(str);
}

export function validatePassword(str: string) {
  return new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,40}$/).test(str);
}

export function validateName(str: string) {
  return new RegExp(/^[А-ЯA-Z][-а-яa-zА-ЯA-Z]*(?:[-а-яa-zА-ЯA-Z]+)*$/).test(str);
}

export function validateEmail(str: string) {
  return new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).test(str);
}

export function validatePhone(str: string) {
  return new RegExp(/^\+?\d{10,15}$/).test(str);
}
