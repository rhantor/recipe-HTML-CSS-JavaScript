const searchForm = document.querySelector("form");
let searchInput = document.querySelector("input");
const searchDiv = document.querySelector(".search-result");
const search_icon = document.querySelector(".search-icon");
let viewMore = document.querySelector(".view-item-btn");


//
const Api_id = "dee9a2e8";
const Api_key = "b2d41641e0b0f80382e3ef220b8c1cc6";

let searchItem;

// Event Listener

search_icon.addEventListener("click", () => {
  let inputvalue = searchInput.value;

  const baseUrl = `https://api.edamam.com/search?q=${inputvalue}&app_id=${Api_id}&app_key=${Api_key}&from=0&to=20`;

  function fetchApi() {
    fetch(baseUrl)
      .then((respone) => respone.json())
      .then((data) => {
        if (data.hits.length === 0) {
          alert("sorry your search item is not available");
          generateHtml(data.hits);
        } else {
          generateHtml(data.hits);
        }
      });
  }
  fetchApi();
  inputvalue = "";
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputvalue = searchInput.value;

  const baseUrl = `https://api.edamam.com/search?q=${inputvalue}&app_id=${Api_id}&app_key=${Api_key}&from=0&to=20`;

  function fetchApi() {
    fetch(baseUrl)
      .then((respone) => respone.json())
      .then((data) => {
        console.log(data);
        if (data.hits.length === 0) {
          alert("sorry your search item is not available");
          generateHtml(data.hits);
        } else {
          generateHtml(data.hits);
        }
      });
  }
  fetchApi();
});

// Functions

function generateHtml(results) {
  let generatedHtml = "";
  results.map((result) => {
    console.log(result);
    generatedHtml += `
       <div class="item">
                    <img src="${result.recipe.image}" alt="food-img">

                    <div class="food-title">
                        <h2>${result.recipe.label}</h2>
                        <a href="${result.recipe.url}" target="_blank" class="view-item-btn">View Recipe</a>
                    </div>
                    <div class="item-data">
                        <p> Total calories is ${Math.floor(
                          result.recipe.calories
                        )}</p>
                        <p> Diet Label is -- ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'Nothing'}</p>
                        <p> Cuisine type is -- ${
                          result.recipe.cuisineType !== undefined ? result.recipe.cuisineType : "Unknown" }</p>
                    </div>
                </div>
       
       `;
  });

  searchDiv.innerHTML = generatedHtml;
}

window.addEventListener("scroll", () => {
  let navBar = document.querySelector(".search-bar");
  let windowScroll = scrollY > 100;
  navBar.classList.toggle("scrolling-nav", windowScroll);
});
