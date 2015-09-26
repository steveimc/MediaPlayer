var mySong;
var id = 0;
var songName;

// This js file has all the inputs to listen to
$(document).ready(function() {

	$("#play").click(function()
	{
		togglePlay();
	});

	$("#next").click(function()
	{
		playNext();
	});

	$("#previous").click(function()
	{
		playPrevious();
	});

	$("#forward").click(function()
	{
		fastForward();
	});

	$("#rewind").click(function()
	{
		fastRewind();
	});

	$("#time-bar").click(function()
	{
		setPercent();
	});

	$("#upload").click(function()
	{
		uploadSong();
	});

	$(function() {
     $("input:file").change(function (){
       var fullPath = $(this).val();
			 var fileName = fullPath.replace(/^.*[\\\/]/, '');
       $("#song-upload-name").html(fileName);
     });
  });

});
