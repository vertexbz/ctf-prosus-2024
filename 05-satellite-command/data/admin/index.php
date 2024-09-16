<?php
error_reporting(0);
session_start();
header('Content-Type', 'text/html; charset=utf-8');
if (empty($_SESSION['logged-in'])) {
    die('Sorry, you must be logged in to view this page!');
}
?><!DOCTYPE html>
<html>
    <head>
        <title>Adminstrator</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            html, body {
                height: 100%;
                margin: 0;
                position: fixed;
                /* Use fixed or absolute positioning */
                top: 0;   left: 0;   width: 100%;
                height: 100%;   background-image: url('./img/tamasatellite_interface.png');
                background-color: #008080;
                /* Cover the entire viewport */
                background-position: center;
                /* Center the image */
                background-size: 1000px;
                background-repeat: no-repeat;
                /* Do not repeat the image */
            }

            #box {
                padding: 20px;
                max-width: 500px;
                text-align: left;
                margin-top: 300px;
                margin-right: 250px;
            }

            @media screen and (min-height: 1000px) {
		#box {
		    margin-top: 500px;
		}
            }

            #icon {
                font-size: 25px;
            }

            .boxFeatures {
                display:flex
            }

            .btnTurnOff {
                border: 2px solid black;
                margin-right: 10px;
                padding: 15px 32px;
                text-align: center;
                font-size: 15px;
                background-color: #c3c3c3;
            }
            .btnTurnOff:hover {
                cursor: pointer;
                background-color: #919191;
            }

            .btnLocateMine {
                border: 2px solid black;
                padding: 15px 32px;
                text-align: center;
                margin-right: 10px;
                font-size: 15px;
                background-color: #c3c3c3;
            }
            .btnLocateMine:hover {
                cursor: pointer;
                background-color: #919191;
            }

            .btnEraseMemory {

                border: 2px solid black;
                padding: 15px 32px;
                text-align: center;
                font-size: 15px;
                background-color: #c3c3c3;
            }
            .btnEraseMemory:hover {
                cursor: pointer;
                background-color: #919191;
            }


            .btnLocateOther {
                border: 2px solid black;
                padding: 5px;
                text-align: center;
                font-size: 15px;
                background-color: #c3c3c3;
            }
            .btnLocateOther:hover {
                cursor: pointer;
                background-color: #919191;
            }

            #searchQuery {
                padding: 5px;
                font-size: 15px;
                width: 260px;
            }
    </style>
    </head>
    <script>
        function onSearch() {
            const query = document.getElementById("searchQuery").value;

            window.location.href = "/search?q=" + query;
        }
    </script>
    <body>
        <center>

            <div id="box">

                <i class="bi bi-egg-fill" id="icon">TamaSatallite admin interface</i><i class="bi bi-egg-fill" id="icon"></i>
                <br/>
                The TamaSatellite interface provides administrators with enchanced features for controlling and monitoring Tamagotchi's in the whole world.
                <h3>Tamagotchi features:</h3>
                <div class="boxFeatures">
                    <button class="btnTurnOff" onclick="alert('Feature not available now')">Turn off Tamagotchi</button>
                    <button class="btnLocateMine" onclick="alert('Location acquired: TAMA{41° 12\' 59.112\'\' S 174° 53\' 42.216\'\' E}')">Find my Tamagotchi</button>
                    <button class="btnEraseMemory" onclick="alert('Feature not available now')">Erase memory</button>
                </div>
                <p>Extra: Locate other Tamagotchi's in the world</p>
                <input type="text" placeholder="John's Tamagotchi" id="searchQuery"/>
                <button class="btnLocateOther" onclick="onSearch()">Search other Tamagotchies</button>



            </div>
        </center>
    </body>
</html>
