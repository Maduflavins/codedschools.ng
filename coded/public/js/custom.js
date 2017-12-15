$(function){
    $('#search').keyup(function(){
        var searc_term = $(this).val();

        $.ajax({
            method: 'POST',
            url: '/api/search',
            data: {
                search_term
            },
            dataType: 'json',
            success: function(json){
                var data= json.hits.hits.map(function(hit){
                    return hit;
                });

                $('#searchResults').empty();
                for(var i = 0; i < data.length; i++){
                    var html = "";
                    html += '<div class="col-md-4">';
                    html += '<a href="/product/' + products[i]._id + '">';
                    html += '<div class="thumbnail">';
                    html += '<img src="' + products[i].image  +'">';
                    html += '<div class="caption">';
                    html += '<h3>' + products[i].name +'">';
                    html += '<h3>' + products[i].category.name + '">';
                    html += '<h3>' + products[i].website  + '">';
                    html += '<h3>' + products[i].intro + '">';
                    html += '</div></div></a></div>';
                }

            },

            error: function(error){
                console.log(err);
            }
        })

    })
}