// Fetch Breed List Data from API
const fetchBreedList = async () => {
	try {
		const resp = await fetch('https://dog.ceo/api/breeds/list/all');
		const data = await resp.json();
		populateBreedList(data.message);
		console.log(data.message);
	} catch (err) {
		console.log(err);
	}
};
fetchBreedList();

// Populate "Select" Element with Breed List Data
const populateBreedList = (breeds) => {
	document.querySelector('.select').innerHTML = `
            <option>Select a Breed</option>
            ${Object.keys(breeds)
				.map((breed) => {
					return `
                    <option>${breed}</option>
                    `;
				})
				.join('')}
        </select>`;
};

// Fetch Breed Data when a Breed is Selected
const select = document.querySelector('.select');

const fetchBreed = async () => {
	const breed = select.value;

	try {
		if (breed !== 'Select a Breed') {
			const resp = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
			const data = await resp.json();
			renderBreedImage(data.message);
			console.log(data.message);
		} else {
			console.log('Breed not Selected');
		}
	} catch (err) {
		console.log(err);
	}
};

select.addEventListener('change', fetchBreed);

// Renders Random Image of Selected Breed
const renderBreedImage = (image) => {
	let randomNum = Math.floor(Math.random() * image.length);

	document.querySelector('.image-container').innerHTML = `
	<img class='image' src="${image[randomNum]}" />
	`;
};
