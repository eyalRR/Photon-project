const auth = "563492ad6f917000010000018a9cf4895c6343e28a2dd4c7accf695e";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//Event listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})
more.addEventListener("click", loadMore);

function updateInput(e){
    searchValue = e.target.value;
    //console.log(searchValue);
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        } 
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo =>{
        //console.log(photo);
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img> 
            `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    console.log(data);
    generatePictures(data);
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    console.log(data);
    generatePictures(data);
}

function clear(){
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    console.log(data);
    generatePictures(data);
}

curatedPhotos();
