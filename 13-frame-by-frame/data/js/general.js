function FromTime()
{
    var d = new Date();
    return (d.getTime());
}

function playCookie(key,value){
    var cookieOption = {expires: 30 * 24 * 3600* 12};
    $.cookie(key, value, cookieOption);
}

// 回放函数
var newWinflag = 0, newWin = "";
function playback()
{
    newWinflag = GetCookidStr("newWinFlag");
    if (newWinflag >= 0 && typeof newWin == "object")
    {
        newWin.focus();
    }
    else
    {
        playCookie("newWinFlag", (++newWinflag));

        if ($.browser.msie)
        {
            var __target_link = "play.asp";
        }
        else
        {
            var __target_link = "playff.asp";
        }

        newWin = window.open(__target_link);
        delete sdate;
        sdate = null;

        newWin.focus();
    }
}

/*====================================================================
    RGB颜色转为十六进制颜色
====================================================================*/
function RGB2HEX(rgb)
{
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x)
    {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/*====================================================================
    cookie functions
====================================================================*/
// cookie对的搜索
function GetCookidStr(StrName)
{
    var str = $.cookie(StrName)
    if (null == str)
    {
        return -1;
    }
    return str;
}

// 删除
function deleteCookie(StrName)
{
    $.cookie(StrName, null);
}

function GetRtspKeyStr(RtspStr, KeyStr)
{
    var val = -2;
    if (isBlank(RtspStr))
    {
        return val;
    }

    var arrKey = RtspStr.split(";");
    for(var i = 0; i < arrKey.length; i++)
    {
        var arr = arrKey[i].split("=");
        var str = arr[0].replace(/^\s*/, "");   // 去掉开始空格
        str = str.replace(/\s*$/, "");          // 去掉结尾空格
        if(KeyStr == str)
        {
            if(arr.length>2)
            {
                val = "";
                for(var j = 1 ; j < arr.length ; j++){
                    val += unescape(arr[j]) +"=";
                }
                val = val.substr(0,val.length-1);
                break;
            }
            else
                val = unescape(arr[1]);
            break;
        }
    }
    return val;
}

function GetSubRtspKeyStr(SubRtspStr, KeyStr)
{
    var val = -2;
    if (isBlank(SubRtspStr))
    {
        return val;
    }

    var arrKey = SubRtspStr.split(",");
    for(var i = 0; i < arrKey.length; i++)
    {
        var arr = arrKey[i].split(":");
        if(KeyStr == arr[0])
        {
            val = unescape(arr[1]);
            break;
        }
    }

    return val;
}

function GetRtspJCPCmd(RtspStr)
{
    if (isBlank(RtspStr))
    {
        return "";
    }

    // judge Success or not
    var arr = RtspStr.split("[Success]");
    if (1 >= arr.length)
    {
        return "";
    }

    return arr[1];
}

function SetRtspJCPCmd(RtspStr)
{
    if (isBlank(RtspStr))
    {
        return "";
    }

    // judge Success or not
    var arr = RtspStr.split("Success]");
    if (1 >= arr.length)
    {
        return "";
    }

    return RtspStr;
}

function isBlank(str)
{
    if( str !="")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function IsDigit()                  //响应onkeypress事件, 这个事件只包括英文字母、数字等一系列的符号, 并不包括汉字
{
    if ((event.keyCode != 46) && (event.keyCode != 13))
    {
        if ((event.keyCode < 48) || (event.keyCode > 57))
        {
            alert(IDC_GEN_REQ_NUMBER);
        }

        return ((event.keyCode >= 48) && (event.keyCode <= 57));
    }
    else if (event.keyCode == 46)
    {
        alert(IDC_GEN_REQ_NUMBER);
        return ((event.keyCode >= 48) && (event.keyCode <= 57));
    }
    else
    {
        return  (event.keyCode);
    }
}

function IsDigitUp()            //响应onkeyup事件, 检测用户输入的是否是中文
{
    var arg0 = arguments[0];

    var NumberRegExp = new RegExp("^\\d+$","g");
    var myRegExp = new RegExp("[^0-9]+");       //匹配不在0-9之内的数
    if (NumberRegExp.test(arg0.value) == false)
    {
        arg0.value = arg0.value.replace(myRegExp, '');
        alert(IDC_GEN_REQ_NUMBER);
    }
}

function checkIp(str)
{
    //check type
    if (/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(str) == false)
    {
        return false;
    }

    //check value
    if (RegExp.$1 < 0 || RegExp.$1 > 255
        || RegExp.$2 < 0 || RegExp.$2 > 255
        || RegExp.$3 < 0 || RegExp.$3 > 255
        || RegExp.$4 < 0 || RegExp.$4 > 255)
    {
        return false;
    }

    // 剔除如 010.020.020.03 前面的 0
    var str = str.replace(/0(\d)/g,"$1");

    str = str.replace(/0(\d)/g,"$1");

    return true;
}

String.prototype.getBytes = function() //获取带中文的字符串长度
{
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}

function HextoDecimal(hexNum)
{
    var hex = "0123456789abcdef";
    var num10 = 0;
    var num16 = 0;
    var i = 0;

    num16 = hexNum.toLowerCase();
    for(i = 0; i < num16.length; i++)
    {
        if (hex.indexOf(num16.charAt(i)) == -1)
        {
            return -1;
        }
    }

    for(i = 0; i < num16.length; i++)
    {
        num10 += (hex.indexOf(num16.charAt(i))) * (Math.pow(16, (num16.length - 1 - i)));
    }

    return num10;
}

// 打开、关闭
function opencat(cat)
{
    if(cat.style.display == "none")
    {
        cat.style.display = "";
        return 1;
    }
    else
    {
        cat.style.display = "none";
        return 0;
    }
}

// 登出页面
function OnLogout()
{
    var __target_link = "../login.asp";
    if (parseInt(Client.browser.version) <= 6)
    {
        ShowMsg(2, IDC_MSGBOX_MSG, __target_link);
    }
    else
    {
        var ret = window.confirm(IDC_MSGBOX_MSG);
        if (ret == true)
        {
            self.location.href = __target_link;
        }
    }

    return true;
}

function ImageDragForbid()
{
    var i = 0;
    for (i = 0; i < document.images.length; i++)
    {
        document.images[i].ondragstart = DragForbid;
    }
}

/*====================================================================
    禁止插件提示
====================================================================*/
function AtiveXLoad()
{
    //document.write("<object name=\"IPCamera\" ID=\"IPCamera\" CLASSID=\"CLSID:f69b7e54-462c-4945-a4d8-85940c827493\" width=\"352\" height=\"288\" ></object>");
}

/*====================================================================
    实现标签互换就改变其颜色
====================================================================*/
function GetById(id) {
    return document.getElementById(id)
}

function show()
{
    var index;
    var arg = show.arguments;

    for (var i = 0; i < menu.length; i++)
    {
        menuid[i] = GetById(menu[i]);
    }
    for (var i = 0; i< menu.length; i++)
    {
        if (menu[i] == arg[0])
        {
            index = i;
        }
    }
    for (var i = 0; i < menuid.length; i++)
    {
        if (index == i)
        {
            if (menuid[index].style.background == '#ededed')
            {
                menuid[index].style.background = '#0088ec';
            }

        }
        else
        {
            menuid[i].style.background = '#ededed';
        }
    }
    return true;
}

//IP地址框  简单的类封装
function IPText(ObjName, differ)
{
    this.ObjName = ObjName;
    this.count = 0;
    this.IPlikeInputStr = new Array();
    this.differ = differ;               //网关或者IP地址 0:网关 1:IP地址, 2:子网掩码 3:DNS服务器

    //function
    this.display = display;
    this.IpCheck = IpCheck;
}

function display()
{
    var i = 0;
    for (i = 0; i < 4; i++)
    {
        this.IPlikeInputStr[i] = "<input class=IPInput name=IPInput " +
            "onkeyup=\"event.returnValue=IpCheck(this)\" onkeypress=\"event.returnValue=IsDigit();\"" +
            "idself=" + i + " " + "idname=" + this.ObjName + " " +  "differ=" + this.differ + " " +
            "id="+this.ObjName+ i+ " type=text size=3 maxlength=3 count=0>"+(i==3?"":".");
    }
    document.write("<div class=IPDiv>"+this.IPlikeInputStr.join("")+"</div>");
}

// 检查输入的IP地址是否符合要求 example:012替换第一位的0为空 >255的一律替换为255
function IpCheck(obj)
{
    var re, str;
    str = obj.value;
    //如果有的话就替换第一位中的0
    re = str.replace(/0(\d)(\d)/g,"$1$2");
    obj.value = re;

    //IP地址框的第一个数字范围1~223 第2、3个:0~255 第4个:1~254
    var ipindex = parseInt(obj.idself);
    if (parseInt(obj.differ) == 1)
    {
        switch (ipindex)
        {
            case 0:
                if (parseInt(re) > 223)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 223;
                }
                if (parseInt(re) < 1)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 1;
                }
                break;
            case 1:
            case 2:
                if (parseInt(re) > 255)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 255;
                }
                if (parseInt(re) < 0)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 0;
                }
                break;
            case 3:
                if (parseInt(re) > 254)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 254;
                }
                if (parseInt(re) < 1)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 1;
                }
                break;
            default:
                break;
        }
    }
    else if (parseInt(obj.differ) == 0)         //网关的第一个范围 0 ~ 223 其他 0~255
    {
        switch (ipindex)
        {
            case 0:
                if (parseInt(re) > 223)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 223;
                }
                if (parseInt(re) < 0)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 0;
                }
                break;
            case 1:
            case 2:
            case 3:
                if (parseInt(re) > 255)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 255;
                }
                if (parseInt(re) < 0)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 0;
                }
                break;
        }
    }
    else if (parseInt(obj.differ) == 2)
    {
        if (parseInt(re) > 255)
        {
            alert(IDC_GEN_IP_CK_MSG);
            obj.value = 255;
        }
        if (parseInt(re) < 0)
        {
            alert(IDC_GEN_IP_CK_MSG);
            obj.value = 0;
        }
    }
    else if (parseInt(obj.differ) == 3)
    {
        switch (ipindex)
        {
            case 0:
                if (parseInt(re) > 223)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 223;
                }
                if (parseInt(re) < 0)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 0;
                }
                break;
            case 1:
            case 2:
            case 3:
                if (parseInt(re) > 255)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 255;
                }
                if (parseInt(re) < 0)
                {
                    alert(IDC_GEN_IP_CK_MSG);
                    obj.value = 0;
                }
                break;
        }
    }
    var key = event.keyCode;
    var next,nextindex;
    var ret = "";
    if (obj.value.length == 3)
    {
        nextindex = parseInt(obj.idself) + 1;
        nextindex = nextindex > 3 ? 3 : nextindex;
        nextindex = nextindex < 0 ? 0 : nextindex;//alert(nextindex);
        next = obj.idname + nextindex;
        GetById(next).focus();
    }

    if (key == 110)     //"."
    {
        obj.value=obj.value.replace(/[^\d]/g,'')        //替换"."为""
        if (obj.value.length > 0)
        {
            nextindex = parseInt(obj.idself) + 1;
            nextindex = nextindex > 3 ? 3 : nextindex;
            nextindex = nextindex < 0 ? 0 : nextindex;//alert(nextindex);
            next = obj.idname + nextindex;
            GetById(next).focus();
        }
    }
    else if (key < 96 || key > 105)
    {
        obj.value=obj.value.replace(/[^\d]/g,'')        //avoid 字母
        return ret;
    }
}

// 取IP地址的四位十进制数,返回数组
function SetDecIp(ret, IpName)
{
    var IpArray = ret.split(".");
    var idName = IpName;
    var str;
    var obj;
    for (var i = 0; i < 4; i++)
    {
        str = idName + i;
        obj = GetById(str);//alert($(str))
        obj.value = IpArray[i];
    }
    //return arg;
}

// 把四位十进制数组成IP地址
function FormIp(idName)
{
    var idName = idName;
    var ret = new Array();   //返回的IP地址
    var str;
    var obj
    for (var i = 0; i < 4; i++)
    {
        str = idName + i;
        obj = GetById(str);
        ret[i] = parseInt(obj.value);
    }
    return ret.join(".");
}

/*===================================================================
    VENC_SIZE_E and string transform
===================================================================*/
function VencStr2Size(VencStr)
{
    VencStr = VencStr.toUpperCase();
    if ("QCIF" == VencStr)
    {
        return 0;
    }
    else if ("CIF" == VencStr)
    {
        return 1;
    }
    else if ("D1" == VencStr)
    {
        return 2;
    }
    else if ("720P" == VencStr)
    {
        return 3;
    }
    else if ("UVGA" == VencStr)
    {
        return 4;
    }
    else if ("1080P" == VencStr)
    {
        return 5;
    }

    return -1;
}

function VencSize2Str(VencSize)
{
    var ptr = "";

    switch (parseInt(VencSize))
    {
        case 0:
        {
            ptr = "QCIF";
            break;
        }

        case 1:
        {
            ptr = "CIF";
            break;
        }

        case 2:
        {
            ptr = "D1";
            break;
        }

        case 3:
        {
            ptr = "720P";
            break;
        }

        case 4:
        {
            ptr = "UVGA";
            break;
        }

        case 5:
        {
            ptr = "1080P";
            break;
        }

        default:
        {
            ptr = "UNKNOWN";
            break;
        }
    }

    return ptr;
}

function dwn(s)
{
    document.write(s);
}

// 获取id=arg的对象的绝对位置
function getPosition(arg)
{
    o = GetById(arg);
    var ret={x:0,y:0};
    while(o&&o.offsetParent)
    {
        ret.x += o.offsetLeft + o.offsetParent.clientLeft;
        ret.y += o.offsetTop + o.offsetParent.clientTop;
        o=o.offsetParent;
    }

    return ret;
}

function insert(key, value)
{
    if (key in this.normalHashTable)
    {
        return false;
    }
    this.normalHashTable[key] = value;
    this.len ++
    return true;
}

function find(key)
{
    return this.normalHashTable[key];
}

/*====================================================================
    arguments[0]:           ;IP地址或者域名
    function:               ;检查是否是合法的IP地址或者域名
                            ;false:不合法 true:合法
====================================================================*/
function CheckIPAndDomain()
{
    var arg0 = arguments[0];
    if (isBlank(arg0))
    {
        return false;
    }
    var IpRegExp = new RegExp("^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$","g");
    var UrlRegExp = new RegExp("([\\w-]+\\.)+[\\w-]+(/\\[\\w- ./?%&=\\]*)?","g");
    if (IpRegExp.test(arg0) == false && UrlRegExp.test(arg0) == false)
    {
        return false;
    }
    return true;
}

/*===================================================================
    满足星谷要求，window.open()公用函数
===================================================================*/
function OpenHtml()
{
    var __target_link = arguments[0];
    window.open(__target_link, 'ifLeft');
}

/*====================================================================
    初始化全局变量，所有网页公用
====================================================================*/
var boardmode = 0;  // BOARD_MODE_E
var szPLName = "normal";
var strUrl = GetCookidStr("url");
var rtspport = GetCookidStr("rtspport");
var user = GetCookidStr("user");
var passwd = GetCookidStr("passwd");
var chnIndex = GetCookidStr("ChnIndex");        // 设备当前的CameraID, 1~n
var streamIndex = GetCookidStr("StreamIndex");  // 设备当前的StreamID
var devChnCnt = 1;                              // 设备支持的通道数
var iWhichMenu = GetCookidStr("iWhichMenu");    // 主菜单0~n
var iSubMenu = GetCookidStr("iSubMenu");        // 子菜单1~n
var iLinkType = {mac:"-1", user:"-1", pwd:"-1", port:"-1", type:"-1"};  // 根据document.URL分析连接的类型, 包括成员mac,user,pwd, type:0:本地连接 1:转发
iLinkType.mac = GetCookidStr("TransMAC");
iLinkType.user = GetCookidStr("TransUser");
iLinkType.pwd = GetCookidStr("TransPwd");
iLinkType.type = GetCookidStr("TransType");
iLinkType.port = GetCookidStr("TransPort");

var ProIndex = 1;
if (szPLName.toLowerCase() == "bjyj")
{
    ProIndex = GetCookidStr("Protocal");
}

if (-1 == ProIndex)
{
    ProIndex = 1;
}

if (-1 == strUrl)
{// cookie deleted check
    var selfName = self.location.pathname;
    var __target_link = "/login.asp";
    if ("/login.asp" != selfName && "login.asp" != selfName)
    {
        parent.location = __target_link;
    }
}

if (-1 == rtspport)
{
    rtspport = 554;
}

if (0 >= chnIndex)
{
    chnIndex = 1;
}

var devvecfg = GetCookidStr("devvecfg");            // 设备当前的validvinum, 1~n
if (-1 != devvecfg && !isBlank(devvecfg))
{
    var ret = GetRtspKeyStr(devvecfg, "validvinum");
    if (-2 != ret)
    {
        devChnCnt = parseInt(ret);
    }
}

var lanNum = parseInt(GetCookidStr("language"));    // cookie中记录的语言类别 0英语， 1简体中文
if (szPLName.toLowerCase() == "wscbpi")             // 微思创默认为english
{
    lanNum = 0;
}

ImageDragForbid();
Language_sel();

/*===================================================================
    检测语言种类
===================================================================*/
function Language_sel()
{
    var lantypes;
    if (lanNum == 1)
    {
        lantypes = '<script type="text/javascript" src="/language/chinese.js"></script>';
    }
    else
    {
        lantypes = '<script type="text/javascript" src="/language/english.js"></script>';
    }
    dwn(lantypes);
}
