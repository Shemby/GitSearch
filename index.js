'use strict';

const searchUrl = 'https://api.github.com/search/users';

function display(responseJson) {
  $('#results-list').empty();

  responseJson.items.forEach(item => {
    const listItem = $(`<li>
    <h3><a href='${item.html_url}' target="_blank">${item.login}</a></h3>
    <ul class="repos"></ul>
    </li>`);
    $('#results-list').append(listItem);
    getRepos(item.repos_url, listItem);
    });
    $('#results').removeClass('hidden')
}
function getRepos(url, listItem){
    getData(url)
        .then(responseJson => {
            listItem
                .find('.repos')
                .html(responseJson
                    .map(i => `<li><a href="${i.html-url}">${i.html-url}</a></li>`)
                    .join(''));
        });

}
function getUser(event) {
    event.preventDefault();
    const query = $('#js-search-user').val();
    const url = `${searchUrl}?q=${query} `;

    getData(url)
        .then(responseJson => {
            display(responseJson);
        });
}

function getData(url){
    return fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(resopnse.statusText);
    })
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message} `);
    });
}

function listen(){
    $('form').submit(getUser);
}

$(listen);