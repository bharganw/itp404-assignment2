//Has code for loading message

let reposTemplate = $('template#repos-template').html();
let renderRepos = Handlebars.compile(reposTemplate);

let allRepos;

$('#search-button').on('click', function() {
  let searchTerm = $('#new-search-field').val();
  
  $('#loadingmessage').show();
  $.ajax({
    type: 'GET',
    url: `https://www.reddit.com/r/${searchTerm}.json`
  }).done(function(repos) {
  	$('#loadingmessage').hide();
  	console.log(repos.data.children);
    allRepos = repos.data.children;
    renderAllRepos(allRepos);
  }).fail(function (repos) {
  	$('#loadingmessage').hide();
  	$('#repos-list').html("Oops! Something went wrong!");
  });
});

function renderAllRepos(repos) {
  let reposHTML = renderRepos({
    repos: repos
  });
  $('#repos-list').html(reposHTML);
}