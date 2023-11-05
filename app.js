let input = document.querySelector('input');
let btn = document.querySelector('button');
let list = document.querySelector('#list');

function handleevent(){
    let searchtxt = input.value;//will take the name of the movie
    fetchData(searchtxt);
    console.log(searchtxt);
    input.value='';
}


// button pr click krne pr search krega
btn.addEventListener('click',handleevent);

// enter key press krne pr search krega
input.addEventListener('keydown', (event)=>{
    if(event.code==='Enter'){
        handleevent();
    }
});

// data fetch krkr layega
function fetchData(searchtxt){
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchtxt}`)
    .then(function(response){
        manipulateDom(response.data);
       // console.log("hn bhai aa gya");

        console.log(response);
    })
    .catch(()=>{
        // do nthg
      //  console.log("hn bhai aa gya mza");
    })
}

// dom ko manipulate krega mtlb show krega saare items
function manipulateDom(datas){
    list.innerHTML='';
     for(let data of datas){
        let figure = document.createElement('figure');
       // console.log("wes");
        if(data.show.image){
            figure.innerHTML = `
            <img src=${data.show.image.original} alt="">
            <h3 id="movie_name">${data.show.name}</h3>
            <span class="summary">
                <h3>Score: ${data.score}</h3>
                ${data.show.rating.average ? `<h3>Rating:${data.show.rating.average}</h3>` : '<h3>Rating:Not available.</h3>'}
                ${data.show.summary ? `<p>${data.show.summary}</p>` : '<p>No summary available.</p>'}
            </span>
            `;
            list.appendChild(figure);// search krne pr dikhna chaiye isliye add kra hai
        }
    }
}

