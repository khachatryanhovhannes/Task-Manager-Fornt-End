function setToken(tokenName: string, token: string, remember: boolean) {
  if (remember) {
    document.cookie = `${tokenName}=${token}; expires=${new Date(
      Date.now() + 3600000
    ).toUTCString()}; path=/;`;
  } else {
    document.cookie = `accessToken=${token}; path=/;`;
  }
}

function getToken(tokenName: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${tokenName}=`)) {
      return cookie.substring(`${tokenName}=`.length, cookie.length);
    }
  }
  return null;
}

function deleteToken(tokenName: string): void {
  document.cookie = `${tokenName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}

export { getToken, deleteToken, setToken };
