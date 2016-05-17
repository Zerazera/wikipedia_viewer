$(document).ready(main);

function main() {
 $('#searchButton').on('click',searchHandler);
$('#searchBar').on('propertychange change keyup paste input',searchHandler);
}

function searchHandler() {
  if ($('#searchBar').val() !== '') searchWiki();
  else {
    $('.list-group').empty();
  }
}

function searchWiki() {
  $('#searchCaption').removeClass('hidden');
    $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType:'jsonp',
    type:'GET',
    data: {
      action:'opensearch',
      search:$('#searchBar').val(),
      redirects:'resolve',
      format:'json',
      warningsaserror:true
      }
  })

  .done(function(json){
      $('.list-group').empty();
      var re = new RegExp('(' + $('#searchBar').val().split(/[^A-Za-z0-9]/).join('|') + ')','gi'), resultNum = json[1].length;

   for (var i = 0; i < resultNum; i++) {
        $('.list-group').append($('<a class ="list-group-item" href="' + json[3][i] + '" target="_blank"></a>').html('<h3><strong>' + json[1][i].replace(re, '<span class="highlight">$1</span>') + '</strong></h3><br>' + json[2][i].replace(re, '<span class="highlight">$1</span>')));
      }
  })

  .fail(function(xhr, status, errorThrown) {
    //$('#here').text('Sorry, there was a problem!' + ' ' + errorThrown + ' ' + status + ' ' + xhr);
  })

    .always(function(xhr, status) {
      $('#searchCaption').addClass('hidden');
    });
}
