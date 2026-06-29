export function getCookie(name: string){
  const cookies = document.cookie.split('; ');
  const found = cookies.find(c => c.startsWith(name + '='));
  return found ? decodeURIComponent(found.split('=')[1]) : "";
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}

