function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie).split('; ');
  for (let cookie of decodedCookies) {
    if (cookie.includes(name + '=')) {
      return cookie.substr(name.length + 1);
    }
  }

  return false;
}

function saveCookie(data) {
  document.cookie = 'data=' + encodeURIComponent(JSON.stringify(data));
}

const cookieData = getCookie('data');
if (cookieData) {
  const data = JSON.parse(cookieData);
  if (data.error && data.error !== '') {
    const erroMensagem = document.querySelector('.erro');
    erroMensagem.innerHTML = data.error;
 
    data.error = '';
    saveCookie(data);
  }

  //Esse código só vai rodar na página de introdução
  if (document.title === 'Sistema' && data.text) {
    const textMensagem = document.querySelector('.text');
    textMensagem.innerHTML = data.text;
  }
}