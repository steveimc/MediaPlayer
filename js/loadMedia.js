var songPath = "media/";
var playList = [];

function loadSongsFromServer()
{
  $.post( "server.php", function( data )
  {
    playList = $.parseJSON(data);
  })
  .done(function() {
    createPlayList();
  });
}

function uploadSong()
{
    var file_data = $('#fileToUpload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    $.ajax({
                url: 'upload.php', // point to server-side PHP script
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(response){
                    alert(response); // display response from the PHP script, if any
                    loadSongsFromServer();
                }
     });
}

function createPlayList()
{
  //<thead><tr><th>Song<th>Author<th>Album
  var content = '';
  $("#song-list").html(content);

  for (var i = 0; i < playList.length; i++)
  {
    var song = playList[i];
    song = song.replace('.mp3','');

    var newSongRow = '<tr id='+i+' class=song-row>';
    newSongRow +='<td>'+(i+1)+'</td>';
    newSongRow +='<td>'+song+'</td>';

/*
    var newSong = new buzz.sound(songPath+playList[i]);
    var songDuration = buzz.toTimer( newSong.load().getDuration());
    newSongRow +='<td>'+songDuration+'</td>';
*/
    newSongRow += "</tr>";

    $('#song-list').append(newSongRow);
  }

  $(".song-row").click(function()
  {
    id = this.id;
    playSong();
  });

}
