const SearchFrom = document.getElementById('search-form')
const SearchBox = document.getElementById('search-box')
const SearchResult = document.getElementById('search-result')
const ShowMore = document.getElementById('show-more')
const AccessKey = API_key;
let keyword =''
let page = 1

async function SearchImage() {
    try{
        keyword = SearchBox.value;
        let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=9&query=${keyword}&client_id=${AccessKey}`;
    
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results;
        
        results.map((result)=>{
            let imgResult = document.createElement('img');
            imgResult.src = result.urls.small;
            SearchResult.appendChild(imgResult)
        })
        
        if(results != ''){
            ShowMore.style.display = 'block'
        }
    }catch(error){
        console.error(error)
        ShowMore.style.display = 'none';
    }
}

SearchFrom.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(page >= 1){
        SearchResult.innerHTML = '';
    }
    page = 1;
    SearchImage()
})

ShowMore.addEventListener('click',()=>{
    page++;
    SearchImage()
})