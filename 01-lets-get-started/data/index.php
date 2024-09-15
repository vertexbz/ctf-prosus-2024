<?php
$uri = preg_replace('/\.\.+$/', '.', $_SERVER["REQUEST_URI"]);
$uri = preg_replace('/\/\/+$/', '/', $uri);
$uri = ltrim($uri, '/');
if (!in_array($uri, ['', 'index.php']) && file_exists($uri)) {
    return false;    // serve the requested resource as-is.
}

function getAuth() {
    $initial = [
        'user' => 'unknown',
        'role' => 'user'
    ];

    if (empty($_COOKIE['auth'])) {
        return $initial;
    }

    $json = base64_decode($_COOKIE['auth']);
    if (empty($json)) {
        return $initial;
    }

    $data = json_decode($json, true);
    if (empty($data) || !is_array($data)) {
        return $initial;
    }

    $withInitial = array_replace([], $initial, $data);
    return array_intersect_key($withInitial, $initial);
}

$auth = getAuth();
setcookie("auth", base64_encode(json_encode($auth)));
$message = "Sorry can't access this page, only the user administrator can!";

if ($auth['user'] == 'administrator') {
    if ($auth['role'] != 'systemadmin') {
        $message = "Oh hi admin, thats weird, you don't have the systemadmin role?";
    } else {
        $message = <<<EOT
<div id="successBox">
    <p>Acces granted!<p>
    <li>Administrator: TAMA{NobodyWillHackMe1337!}</li>
    <li>Akari: CrystalClear</li>
    <li>Hiroshi Saioto: ILoveMyTamagotchi123</li>
</div>

EOT;
    }
} else if ($auth['role'] != 'user' || $auth['user'] != 'unknown') {
    $message = "Sorry can't access this page, only administrator can!";
}

?>
<html>
    <head>
        <link href="/public/bootstrap.min.css" rel="stylesheet">
        <style>

            body {
                background: #00f url('/public/microfab.gif') top left;
                padding: 20px;
            }

            #box {
                background-color: #ccc;
                width: 80%;
                padding: 20px;
                margin-top: 50px;
                opacity: 90%;
                text-align: center;
                border-radius: 1%;
            }

            .row {
                margin-top: 50px;
            }

            #successBox {
                text-align: left;
                padding: 10px;
                margin-left: 100px;
            }
        </style>
    </head>

    <body>
        <div class="container">
        <header class="jumbotron subhead" id="overview">

            <div class="row">
              <div class="span8">
                <h1>
                  <blink><span style="color: #ff0000">P</span><span style="color: #ff5500">a</span><span style="color: #ffaa00">s</span><span style="color: #ffff00">s</span><span style="color: #aaff00">w</span><span style="color: #55ff00">o</span><span style="color: #00ff00">r</span><span style="color: #00ff55">d</span></blink> <span style="color: #00ffaa">M</span><span style="color: #00ffff">a</span><span style="color: #00aaff">n</span><span style="color: #0055ff">a</span><span style="color: #0000ff">g</span><span style="color: #5500ff">e</span><span style="color: #aa00ff">r</span>
                </h1>
                <table cellspacing="2" cellpadding="2">
                  <tbody><tr>
                    <td>
                      <img src="/public/ie_logo.gif">
                    </td>
                    <td>
                      <img src="/public/ns_logo.gif">
                    </td>
                    <td>
                      <img src="/public/noframes.gif">
                    </td>
                    <td>
                      <img src="/public/notepad.gif">
                    </td>
                  </tr>
                </tbody></table>
              </div>
              <div class="span4">
                <center>
                  <img src="/public/yahooweek.gif">
                  <img src="/public/community.gif">
                  <img src="/public/wabwalk.gif">
                  <img src="/public/webtrips.gif">
                </center>
              </div>
            </div>
            <marquee>Never forget your password ever again!</marquee>
          </header>

        <center>
            <div class="row">
                <div class="span12">
                    <div class="alert alert-block">
                        <img class="pull-left" style="margin-top: -8px" src="/public/drudgesiren.gif" width="80">
                        <br/>
                        <h4 class="alert-heading"><?=$message?></h4>
                        <br/>
                    </div>
                </div>
            </div>
        </center>
    </div>

    </body>
</html>