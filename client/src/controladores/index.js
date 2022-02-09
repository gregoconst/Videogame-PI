export const GetVideogamesList = (array, min, max) => {
	if (!min && !max) {
		//return array.slice(0, 15);
		return array;
	}
	return array.slice(min, max);
};