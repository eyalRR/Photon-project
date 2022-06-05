const auth = "563492ad6f917000010000018a9cf4895c6343e28a2dd4c7accf695e";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;


//Event listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchPhotos(searchValue);
})

function updateInput(e){
    searchValue = e.target.value;
    //console.log(searchValue);
}


async function curatedPhotos(){
    const dataFetch = await fetch(
        "https://api.pexels.com/v1/curated?per_page=15", 
        { 
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            } 
            
        }
    );
    const data = await dataFetch.json();
    console.log(data);
    data.photos.forEach(photo =>{
        //console.log(photo);
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

async function searchPhotos(query){
    const dataFetch = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15`, 
        { 
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            } 
            
        }
    );
    const data = await dataFetch.json();
    console.log(data);
    data.photos.forEach(photo =>{
        //console.log(photo);
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();
