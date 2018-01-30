var selection = ['Selections','Home', 'Business','Technology','Science','Health','Movies'];
$('select').selectric();



$(document).ready(function() {

    createSelection(selection, $('#mySelect'));
    $('#mySelect').on('change', function(){ 
        var first = "https://api.nytimes.com/svc/topstories/v2/";
        var second = $('#mySelect').val().toLowerCase() + ".json";
        var third = '?' + $.param({'api-key': "b3153ed3c81b4d61a5bec068fddc4466"}); 
        var url = first + second + third;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        })
        .done(function(data){ 
            newTemplate(data);       
        });
    });
});

function newTemplate(data){
    $('.news').empty();
    for(var i=0; i<12; i++){
        
        var $newTemp = $('<div></div>');
        $newTemp.addClass('all_News');
     
        $('.news').append($newTemp);
            // new title
            var $newTitle = $('<a><p></p></a>');
            $newTitle.attr({'href': data.results[i].url, 'target': '_blank'});
            
            $newTitle.css('background-image', 'url(' + ( data.results[i].multimedia[4].url )+ ')');
            
            $newTitle.children().text(data.results[i].abstract);
            $($newTemp).append($newTitle);
    }
}


function createSelection (array, selectId){
    selectId.empty();
    for(var i= 0; i < array.length; i++){
        selectId.append('<option></option>');
        selectId.children().last('option').attr({'value': array[i]}).text(array[i]);
    }
    selectId.selectric('refresh');
}
