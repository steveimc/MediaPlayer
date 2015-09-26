<?php
$target_dir = "media/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$file_type = getFileType($_FILES["file"]["name"]);

//Only mp3 and ogg file supported
if($file_type != "mp3" && $file_type != "ogg")
{
    echo "Sorry, only MP3 & OGG files are allowed.";
    return;
}
// Check if file already exists
if (file_exists($target_file))
{
  echo "Sorry, file already exists.";
  return;
}

// Try to upload to server
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
{
    $response = "The file has been uploaded.";
    echo $response;
    return;
}
else
{
    $response =  "Sorry, there was an error uploading your file.";
    echo $response;
    return;
}

function getFileType($file)
{
    $path_chunks = explode("/", $file);
    $thefile = $path_chunks[count($path_chunks) - 1];
    $dotpos = strrpos($thefile, ".");
    return strtolower(substr($thefile, $dotpos + 1));
}
?>
