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

export const validateErrors = (dataForm) => {
    let errors = {};
    if (!dataForm.name) {
      errors.name = "Each game must have a Name!";
    } else if (!dataForm.img) {
      errors.img = "Image must have a valid Link.";
    } else if (!dataForm.description || dataForm.lenght > 3) {
      errors.description = "Description must be present...";
    } else if (!dataForm.released) {
      errors.released = "Game must have a release date";
    } else if (
      !dataForm.rating ||
      dataForm.rating === 0 ||
      dataForm.rating === "" ||
      dataForm.rating < 1 ||
      dataForm.rating >= 5
    ) {
      errors.rating = "Game Rating must be from 1 to 5 points.";
    }
    return errors;
  }