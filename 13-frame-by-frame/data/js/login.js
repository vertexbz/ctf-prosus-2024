$(function(){
    if(szPLName == "zywy")
    {
        $("#identify").hide();
        $("#zywy").show();
    }

    var lanNums = parseInt(GetCookidStr("language"));
    if (lanNums == 1)
    {
        GetById("imgLan").src = "/images/login/English.gif";
    }
    else
    {
        GetById("imgLan").src = "/images/login/chinese.gif";
    }

    $("#imgLan").click(function(){
        var lantypes;
        if (lanNums == 1)
        {
            lanNums = 0;
        }
        else
        {
            lanNums = 1;
        }
        playCookie("language", lanNums);
        self.location = "/login.asp";
    });

    var	ocx = '<OBJECT id="IPCamera" name="IPCamera" classid=clsid:2319F6E6-ABD3-4b68-BADF-05D8796FA072 width="1" height="1" ></OBJECT>';
    $("#video").html(ocx);

    if (screen.width == 800)                   //if 分辨率为800*600 提示信息
    {
        alert(IDC_PIXEL);
    }

    if ($.browser.msie)
    {
        MsgBoxInit();//初始化弹出对话框
    }

    if (szPLName.toLowerCase() == "wscbpi")
    {
        GetById("lan").style.display = "none";
        GetById("identify").style.display = "none";
        GetById("bpilogin").style.display = "";
        GetById("bpidef").style.display = "";
    }
    else if (szPLName.toLowerCase() == "bjyj")
    {
        $("#bjyjlogin").show();
        $("#bjlogin").show();
    }
    else if (szPLName.toLowerCase() == "keda")
    {
        GetById("identify").style.display = "none";
    }

    GetById("passwd").focus();
    GetById("strurl").value = (document.URL.split('//')[1]).split('/')[0].split(':')[0];
    GetJCP({cmd:"showweb -act list",ParseJCP: function(jcpGet){
            playCookie("ShowWeb",jcpGet);
        }});

    if (user == 0 || user == -1)
    {
        GetById("usrname").value = "admin";
    }
    else
    {
        GetById("usrname").value = user;
    }

    var params = GetById("params").value;
    var ret = GetRtspKeyStr(params, 'rtsp');
    if (ret != -2)
    {
        GetById("port").value = ret;
    }

    ret = GetRtspKeyStr(params, 'chns');
    if (ret != -2)
    {// parse chns
        var arrChns = ret.split(",");
        var StreamExist = new Array();
        var arrElement;
        var first = -1;     // 第一个有效的视频通道

        for (i = 0; i < 16; i++)
        {
            StreamExist[i] = false;
        }

        for (i = 0; i < arrChns.length; i++)
        {
            arrElement = arrChns[i].split(":");

            if (2 > arrElement.length)
            {
                continue;
            }

            if (0 > first)
            {
                first = i;
            }

            StreamExist[parseInt(arrElement[1])] = true;
        }

        if (streamIndex == -1 || StreamExist[streamIndex] == false)
        {// default to first channel
            arrElement = arrChns[first].split(":");
            chnIndex = parseInt(arrElement[0]) + 1;
            streamIndex = arrElement[1];
        }

        delete StreamExist;
        StreamExist = null;
    }

    deleteCookie("loginflag");
    deleteCookie("passwd");

    // 保存mac, user, pwd到iLinkType中
    var index = document.URL.indexOf("?");
    if (index == -1)
    {
        iLinkType.type = 0;
        playCookie("TransType", iLinkType.type);
    }
    else
    {
        iLinkType.type = 1;
        if (location.port == "")
        {
            iLinkType.port = 80;
        }
        else
        {
            iLinkType.port = location.port;
        }

        var szSubStr = document.URL.substr(index + 1, document.URL.length - index - 1);

        iLinkType.mac = FindLinkKey(szSubStr, "mac");
        iLinkType.user = FindLinkKey(szSubStr, "user");
        iLinkType.pwd = FindLinkKey(szSubStr, "pwd");

        playCookie("TransMAC", iLinkType.mac);
        playCookie("TransUser", encodeURIComponent(iLinkType.user));
        playCookie("TransPwd", encodeURIComponent(iLinkType.pwd));
        playCookie("TransType", iLinkType.type);
        playCookie("TransPort", iLinkType.port);
    }
});

/*=========================================================================
	说明查找字符串形式为mac=062f8a010001&type=ht&user=guest&pwd=32897239
	的子字符串
=============================================================================*/
function FindLinkKey(str, keystr)
{
    if (str == "")		return -1;

    var szStr, temp;
    szStr = str.split("&");
    for (var i = 0; i < szStr.length; i ++)
    {
        temp = szStr[i].split("=");
        if (temp[0] == keystr)	return temp[1];
    }

    return 0;
}

String.prototype.trim = function()
{
    return this.replace( /(^\s*)|(\s*$)/g, '');   //去掉开头和末尾的空格
}

var usersInfo;
function ParseUserPasswdCfg(jcpstr)
{
    var ret;
    var num;
    var count = 0;
    var strName = GetById("usrname").value.trim();
    var strPasswd = GetById("passwd").value;
    try
    {
        //因为sysctrl命令导致的原因在每个返回字符串的后面多加上了一个";", 所以减2
        num = (jcpstr.split(";").length - 2) / 3;
        usersInfo = new Array(num);
        var i, usr, grp, passwd;
        for (i = 0; i < num; i++)
        {
            ret = GetRtspKeyStr(jcpstr, 'user' + i);
            if (ret == -2)
            {
                continue;
            }
            usr = ret;

            ret = GetRtspKeyStr(jcpstr, 'group' + i);
            if (ret == -2)
            {
                continue;
            }
            grp = ret;

            ret = GetRtspKeyStr(jcpstr, 'passwd' + i);
            if (ret == -2)
            {
                continue;
            }
            passwd = ret;

            usersInfo[i] = {user:usr, passwrd: passwd, group: grp};
        }

        for (i = 0; i < num; i ++)
        {
            if (usersInfo[i].user == strName)
            {
                if (usersInfo[i].passwrd != strPasswd)
                {
                    //用户名正确,密码错误
                    alert(IDC_FTP_CLIENT_TEST_STATUS_ERR_PWD);
                }
                else
                {
                    //保存用户组级别到cookie中
                    playCookie("group", usersInfo[i].group);

                    //验证通过
                    GetJCP({cmd: "devvecfg -act list", ParseJCP: ParseDEVVECfg});
                }
            }
            else
            {
                count ++;
            }
        }

        if (count >= num)
        {
            //用户名错误
            alert(IDC_FTP_CLIENT_TEST_STATUS_ERR_USR);
        }
    }catch(e){
    }
}

function ParseDEVVECfg(jcpstr)
{
    var ret;
    try
    {
        playCookie("loginflag", "1");
        playCookie("devvecfg", jcpstr);

        if ($.browser.msie)
        {
            self.location = "/asp/mainview.asp";
        }
        else
        {
            self.location = "/asp/mainviewfirefox.asp";
        }
    }catch(e){
        window.status = e;
    }
}

/*====================================================================
     提交按钮function
====================================================================*/
function Check()
{
    var strName = GetById("usrname").value.trim();
    if (strName.length == 0)
    {
        alert(IDC_USERNAME_NOEMPTY);
        return false;
    }

    var rtspport = GetById("port").value.trim();
    if (rtspport.length == 0)
    {
        alert(IDC_RTSPPORT_NOEMPTY);
        return false;
    }

    rtspport = parseInt(rtspport);
    if (0 >= rtspport || 65536 <= rtspport)
    {
        alert(IDC_GEN_PORT_RANGE);
        return false;
    }

    var strUrl = GetById("strurl").value;
    var strPasswd = GetById("passwd").value;

    playCookie("url", strUrl);
    playCookie("rtspport", rtspport);
    playCookie("ChnIndex", chnIndex);
    playCookie("StreamIndex", streamIndex);
    playCookie("user", strName);
    playCookie("passwd", strPasswd);

    if (szPLName.toLowerCase() == "bjyj")
    {
        playCookie("Protocal", ProIndex);
    }

    //判断是否启用用户名验证
    GetJCP({cmd: "authen -act list", ParseJCP: function(jcpstr){
            var ret;
            try
            {
                ret = GetRtspKeyStr(jcpstr, "enable");
                if (ret == -2 || 1 == ret)
                {
                    //验证用户名和密码
                    GetJCP({cmd: "userpasswd -act list", ParseJCP: ParseUserPasswdCfg});
                }
                else if (parseInt(ret) == 0)
                {
                    //不需要验证用户名和密码
                    GetJCP({cmd: "devvecfg -act list", ParseJCP: ParseDEVVECfg});

                    //不启用用户名和密码验证时为admin的权限
                    playCookie("group", "0");
                }
            }catch(E){
            }
        }});
}

//按Enter键直接进入页面，ESC退出页面
$(document).keypress(function(E){
    if (E.which == 13)
    {
        Check();
    }
});

function WindowClose()
{
    if(confirm(IDC_LOGIN_CLOSE)){
        window.close();
    }
}
