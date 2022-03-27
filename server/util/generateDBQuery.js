// Creates query for retrieving objects that are included in $items and are specified in the $field
const getObjectArrQuery = (items, field) => {
	const itms = Array.isArray(items) ? items : [items];
	const matches = [];
	for (let x in itms) {
		matches.push({
			$elemMatch: { [field]: itms[x] },
		});
	}
	return { $all: matches };
};

const generateDBQuery = (query) => {
	let filters = {};

	// Check if query includes ranges between values
	const possibleRanges = ['time', 'rating', 'difficulty', 'serves'];
	for (let i in possibleRanges) {
		const field = possibleRanges[i];
		if (`${field}Rng` in query) {
			const vals = query[`${field}Rng`].split(':');
			filters[`averages.${field}`] = {
				$gte: vals[0],
				$lte: vals[1],
			};
		}
	}

	if ('badge' in query) {
		filters['badges'] = getObjectArrQuery(query.badge, 'name');
	}

	if ('ingredient' in query) {
		filters['ingredients'] = getObjectArrQuery(query.ingredient, 'name');
	}

	return filters;
};

module.exports = generateDBQuery;
