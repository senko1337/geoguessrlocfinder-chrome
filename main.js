document.addEventListener('DOMContentLoaded', () => {
	const query = { active: true, currentWindow: true };
	chrome.tabs.query(query, (tabs) => {
		var url = tabs[0].url;
		var site = new URL(url);
		if (site.hostname == 'www.geoguessr.com') {
			chrome.tabs.executeScript(tabs[0].id, {
				code: `
					// https://gist.github.com/s3nk0s4n/9b0d7b0709b52a078bc7bf134db9dcd3
					var path_tags  = document.getElementsByTagName('path');
					for (let i = 0; i < path_tags.length; i++) {
						if (path_tags[i].attributes['pano'] !== undefined) {
							console.log(path_tags[i].getAttribute('pano'));
							window.open('https://www.google.com/maps/@?api=1&map_action=pano&pano=' + path_tags[i].getAttribute('pano'), '_blank');
							break;
						}
					}
				`
			}, () => chrome.runtime.lastError); 
		}
	});
});
