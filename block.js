const displaySourceURL = () => {
  const sourceUrl = window.location.hash.substring(1);
  const p = document.getElementById('url');
  p.innerHTML = sourceUrl;
}

document.addEventListener('DOMContentLoaded', displaySourceURL);
