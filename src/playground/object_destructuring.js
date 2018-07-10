/*
	destructuring allows us to create variable out of object property
	person.name/person.age will have variable of its own
*/
const person = {
	name:"andrew",
	age:26,
	location:{
		city:"philadelphia",
		temp:92
	}
};

/*
	-to do object destructuring we assign the object person to another object with parameters same as person object which means
	person.name = name, person.age = age, person.location = location
*/
const {name, age, location} = person;
console.log(name +" name "+ age + " is my age ");
/*
	-another example to show how object destructuring cleans the coding
*/
const {city, temp} = person.location;
console.log("im living at "+city+" todays temperature is at "+temp );
/*
	-we can rename derstuctured object by adding colon after property ie
		const {city, temp: temperature} = person.location;
		console.log("current temperature " + temperature);
	FYI
		we can no longer use the original property since its already been assign to new name
*/

/*
	-another feature of object destructuring is setting default values ie
		const {name = "anonymous", age, location} = person;
		console.log(name +" name "+ age + " is my age ");
	-in this way if name property is not present, default property value will show
*/

/*exercise*/
const book = {
	title:"Ego is my enemy",
	author:"Ryan Holiday",
	publisher:{
		name:"penguin"
	}
}

const {name : publisher_name = "Self-published"} = book.publisher;

console.log(publisher_name);

