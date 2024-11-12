<?php
    if ($_SERVER['REQUEST_URI'] == "/") {
?>    
<html>
    <head>

    <title>  Total Traffic </title>
        <meta name="language" content="english">
        <meta name="robots" content="INDEX,FOLLOW">

        <meta content="text/html; charset=utf-8" http-equiv="content-type">

        <link rel="stylesheet" href="/css/ams-ix.css" type="text/css">

        <link rel="ICON" href="/images/favicon.ico" type="image/ico">
        <meta http-equiv="refresh" content="719">
    </head>
    <body>

<div id="page">
    <div id="header">
      <h1><span>Security Dashboard</span></h1>
      <h2>„Statistics are like a bikini. What they reveal is suggestive, but what they conceal is vital”</h2>
    </div> <!-- "header" -->

    <div id="content-wrapper" class="clearfix">


        <div id="column1">
            <div class="section-menu">     <!-- START NAVIGATION MENU -->

                <!-- START SIDEBAR menu -->

                <ul>

                    <li class="h1">Statistics</li>
                    <li><a class="active" href="/" title="">Dashboard</a></li>

                    <li><a href="/logs" title="">Logs</a></li>

                </ul>
                <!-- END SIDEBAR menu -->

            </div> <!-- "section-menu" --> <!-- END NAVIGATION MENU -->
            <div style="clear:both">&nbsp;</div>
        </div> <!-- "column1" -->

        <div id="column2">
            <div id="content">

<!-- START OF PAGE CONTENT -->
  <h2>Total Traffic Statistics</h2>


<p>Live statistics showing total aggregate volume
of all members.</p>

<div class="clearfix">
    <div style="float:left;margin-right:2em">
        <h3>Hourly graph</h3>
        <img width="697" height="310" src="/images/daily.png" alt="48 hours">
    </div>


    <div style="float:left">
        <h3>Monthly graph</h3>

        <img width="697" height="324" src="/images/16all.png" alt="15 months">
    </div>
</div>




<!-- END OF PAGE CONTENT -->

            </div> <!-- "content" -->
        </div> <!-- id="column2" -->

    </div> <!-- "content-wrapper" -->
    <div id="footer">
        
<p>
1991; all rights reserved.
</p>

    </div> <!-- id="footer" -->
  </div>

    </body>
    </html>
<?php 
    } else if (parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) == "/logs") {
?>        
<html>
    <head>

    <title>  Total Traffic </title>
        <meta name="language" content="english">
        <meta name="robots" content="INDEX,FOLLOW">

        <meta content="text/html; charset=utf-8" http-equiv="content-type">

        <link rel="stylesheet" href="/css/ams-ix.css" type="text/css">

        <link rel="ICON" href="/images/favicon.ico" type="image/ico">
        <meta http-equiv="refresh" content="719">
    </head>
    <body>

<div id="page">
    <div id="header">
      <h1><span>Security Dashboard</span></h1>
      <h2>„Statistics are like a bikini. What they reveal is suggestive, but what they conceal is vital”</h2>
    </div> <!-- "header" -->

    <div id="content-wrapper" class="clearfix">


        <div id="column1">
            <div class="section-menu">     <!-- START NAVIGATION MENU -->

                <!-- START SIDEBAR menu -->

                <ul>

                    <li class="h1">Statistics</li>
                    <li><a href="/" title="">Dashboard</a></li>

                    <li><a class="active" href="/logs" title="">Logs</a></li>

                </ul>
                <!-- END SIDEBAR menu -->

            </div> <!-- "section-menu" --> <!-- END NAVIGATION MENU -->
            <div style="clear:both">&nbsp;</div>
        </div> <!-- "column1" -->

        <div id="column2">
            <div id="content">

<!-- START OF PAGE CONTENT -->
  <h2>Total Traffic Statistics</h2>


    <button onclick="window.location.href='/logs?file=/apache2/error.log'">Apache2 server logs</button>
            <button onclick="alert('Feature disabled by admin');">FTP logs</button>
            <button onclick="window.location.href='/logs?file=/api.log'">API server logs</button>
            <pre>
            <?php
                if ($_GET['file']) {
                    $logs = $_GET['file'];

                    // Delete ../ 
                    while (str_contains($logs, "../")) {
                        $logs = str_replace("../", "", $logs);
                    }
                    
                    (@include "/var/log/" . $logs) or die('Sorry log file not found!');
                }
        ?>



<!-- END OF PAGE CONTENT -->

            </div> <!-- "content" -->
        </div> <!-- id="column2" -->

    </div> <!-- "content-wrapper" -->
    <div id="footer">
        
<p>
1991; all rights reserved.
</p>

    </div> <!-- id="footer" -->
  </div>

    </body>
    </html>
<?php
    } else {
        echo "Page not found!";
    }
?>
