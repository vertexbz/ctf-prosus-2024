<!DOCTYPE html>
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
    <script type="text/javascript">

const tryLogin = async () => {
    document.getElementById('errorText').innerText = ""

    const user = document.getElementById('usrname').value;
    const pass = document.getElementById('passwd').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, pass})
    })

    if (response.status === 200) {
        document.getElementById('errorText').innerText = ""
        window.location.href = "/portal";
    } else {
        document.getElementById('errorText').innerText = "Invalid login!"
    }
}
</script>
    </head>
    
    <body>
        <center style="margin-top:200px;">
            <div id="layer1" name="layer1" style="width:520px; height:210px; background-image:url(/images/login/00.gif); border-style:solid; border-color:31a9f8;">
                <div id="video" style="width:1px;height:1px;border:0px solid #f00;"><object id="IPCamera" name="IPCamera" classid="clsid:2319F6E6-ABD3-4b68-BADF-05D8796FA072" width="1" height="1"></object></div>
                <div id="layer2" style="position:relative; width:100%; height:100%; top:0px; left:0px; z-index:1;">
                    <div id="layer3" style="position:absolute;width:231px;height:124px;top:77px;left:0px; background-image:url(/images/login/01.gif);">
                    </div>
                    <div id="bpilogin" style="position:absolute;width:125px;height:45px;top:10px;left:15px;display:none;  background-image:url(/images/login/003.gif);">
                    </div>
                    <div id="bjlogin" style="position:absolute;width:125px;height:45px;top:1px;left:1px;display:none; background-image:url(/images/login/004.gif);">
                    </div>
                    <div id="identify" style="position:absolute;border:0px solid #f00;width:180px;height:30px;top:30px;left:100px;line-height:30px;">
                       <span class="STYLE2">CCTV <span class="STYLE1"></span> <span class="STYLE2">LOGIN</span>
                    </span></div>
                    <div id="zywy" style="display:none;position:absolute;width:230px;height:48px;top:17px;left:50px;background-image:url(/images/login/005.jpg);">
                    </div>
                    <div id="bpidef" style="position:absolute;border:0px solid #f00;width:300px;height:30px;top:33px;left:140px;line-height:30px;display:none;">
                       <span class="STYLE4">BPI SECURITY SERVER LOGIN</span>
                    </div>
                    <div id="username" style="position:absolute;border:0px solid #f00;width:70px;height:20px;top:80px;left:110px;line-height:20px;" class="STYLE1">
                       <script>dwn(IDC_USERNAME);//用户名</script>用户名
                    </div>
                    <div id="nametext" style="position:absolute;border:0px solid #A6AAB6;width:180px;height:20px;top:80px;left:180px;line-height:20px;line-height:20px;text-align:left;">
                       <input type="text" value="" id="usrname" style="width:150px;">
                    </div>
                    <div id="submit" style="position:absolute;border:0px solid #f00;width:70px;height:24px;top:90px;left:380px;line-height:24px;background-image:url(/images/login/botton.gif);text-align:center;color:white;font-family:ormal bold Times, serif;font-size:10pt;cursor:pointer;" onclick="tryLogin();">
                        <script>dwn(IDC_SUBMIT);//</script>&nbsp;进 &nbsp; 入  
                    </div>
                    <div id="passwrd" style="position:absolute;border:0px solid #f00;width:70px;height:20px;top:110px;left:110px;line-height:20px;" class="STYLE1">
                        <script>dwn(IDC_PASSWD);//密码</script>密&nbsp;&nbsp;&nbsp;码  
                    </div>
                    <div id="passtext" style="position:absolute;border:0px solid #A6AAB6;width:180px;height:20px;top:110px;left:180px;line-height:20px;line-height:20px;text-align:left;">
                        <input type="password" value="" id="passwd" style="width:150px;height:20px;">
                    </div>
                    </div>
                    
                    </div>
                    
                    <p id="errorText"></p>
            </div>	
        </center>
        <div id="layer3" style="position:absolute;width:2;height:2;border:none;top:450px;left:330px;background:#EFF3FF">
            <input type="text" name="strurl" id="strurl" value="" style="display:none">
            <input type="text" name="params" id="params" value="rtsp=554;" style="display:none">
        </div>
    
    
    <script language="javascript">document.getElementById("params").value="rtsp=554;chns=0:3,0:0,;";</script>
    
    </body></html>