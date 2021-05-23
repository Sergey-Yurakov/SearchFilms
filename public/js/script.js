let id = '';

$('#but').click(function() {

    $.ajax({
        url: 'https://www.omdbapi.com/?apikey=a2b07930&s='+ $('#search').val(),
        type: 'GET',

        success: function(data) {
            console.log(data);
            if(data.Response == 'True') {
                $('.kino').html('');

                for (let i in data.Search) {
                    id = data.Search[i].imdbID;

                    $('.kino').append(
                        $('<div class="col gy-4">').append(
                            "<div class='text'>" + data.Search[i].Title + "</div>" +
                            "<div class='text'>" + data.Search[i].Year + "</div>" +
                            // "<img src = " + data.Search[i].Poster + " class='posterImg' data-index='"+id+"' >"
                            "<img src = " + data.Search[i].Poster + " class='posterImg' data-index='"+id+"' data-bs-toggle='modal' data-bs-target='#exampleModal ' >"
                        )

                    )

                }

            } else {
                $('.kino').append(
                    alert('Введите корректный запрос')
                )
            }

        },
        error: function() {
            alert(404);
        }
    })
});



$(document).on('click','img.posterImg', function(e) {
    const img = $('loader');
    const loader = img.find('span');
    console.log(e.target.dataset.index);
    $.ajax({
        url: "https://imdb-api.com/ru/API/Title/k_66zmdj6c/"+e.target.dataset.index+"/Trailer,",
        type: 'GET',
        beforeSend: function() {
            $('.loader').removeClass('loaderOf');
            $('.filmsMore').html('');
        },
        success: function(filmRep) {
            $('.loader').addClass('loaderOf');

            console.log(filmRep);
            let keys = Object.keys(filmRep.actorList);

            $('.filmsMore')
                .append( $('<h6>Рейтинг IMDB : </h6>')
                    .append(filmRep.imDbRating)
                    .append( $('<hr>')) );



            $('.filmsMore').append( $('<div> Жанр : </div>')
                .append(filmRep.genres) );

            $('.filmsMore').append( $('<div> Режисер : </div>')
                .append(filmRep.directors) );

            $('.filmsMore').append( $('<div> Актерский состав : </div>')
                .append(filmRep.stars) );

            if(filmRep.plotLocal !== '') {
                $('.filmsMore').append( $('<div> Описание : </div>')
                    .append(filmRep.plotLocal) );
            } else {
                $('.filmsMore').append( $('<div> Описание : </div>')
                    .append(filmRep.plot) );
            }


            $('.filmsMore').append( $('<video controls="controls" width="450" poster=' +filmRep.trailer.thumbnailUrl+ '>')
                .append( $('<source type="video" src=' +filmRep.trailer.link+ '>') ) );




        },
        error: function() {
            alert(404);
        }

    })
})







