<?php
error_reporting(0);
session_start();
header('Content-Type', 'text/html; charset=utf-8');
if (empty($_SESSION['logged-in'])) {?><!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/public/css/portal.css">
</head>
<body>
<h1> Admin Portal </h1>
<h2 class="errorText">Currently not logged in!</h2>
<p>Please click <a href="/">here</a> to login!</p>
</body>
</html>
<?php die();}?><!DOCTYPE html>
<html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <meta http-equiv="expires" content="Thu, 1 Jan 1970 00:00:01 GMT">
    <title>CCTV Cameras Login</title>
    <script type="text/javascript" src="/jquery/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="/jquery/jcpcmd.js"></script>
    <script type="text/javascript" src="/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="/jquery/client.js"></script>

    <script type="text/javascript" src="/js/general.js"></script><script type="text/javascript" src="/language/chinese.js"></script>
    <script type="text/javascript" src="/js/login.js"></script>
    <script type="text/javascript" src="/js/msgbox.js"></script>
    <link href="/css/msgbox.css" rel="stylesheet" type="text/css">
    <link href="/css/mainviewcss.css" rel="stylesheet" type="text/css">
    <style type="text/css">
        <!--
        body {
            font-size:12pt;
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            background-color: #EFF3FF;
        }
        .STYLE2 {font-family:normal bold Times, serif;font-size:16pt; }
        .STYLE1 {font-family:normal bold Times, serif;font-size:12pt; }
        .STYLE3 {font-family:ormal bold Times, serif;font-size:10pt; }
        .STYLE4 {font-family:ormal bold Times, serif;font-size:14pt; }
        .line3 {
            BORDER-RIGHT: #919191 1px solid; BORDER-TOP: #919191 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #919191 1px solid; COLOR: #3f6183; BORDER-BOTTOM: #919191 1px solid; FONT-FAMILY: Arial, Helvetica, sans-serif
        }
        -->
    </style>
    <script>
        async function searchCameras() {
            const q = document.getElementById('queryCameras').value;
            if (q == "" || q.length <0) {
                return;
            }

            const response = await fetch("/search/", {
                method: 'post',
                body: JSON.stringify({query: q}),
                mode: "cors",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            if (response.status == 403) {
                alert("Only the administrator can use this functionality!");
            }
            else if (response.status == 404) {
                alert("No data returned!");
            }
            else if (response.status == 200) {

                response.json().then((json) => {

                    if (json.length > 0) {
                        const table = document.getElementById('results');

                        while(table.rows.length > 1) {
                            table.deleteRow(1);
                        }

                        for (var cam of json) {
                            var row = table.insertRow(1);
                            var cellID = row.insertCell(0);
                            var cellName = row.insertCell(1);
                            var cellCity = row.insertCell(2);
                            var cellStreet = row.insertCell(3);
                            var cellDescription = row.insertCell(4);

                            cellID.innerHTML = cam.id;
                            cellName.innerHTML = cam.name
                            cellCity.innerHTML = cam.city;
                            cellStreet.innerHTML = cam.street;
                            cellDescription.innerHTML = cam.description;
                        }
                    }
                });
            } else {
                alert("Unknown error occured!")
            }
        }
    </script>
</head>

<body>
<center style="margin-top:200px;">
    <div id="layer1" name="layer1" style="width:520px; height:210px; background-image:url(/images/login/00.gif); border-style:solid; border-color:31a9f8;">
        <div id="video" style="width:1px;height:1px;border:0px solid #f00;"><object id="IPCamera" name="IPCamera" classid="clsid:2319F6E6-ABD3-4b68-BADF-05D8796FA072" width="1" height="1"></object></div>
        <div id="layer2" style="position:relative; width:100%; height:100%; top:0px; left:0px; z-index:1;">

            <h1> Admin Portal </h1>
<?php if ($_SESSION['logged-in'] < 2):?>
            <p class="errorText">Tampering detected!</p>
<?php endif?>

            <input name="queryCameras" id="queryCameras" placeholder="New York">
            <button onclick="searchCameras()">Search Cameras</button>

            <table id="results">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</center>
<div id="layer3" style="position:absolute;width:2;height:2;border:none;top:450px;left:330px;background:#EFF3FF">
    <input type="text" name="strurl" id="strurl" value="" style="display:none">
    <input type="text" name="params" id="params" value="rtsp=554;" style="display:none">
</div>


<script language="javascript">document.getElementById("params").value="rtsp=554;chns=0:3,0:0,;";</script>

</body></html>