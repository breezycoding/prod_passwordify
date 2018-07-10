const address = ["block 46 lot 17 maunlad ave menzyland subd", "mojon", "malolos bulacan", "3000"];
/*
	unlike object destructuring that object are match by name, array destructuring is match by position
*/
const [street, barangay, city, zip_code] = address;
console.log("im living at "+street);

/*
	to skip some items in array we can leave a space and a comma
	const [, barangay, city, zip_code] = address;
*/

/*
	to set up default
	const [street = "walang street", barangay, city, zip_code] = address;
*/