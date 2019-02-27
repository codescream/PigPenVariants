
window.onresize = Response;
let tempButton = 'decode';
let encrypt = '';
let encrypts;
let code = false;
let leftHand = 22.5;
let topHand = 315;
let msgHeight = 153;
let msgWidth = 46.5;
let msgLeft = 28;
let msgTop = 50;
let trashMsg;
let dropMsg;
let text;
let task;
let pause;
let paused = false;
let btnId;
let count = false;
let message = document.getElementById('message');
let label = document.getElementById('label');
let eye = document.getElementById('eye');
let trash = document.getElementById('trash');
let trashcan = document.getElementById('trashcan');
let goback = document.getElementById('goback');
message.disabled = true;
let encode = document.getElementById('encode');
let decode = document.getElementById('decode');
let msgFont = message.style.fontFamily;
let hand = document.getElementById('hand');
let handAnim;
let messageAnim;
let varPicked = false;
let varPickedCheckTimer = setInterval('VarPickedCheck()', 10);
let style = window.getComputedStyle(message);
let msgTopInPx = style.getPropertyValue('top');

let styles3 = window.getComputedStyle(eye);
let tops3 = styles3.getPropertyValue('height');
let tops4 = styles3.getPropertyValue('top');

let styles4 = window.getComputedStyle(trashcan);
let tops5 = styles4.getPropertyValue('top');

eye.style.top = (-64 - (parseFloat(tops3)/2) + (parseFloat(msgTopInPx) - 30)) + 'px';  


let style2 = window.getComputedStyle(encode);
let btnTopInPx = style2.getPropertyValue('top');

let msgHeightInPx = style.getPropertyValue('height');

function Response()
{
  let style = window.getComputedStyle(message);
  let msgTopInPx = style.getPropertyValue('top');


  let styles3 = window.getComputedStyle(eye);
  let tops3 = styles3.getPropertyValue('height');

  eye.style.top = (-64 - (parseFloat(tops3)/2) + (parseFloat(msgTopInPx) - 25)) + 'px';
} // Response()

function VarPickedCheck()
{
  if(varPicked && count)
  {
    message.disabled = false;
  }
} // VarPickedCheck

function CodeDecode(id)
{
  if(message.value == '') // display hand
    {
      hand.style.display = 'inline';
      clearInterval(handAnim);
      handAnim = setInterval('AnimateHand()', 100);
    }
  else
  {
    clearInterval(handAnim);
    trash.disabled = false;
    hand.style.display = 'none';
    goback.style.display = 'inline';
    document.getElementById(id).style.display = 'none';

    btnId = id;
    messageAnim = setInterval('AnimateMessage()', 10);
    count = false;
  }
} // CodeDecode()

function AnimateHand()
{
  if(leftHand >= 22.5)
  {
    leftHand -= 0.5;
    topHand += 1;
  }
  else
  {
    leftHand += 0.5;
    topHand -= 1;
  }
    hand.style.top = topHand + 'px';
    hand.style.left = leftHand + '%';
} // AnimateHand()

function AnimateMessage()
{
  if(msgHeight >= 0)
  {
    msgHeight -= 5;
    message.style.height = msgHeight + 'px';
  }
  else
  {
    clearInterval(messageAnim);
    message.style.display = 'none';
    pause = setTimeout('Paused()', 1000);
  }
} // AnimateMessage()

function Paused()
{
  if(!code)
  {
    message.disabled = true;
    message.setAttribute('style', 'font-family: ' + encrypt + ';');
    text = message.value;
    code = true;
  }
  else
  {
    message.disabled = false;
    message.setAttribute('style', 'font-family: ' + "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
    text = message.value;
    encrypts = encrypt;
    code = false;
  }

  tempButton = btnId;
  message.style.display = 'inline';
  msgHeight = 153;
  message.style.height = '153px';
  message.disabled = true;
} // Paused()

function ChooseVar(val)
{
  let value = parseInt(val);
  varPicked = true;
  if(task != 2)
  {
    message.setAttribute('placeholder', 'Enter message...');
  }
  else
  {
    message.setAttribute('placeholder', '');
    if(code)
    {
      message.value = '';
    }
  }

  switch(value)
  {
    case 0,1:
    {
      encrypt = 'PigPenCodeFont';
      if(task == 2)
      {
        message.style.fontFamily = 'PigPenCodeFont';
      }
      break;
    }
    case 2:
    {
      encrypt = 'Masonic Cipher Medium';
      if(task == 2)
      {
        message.style.fontFamily = 'Masonic Cipher Medium';
      }
      break;
    }
    case 3:
    {
      encrypt = 'Cipher Code Regular';
      if(task == 2)
      {
        message.style.fontFamily = 'Cipher Code Regular';
      }
      break;
    }
    default:
    {
      // should never happen
    }
  }

  if(code)
  {
    message.setAttribute('style', 'font-family: ' + encrypt + ';');
  }
  else
  {
    message.setAttribute('style', 'font-family: ' + "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" + ';');
  }
} // ChooseVar()

function Task(val)
{
  task = parseInt(val);
  count = true;
  trash.disabled = true;
  goback.style.display = 'none';
  if(encrypt == '')
  {
    message.setAttribute('placeholder', 'Choose Decode Variant...');
  }
  else
  {
    message.setAttribute('placeholder', '');
  }
  switch(task)
  {
    case 1:
    {
      tempButton = 'encode';
      code = false;
      decode.style.display = 'none';
      encode.style.display = 'inline';
      message.value = '';
      message.style.fontFamily = '';
      break;
    }
    case 2:
    {
      tempButton = 'decode';
      code = true;
      decode.style.display = 'inline';
      encode.style.display = 'none';
      message.value = '';
      message.style.fontFamily = encrypt;
      break;
    }
  }
} // Task()

function Trash()
{
  trashMsg = setInterval('TrashMsg()', 50);
  document.getElementById('trashcan').style.display = 'inline';
} // Trash()

function TrashMsg()
{
  msgHeight -= 15.3;
  msgWidth -= 4.65;
  message.style.height = msgHeight + 'px';
  message.style.width = msgWidth + '%';
  if(msgHeight < 0)
  {
    clearInterval(trashMsg);
    dropMsg = setInterval('DropMsg()', 50);
  }
} // TrashMsg()

function DropMsg()
{
  if(msgTop <= (parseFloat(tops5)))
  {
    msgTop += 2;
    message.style.top = msgTop + '%';
  }
  else
  {
    clearInterval(dropMsg);
    message.style.top = '50%'
    message.style.width = '46.5%'
    message.style.height = '153px'
    msgHeight = 153;
    msgWidth = 46.5;
    msgLeft = 28;
    msgTop = 50;
    location.reload(true);
  }
} // DropMsg()

function GoBack()
{
  message.value = text;
  message.disabled = false;
  trash.disabled = true;
  goback.style.display ='none';
  document.getElementById(btnId).style.display = 'inline';
  if(tempButton == 'encode')
  {
    message.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    code = false;
  }
  else
  {
    message.style.fontFamily = encrypts;
    encrypt = encrypts;
    code = true;
  }
} // GoBack()