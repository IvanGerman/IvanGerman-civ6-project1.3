export function changeUrl(hash) {
  let url_ob = new URL(document.URL);
  url_ob.hash = hash;
  // new url
  let new_url = url_ob.href;
  // change the current url
  document.location.href = new_url;
}