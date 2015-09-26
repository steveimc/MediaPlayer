<?php
// Get all files from path 
$dir = "media/";
$songs = scandir($dir,SCANDIR_SORT_ASCENDING);

foreach ($songs as $key => $value)
   {
      if (!in_array($value,array(".","..",".DS_Store")))
      {
        $result[] = $value;
      }
   }
// Return a Json file with the list of songs
echo json_encode($result);

?>
