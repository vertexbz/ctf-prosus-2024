<?php
$uri = preg_replace('/\.\.+$/', '.', $_SERVER["REQUEST_URI"]);
$uri = preg_replace('/\/\/+$/', '/', $uri);
$uri = ltrim(str_replace('./', '', $uri), '/');
if (!in_array($uri, ['', 'index.php'])) {
    if ($uri != 'flag.txt' && file_exists($uri)) {
        return false;    // serve the requested resource as-is.
    }
    die('Not Found');
}

?><html>
    <title>***An error occured***</title>
    <style>

        @font-face {
            font-family: 'windowsFont';
            src: url('/font_bsod.ttf');
        }

        body,input,button {
            font-family: 'windowsFont';
            color: #FFFF;
            font-size: 22px;
            background-color: #0000aa ;
            padding: 30px;
        }

        #box {
            color: white;
            border: 1px solid white;
            padding: 10px;
            width: 600px;
        }

        #errorText {
            color: yellow;
        }

        span {
            margin-top: 20px;
            background-color: #aaaaaa;
            padding: 5px;
            color: 0000aa;
        }

    </style>
<body>
    <br/>
<center>
<span><b>Tama-OS</b></span>
</center>

<p>An error has occurred. To continue:</p>

<p>Upload your Tamagotchi, or</p>

<p>Press CTRL+ALT+DEL to restart your computer. If you do this,<br/>
you will lose any unsaved information in all open applications.</p>

<p>Error: 0E : 016F : BFF9B3D4</p>

<p>Upload any file to continue _</p>

<center>

    <div>
        <div id="box">
            <p>
                In order to defend the incoming threat, upload your Tamagotchi into the mainframe.
            </p>
            <form action="/" method="post" enctype="multipart/form-data">
                <input type="file" name="tama_data" id="tama_data"></input>
                <button type="submit">Upload</button>
            </form>
            <p id="errorText">
<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $uploadDirectory = 'uploads/';
        $uploadedFileName = $_FILES['tama_data']['name'];
        $uploadedFile = $_FILES['tama_data']['tmp_name'];

        // Check if the file has a ".tama" in its name
        if (stripos($uploadedFileName, '.tama') !== false) {

            // Check the first 4 bytes of the file for "2e54414d41" (PNG file signature)
            $fileContents = file_get_contents($uploadedFile);
            $fileSignature = bin2hex(substr($fileContents, 0, 5));

            if (strpos($fileSignature, '2e54414d41') !== false) {
                $destinationPath = $uploadDirectory . $uploadedFileName;

                if (move_uploaded_file($uploadedFile, $destinationPath)) {
                    echo "File uploaded successfully and is a valid TAMA file. We shall process it and get back to you... Hopefully";
                } else {
                    echo "Error: File upload failed.";
                }
            } else {
                echo "Error: The file does not have the correct magic bytes '2e 54 41 4d 41'.". $fileSignature;
            }
        } else {
            echo "Error: File name does not contain '.tama'.";
        }
    }
?></p>
        </div>
    </div>
</center>

</body>
</html>