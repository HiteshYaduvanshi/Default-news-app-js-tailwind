const apiKey = "e6369431471542caae49c1af6fb31767";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("india"));

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${apiKey}`);console.log(query);
    const data = await response.json();

    bindData(data.articles);
}

function bindData(articles){
    const newsContainer = document.getElementById('newsContainer');
    const newsTemplate = document.getElementById("newsTemplate")

    newsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        newsContainer.appendChild(cardClone);
    });

}
function fillDataInCard(cardClone, data){
    const newsImg = cardClone.querySelector("#newsImg");
    const newsTittle = cardClone.querySelector("#newsTittle");
    const newsSourse = cardClone.querySelector("#newsSourse");
    const newsDesc = cardClone.querySelector("#newsDesc");

    newsImg.src = data.urlToImage;
    newsTittle.innerHTML = data.title;
    newsDesc.innerHTML = data.description;

    const date = new Date(data.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
    })

    newsSourse.innerHTML = `${data.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(data.url, "_blank")
    })
}

let active = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    active?.classList.remove("text-blue-700");
    active = navItem;
    active.classList.add("text-blue-700")
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


searchBtn.addEventListener("click",() => {
    const searchValue = searchInput.value;
    if(!searchValue) return;
    fetchNews(searchValue);
    active?.classList.remove("text-blue-700");

})