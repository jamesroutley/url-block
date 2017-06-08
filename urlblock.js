const main = () => {
	chrome.webNavigation.onBeforeNavigate.addListener(
		block, {url: [{schemes: ['http', 'https']}]}
	)
}

const block = (data) => {
	const url = data.url;
	urlInWhitelist(url, (allow) => {
		if (!allow) {
			const blockedPageURL = chrome.extension.getURL('block.html')
			const tabId = data.tabId;
			console.debug(`Blocking ${url}`);
			chrome.tabs.update(tabId, {url: `${blockedPageURL}#${url}`});
		} else {
			console.debug(`URL allowed: ${url}`)
		}
	})
}

const urlInWhitelist = (url, callback) => {
	chrome.storage.sync.get({patterns: []}, (items) => {
		const patterns = items.patterns
		result = patterns.find((pattern) => url.match(new RegExp(pattern)) !== null);
		callback(result !== undefined);
	})
}

main()
