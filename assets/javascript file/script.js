const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>TechNews.com</h1>`;
var allStory = [];
var request = new XMLHttpRequest();
request.open(
  'GET',
  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
  false
);
request.send();
if (request.status === 200) {
  var data = JSON.parse(request.responseText);
  allStory = data;
} else {
  console.error('Error:', request.status);
}

var arrayStory = [];
var promiseArray = [];
var x = allStory.length;
console.log(allStory);
console.log(x);

function more10Story() {
    arrayStory = [];
    for (let i = 0; i < 10; i++) {
      var id = allStory[x - 1];
      var request = new XMLHttpRequest();
      request.open(
        'GET',
        'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty',
        false
      );
      request.send();
      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        arrayStory.push(data);
      } else {
        console.error('Error:', request.status);
      }
      x = x - 1; 
    }
  }
  

function createArticle() {
  more10Story();
  let i = 0;
  for (i = 0; i < arrayStory.length; i++) {
    var articolo = document.createElement('div');
    var titolo = document.createElement('h3');
    var data = document.createElement('h5');
    var url = document.createElement('a');
    articolo.className = 'contenitoreArticolo';
    titolo.className = 'title';
    data.className = 'data';
    url.className = 'url';
    var dataOggetto = new Date(arrayStory[i].time * 1000);
    var dataString =
      dataOggetto.getFullYear() +
      '/' +
      (dataOggetto.getMonth() + 1) +
      '/' +
      dataOggetto.getDate();
    data.innerHTML = dataString;
    titolo.innerHTML = arrayStory[i].title;
    url.innerHTML = 'link';
    url.setAttribute('href', arrayStory[i].url);
    articolo.appendChild(data);
    articolo.appendChild(titolo);
    articolo.appendChild(url);
    document.getElementById('ctn').appendChild(articolo);
  }
}

document.getElementById('button').addEventListener('click', createArticle);
createArticle();
console.log(allStory.length);
