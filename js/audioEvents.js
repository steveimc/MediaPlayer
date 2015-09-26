var rewindInterval;
var forwardInterval;
var lastId;

// This js file has all the methodsto handle sound events
function playSong()
{
	if(mySong != null)
	{
		mySong.stop();
	}
	bindSong();
	changeCurrentPlaying();
}

function stopSong()
{
	if(mySong != null)
		mySong.stop();
}

function togglePlay()
{
	if(mySong != null)
	{
		clearRewind();
		clearForward();
		mySong.togglePlay();
	}
}

function playNext()
{
	id++;
	if(id > playList.length - 1)
	{
		id = 0;
	}
	stopSong();
	bindSong();
	changeCurrentPlaying();
}

function playPrevious()
{
	id--;
	if(id < 0)
	{
		id = playList.length - 1;
	}
	stopSong();
	bindSong();
	changeCurrentPlaying();
}

function fastForward()
{
	if(mySong != null)
	{
		clearRewind();
		forwardInterval = setInterval(function ()
		{
				if(	mySong.getPercent()<100)
					mySong.setPercent(mySong.getPercent() + 1);
				else
					clearInterval(forwardInterval);
		}, 100);
	}
}

function fastRewind()
{
	if(mySong != null)
	{
		clearForward();
		rewindInterval = setInterval(function ()
		{
				if(	mySong.getPercent()>0)
					mySong.setPercent(mySong.getPercent() - 1);
				else
					clearInterval(rewindInterval);
		}, 100);
	}
}

// Bind each song to listen to some events
function bindSong()
{
	mySong = new buzz.sound(songPath+playList[id]);
	mySong.play();

	if(mySong != null)
	{
		clearRewind();
		clearForward();

		mySong.bind("pause", function(e) {
			$('#play').html("play_arrow");
		});

		mySong.bind("play", function(e) {
			$('#play').html("pause");
		});

		mySong.bind("timeupdate", function(e) {
			$("#duration").html(buzz.toTimer( mySong.getTime())+"/"+buzz.toTimer( mySong.getDuration()));
			$("#time-bar").val(mySong.getPercent());
		});

		mySong.bind("ended", function(e) {
			playNext();
		});

		if(lastId != null)
		{
			$('#'+lastId).removeClass('selectedSong');
		}
		$('#'+id).addClass('selectedSong');

		lastId = id;
	}
}

function setPercent()
{
	if(mySong != null)
	{
		mySong.setPercent($("#time-bar").val());
	}
}

function clearRewind()
{
	if(rewindInterval != null)
	{
			clearInterval(rewindInterval);
	}
}

function clearForward()
{
	if(forwardInterval != null)
	{
			clearInterval(forwardInterval);
	}
}

function changeCurrentPlaying()
{
			songName = playList[id];
			songName = songName.replace('.mp3','');

			$("#song-playing").html(songName);
}
