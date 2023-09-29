

async function shortenLink() {

  // get input element
  const _urlInput = document.getElementById('urlInput');

  // Check if input is valid
  const expression =/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  
  if(!_urlInput.value || !_urlInput.value.match(regex)) 
    return alert('Please input a valid URL');

  const data = {"long_url": _urlInput.value};

  // SET HERE YOUR ACCESS TOKEN
  const Bearer_TOKEN = '<YOUR_ACCESS_TOKEN>';

  // post to bitly
  const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: 'post',
    headers: new Headers({
      'Authorization': `Bearer ${Bearer_TOKEN}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  })

  // get back json with the shorten link
  const responseData = await res.json();

  // send a materialize toast with a copy button
  const toastHTML = `<span>${responseData.link}</span><button onclick="copy('${responseData.link}')" class="btn-flat toast-action">Copy</button>`;

  M.toast({html: toastHTML})
}


async function copy(text) {
  await navigator.clipboard.writeText(text);
}

