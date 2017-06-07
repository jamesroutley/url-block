const savePattern = () => {
  const inputBox = document.getElementById('input');
  const pattern = inputBox.value
  if (pattern === '') {
    return
  }

  _getPatterns()
    .then((patterns) => {
      patterns.push(pattern)
      chrome.storage.sync.set({patterns: patterns}, () => {
        inputBox.value = '';
        console.debug(`Saving pattern: '${pattern}'`);
        loadPatterns();
      })
    })
};

const loadPatterns = () => {
  const patternList = document.getElementById('list')

  chrome.storage.sync.get({patterns: []}, (items) => {
    const patterns = items.patterns;
    _removeListItems(patternList);
    patterns.forEach((pattern) => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(pattern));
      patternList.appendChild(li);
    });
  })
};

const clearPatterns = () => {
  chrome.storage.sync.set({patterns: []}, () => {
    loadPatterns();
  })
}

const _getPatterns = (callback) => {
  const p = new Promise((resolve) => {
    chrome.storage.sync.get({patterns: []}, resolve);
  })
  return p.then((items) => items.patterns)
 };

const _removeListItems = (ul) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

document.addEventListener('DOMContentLoaded', loadPatterns);
document.getElementById('submit').addEventListener('click', savePattern);
document.getElementById('clear').addEventListener('click', clearPatterns);
