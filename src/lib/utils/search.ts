const fuzzySearch = (items, query) => {
	const search = query?.toLowerCase().split(' ');

	console.log('search >>>', search);
	const ret = items.reduce((found, i) => {
		let matches = 0;
		search.forEach((s) => {
			let props = 0;
			for (const prop in i) {
				const p = i[prop]?.toString().toLowerCase();
				if (p?.indexOf(s) > -1) {
					props++;
				}
			}
			if (props >= 1) {
				matches++;
			}
		});
		if (matches == search.length) {
			found.push(i);
		}
		return found;
	}, []);
	return ret;
};

export default fuzzySearch;
