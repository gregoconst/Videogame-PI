export const GetVideogamesList = (array, min, max) => {
	if (!min && !max) {
		//return array.slice(0, 15);
		return array;
	}
	return array.slice(min, max);
};

export const GetVideogameOrigin = (origin, array) => {
	switch (origin) {
		case 'RawgAPI':
			return array.filter((el) => typeof el.id === 'number');

		case 'VideogamesDB':
			let reg_ex = /-/;
			return array.filter((el) => el.id.toString().search(reg_ex) !== -1);

		case 'All':
			return array;

		default:
			return array;
	}
};