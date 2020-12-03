
//api call to get the random quote
async function randomQuote() {
    let res = await fetch('https://api.quotable.io/random');
    let data = await res.json();
    if (res.ok) {

        insertQuotes(data.content, data.author);
    } else {
        console.log(data.error());
    }
}

//inserting the quotes and author inside the html page
function insertQuotes(randQuote, author) {
    // let quote = document.getElementById('quotes');
    // quote.innerHTML += `<p> ${randQuote} </p>`;

    //gets the element which has the id and then appends the whole 
    let element = document.getElementById('quotes');
    let quoteTag = insertTag(randQuote);
    let authorTag = insertTag(author);
    element.appendChild(quoteTag);
    element.appendChild(authorTag);
}

//responsible only for creating p tag and adding inputs inside that p tag 
function insertTag(inputs) {
    let tag = document.createElement('p'); //creates <p> tag
    let text = document.createTextNode(inputs);  //basically all the string --> quotes
    return tag.appendChild(text);    //<p> life is great </p>
}