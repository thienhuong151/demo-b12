let privateKey = "c6d24f0841f623c9f50b97be32c678f244490fb4";
let publicKey = "5ebba1e85656df8634f5cebd6b6622e1";
let apiURL = "https://gateway.marvel.com:443/v1/public/characters";

function fetchCharacters(result) {
	for (i = 0; i < result.length; i++) {
		let name = data.data.results[i].name;
		console.log(name);
		let path = data.data.results[i].thumbnail.path;
		console.log(path);
		let extension = data.data.results[i].thumbnail.extension;
		console.log(extension);
		console.log(path + "." + extension);
		let available = data.data.results[i].comics.available;
		console.log(available);
		character += `
    <div class="character">
    <img src="${path + "." + extension}" alt="">
    <h5>Name: ${name} </h5>
    <h6>Comic:${available} </h6>
    `;
	}
}

let key = marvelKey(privateKey, publicKey);
console.log(key);

let fullURL = `${apiURL}?${key}`;
console.log(fullURL);

let character = "";

async function getCharacter() {
	let marveldata = await fetch(fullURL);
	let data = await marveldata.json();
	console.log(data);
	let result = data.data.results;
	// console.log(result);

	for (i = 0; i < result.length; i++) {
		let name = data.data.results[i].name;
		// console.log(name);
		let path = data.data.results[i].thumbnail.path;
		// console.log(path);
		let extension = data.data.results[i].thumbnail.extension;
		// console.log(extension);
		// console.log(path + "." + extension);
		let available = data.data.results[i].comics.available;
		// console.log(available);
		character += `
    <div id="character"> 
    <a id="character" href="">
    <img src="${path + "." + extension}" alt="">
    <h5>Name: ${name} </h5>
    </a>
    <h6>Comic:${available} </h6>
    </div>
    `;
	}

	$("#content").html(character);
}
getCharacter();

let characters = "";
var btnSearch = document.getElementById("btn_search");
btnSearch.addEventListener(
	"click",
	// $('#btn_search').on('click',function(){})

	async function (e) {
		// console.log ("Search clicked")
		let searchBar = document.getElementById("search_bar");
		let searchContent = searchBar.value;
		let key = marvelKey(privateKey, publicKey);
		let fullURL = `${apiURL}?${key}&nameStartsWith=${searchBar.value}`;

		let dataS = await fetch(fullURL);
		let searchCC = await dataS.json();
		console.log(searchCC);
		console.log(fullURL);

		let result = searchCC.data.results;
		for (i = 0; i < result.length; i++) {
			let name = searchCC.data.results[i].name;
			let path = searchCC.data.results[i].thumbnail.path;
			let extension = searchCC.data.results[i].thumbnail.extension;
			let available = searchCC.data.results[i].comics.available;

			characters += `
      <a href="" id="character">
      <div id="character">
      <a id="character" href="">
      <img src="${path + "." + extension}" alt="">
      <h5>Name: ${name} </h5>
      </a>
  <h6>Comic:${available} </h6>
  </div>
  </a>
  `;
			$("#content").html(characters);
		}
	}
);

// function renderData(results) {
//   let dataS = await fetch(fullURL);
//   let searchCC = await dataS.json();
//   let result = searchCC.data.results;
//   let renderData=""
//   for (i = 0; i < result.length; i++) {
//   let name = searchCC.data.results[i].name;
//   let path = searchCC.data.results[i].thumbnail.path;
//   let extension = searchCC.data.results[i].thumbnail.extension;
//   let available = searchCC.data.results[i].comics.available;

//   renderData += `
// <div class="character">
// <img src="${path + "." + extension}" alt="">
// <h5>Name: ${name} </h5>
// <h6>Comic:${available} </h6>
// </div>
// `;
//   }
//   $("#content").html(renderData);
// }
