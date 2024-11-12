/*=========================================================================================================
    弹出对话框
    函数说明：
              调用前必须在window.onload中执行MsgBoxInit();reason:document.body.appendChild();

              DragBegin();                      //对话框拖动
              ShowIframe();                     //先画出对话框的形状，底部加一个iframe使其可以不被任何物体阻挡
                                                   包括插件
              ShowMsg(Num, Message,Phref);      //提供给用户的接口函数 @para: Num:显示的按钮的个数, 默认为1个
                                                                       @para: Message:显示的提示信息,默认为空
                                                                       @para: Phref:转到某个页面的超连接地址,默认为空
                                                                           or 用户自定义函数的入口地址，不能带参数 形如:
                                                                              function(函数名note:不要用双引号括起来)
              SetBoxCenter();                   //用户打开消息框时，使其置于整个页面的正中间
              SetMsg(msg);                      //显示的提示信息
              MsgBoxClose();                    //对话框关闭，
              MsgConfirm();                     //确认按钮事件, @para: hyperlink:超链接地址(全局变量)
              MsgCancel();                      //取消按钮事件
              MsgBoxInit();                     //初始化，调用对话框之前必须初始化

    依赖文件: jQuery.js
              client.js

    解决在IE9下使用Filter:Alpha会导致插件花屏的问题,--- 2012-05-04
    解决方法: 如果是IE6, 则需要在MsgBox对话框后加一个iframe层, 如果是IE6以上版本的浏览器, 则不需要iframe层
              如果没有iframe层, 则有选择的标明是使用系统的confirm还是使用模拟的对话框
============================================================================================================*/
function CreateObj(name)
{
    return document.createElement(name)
}

var IfmStyle, DivStyle, hyperlink, BgIfmStyle;
function DragBegin()            //拖动开始
{
    var obj = GetById("Msgbox");

    var x = window.event.clientX;
    var y = window.event.clientY;

    document.onmousemove = function ()
    {
        var _x = window.event.clientX;
        var _y = window.event.clientY;

        obj.style.left = parseInt(obj.style.left) + _x - x + "px";
        obj.style.top = parseInt(obj.style.top) + _y - y + "px";

        x = window.event.clientX;
        y = window.event.clientY;
    }
    document.onmouseup = function ()
    {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function ShowIframe(sys)
{
    var html = new Array();
    var __target_link = "/images/background/top.gif";
    html.push('<div id="MsgboxTitle" onmousedown="DragBegin();" style="width:255px;background-Image:url(' + __target_link + ');"></div>');
    html.push('<div id="Msgboxclose" onclick="MsgBoxClose();" style="">x</div>');
    html.push('<div id="Msg" style="position:relative;width:250px;height:20px;line-height:20px;text-align:center;top:20px;font-size:10pt;"></div>');
    html.push('<div id="Msgboxbut" style="position:absolute;width:250px;height:20px;text-align:center;top:80px;">');
    html.push('</div>');

    var MsgBoxDiv = CreateObj("div");
    MsgBoxDiv.attachEvent("onselectstart", function(){
        return false;
    });

    DivStyle = MsgBoxDiv.style;
    DivStyle.visibility = "hidden";
    DivStyle.position = "absolute";
    DivStyle.top = "0px";//不能占据页面空间
    DivStyle.left = "0px";
    DivStyle.zIndex = 65530;
    DivStyle.width = "250px";
    DivStyle.height = "120px";
    DivStyle.border = "#0098F9 2px solid";
    MsgBoxDiv.id = "Msgbox";

    MsgBoxDiv.innerHTML = html.join("");
    document.body.appendChild(MsgBoxDiv);


    if (parseInt(Client.browser.version) <= 6)
    {
        var MsgBoxIframe = CreateObj("iframe");
        MsgBoxIframe.id = "MsgBoxIframe";
        IfmStyle = MsgBoxIframe.style;

        MsgBoxIframe.frameBorder = 0;
        MsgBoxIframe.height = (MsgBoxDiv.clientHeight + 4) + "px";
        IfmStyle.visibility = "hidden";
        IfmStyle.filter = "alpha(opacity=0)";
        IfmStyle.position = "absolute";
        IfmStyle.top = "-2px";          //为了使iframe和div完全重合
        IfmStyle.left = "-2px";
        IfmStyle.width = GetById("Msgbox").offsetWidth;
        IfmStyle.zIndex = -1;
        MsgBoxDiv.insertAdjacentElement("afterBegin",MsgBoxIframe);
    }
    else
    {
        IfmStyle = null;
    }

    SetMsgBoxBg();
}

function SetMsgBoxBg()
{

    var BgIframe = CreateObj("div");
    BgIframe.id = "BgMsgBox";
    BgIfmStyle = BgIframe.style;

    BgIfmStyle.position = "absolute";
    BgIfmStyle.display = "none";
    var scroll_top = document.body.scrollTop;
    var scroll_left = document.body.scrollLeft;
    var scroll_width = document.body.offsetWidth;
    var scroll_height = document.body.offsetHeight;

    if (parseInt(Client.browser.version) <= 6)
    {
        BgIfmStyle.filter = "alpha(opacity=0)";
    }

    BgIfmStyle.background = "#fff";
    BgIfmStyle.top = "0px";
    BgIfmStyle.left = "0px";
    BgIfmStyle.width = (scroll_width- 25 -scroll_left) + "px";
    BgIfmStyle.height = (scroll_height- 25 -scroll_top) + "px";
    BgIfmStyle.border = "1px solid #f00";

    document.body.appendChild(BgIframe);
}

function ShowMsg (Num, Message, Phref)            //butNum:按钮个数, msg:提示给用户的信息, Phref:转到页面的地址()
{
    var butNum = Num || 1;                      //默认为一个确定按钮

    var msg = Message;                     //默认信息为空
    if (!msg)   msg = "";

    hyperlink = Phref;
    if (!hyperlink) hyperlink = "";

    if (IfmStyle != null)
    {
        IfmStyle.visibility = "visible";
    }

    DivStyle.visibility = "visible";
    BgIfmStyle.display = "block";

    if (butNum == 1)
    {
        GetById("Msgboxbut").innerHTML = '<button id="confirm" class="button" style="width:65px;margin-right:20px;" onclick="MsgConfirm();">确认</button>';
    }
    else if (butNum == 2)
    {
        var butHtml = [];
        butHtml.push('<button id="confirm" class="button" style="width:65px;margin-right:20px;" onclick="MsgConfirm();">确认</button>');
        butHtml.push('<button id="cancel" class="button" style="width:65px;" onclick="MsgCancel();">取消</button>');
        GetById("Msgboxbut").innerHTML = butHtml.join("");
    }

    SetMsg(msg);
    SetBoxCenter();
}

function SetBoxCenter()                             //消息框置中
{
    DivStyle.left = screen.width / 2 - parseInt(DivStyle.width) + 100;
    DivStyle.top = screen.height /2 - parseInt(DivStyle.height) - 80;
    GetById("confirm").focus();
}
function SetMsg(msg)                               //设置用户给出的消息
{
    GetById("Msg").innerText = msg;
    GetById("confirm").innerText = IDC_MSGBOX_CONFIRM;
    GetById("MsgboxTitle").innerText = IDC_MSGBOX_PROMPTMSG;
    if (GetById("cancel") != null)
    {
        GetById("cancel").innerText = IDC_MSGBOX_CANCEL;
    }
}
function MsgBoxClose ()             //关闭对话框
{
    if (IfmStyle != null)
    {
        IfmStyle.visibility = "hidden";
    }
    DivStyle.visibility = "hidden";
    BgIfmStyle.display = "none";
}

function MsgConfirm ()              //确认按钮，关闭对话框并触发某些事件，如转到某个页面，由用户自己定义
{
    MsgBoxClose();

    if (typeof hyperlink == "function")
    {
        hyperlink();
    }
    if (typeof hyperlink == "string")            //非空，转到超链接地址
    {
        self.location.href = hyperlink;
    }
}

function MsgCancel ()           //取消按钮，关闭对话框不触发
{
    MsgBoxClose();
}

/*
解决方法: 如果是IE6, 则需要在MsgBox对话框后加一个iframe层, 如果是IE6以上版本的浏览器, 则不需要iframe层
              如果没有iframe层, 则有选择的标明是使用系统的confirm还是使用模拟的对话框
*/
function MsgBoxInit(sys)           //初始化
{
    ShowIframe(sys);
}
