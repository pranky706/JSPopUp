const url = 'https://3fbb-2401-4900-3627-3fe3-69b8-dd9a-31ea-b2e6.ngrok.io';//'http://localhost:8080'


var body = document.getElementsByTagName("BODY")[0];

body.onload = function () {
	//getDateConfig();
	getTimerConfig();
	let custId = "000000000";
	custId = getCustomerId();
	console.log(custId);
	let customer = {"coustomerId": custId};
	sendCustomer(customer);
	console.log("Id sent sucessfully");
};


const getTimerConfig = async () => {


	fetch(url + '/getTimerConfig', {
  		//mode: 'no-cors',
  		method: "GET",
  		headers: {
			"Content-type": "application/json;charset=UTF-8"
		}
	}).then((response) => response.json())
  	.then((res) => {
		const time = res.time;
		console.log(time);
		setTimeout(() => {
			popUpFunction();
		}, time);
  	})
	.catch(err => console.log(err));
}


const getDateConfig = async () => {


fetch(url + '/getDateConfig', {
  //mode: 'no-cors',
  method: "GET",
  headers: {
			"Content-type": "application/json;charset=UTF-8"
		}
}).then((response) => response.json())
  .then((res) => {
	const startDate = new Date(res.startDate);
	const endDate= new Date(res.endDate);
    console.log(startDate);
	console.log(endDate);
	const currDate = new Date();
	console.log(currDate);
	if(currDate <= endDate && startDate <= currDate) {
		console.log("Yes in between");
		popUpFunction();
	} else {
		console.log("No, not in between");
	}
  }).catch(err => console.log(err));
}

const sendCustomer = async (customer) => {
  const response = await fetch(url + '/sendCustomer', {
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify(customer),
    headers: new Headers({'Content-Type': 'application/json'})
  });
  const myJson = await response;
  console.log(myJson);
}



function getCustomerId() {
    try {
        return ShopifyAnalytics.lib.user().id();
    } catch(e) {}
    try {
        return ShopifyAnalytics.lib.user().properties().uniqToken;
    } catch(e) {}
    try {
        return ShopifyAnalytics.lib.user().anonymousId();
    } catch(e) {}
    try {
        return ShopifyAnalytics.meta.page.customerId;
    } catch(e) {}
    return __st_uniqToken;
  }

function popUpFunction() {

	var styles = `.btn{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(48, 48, 177);
  font-size: 20px;
  color: white;
  padding: 10px 30px;
  cursor: pointer;
}

#modalContainer {
    background-color:rgba(0, 0, 0, 0.3);
    position:absolute;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:10000;
}

#alertBox {
    position:relative;
    width:500px;
    min-height:100px;
    margin-top:250px;
    border:1px solid #666;
    background-color: pink;
    background-repeat:no-repeat;
    background-position:20px 30px;
}

#alertBox h1 {
    margin:0;
    font:bold 0.9em verdana,arial;
    background-color:white;
    color: black;
    border-bottom:1px solid #000;
    padding:2px 0 2px 5px;
}

#alertBox p {
    font:0.7em verdana,arial;
    height:50px;
    padding-left:5px;
    margin-left:55px;
}

#alertBox #closeBtn {
    display:block;
    position:relative;
    margin:5px auto;
    padding:7px;
    border:0 none;
    width:70px;
    font:0.7em verdana,arial;
    text-transform:uppercase;
    text-align:center;
    color:#FFF;
    background-color:#95b9d8;
    border-radius: 3px;
    text-decoration:none;
}`;

	addCss(styles);
	createCustomAlert("This is an alert");
}


function addCss(cssCode) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}


var titleAlert = "It Pops!!!";
var closeModal = "Ok";


//Function To Create Custom Alert
function createCustomAlert(txt) {
	doc = document;

	if (doc.getElementById("modalContainer")) return;

	//Create Div For Modal Container Body
	modalObject = doc.getElementsByTagName("body")[0].appendChild(doc.createElement("div"));
	modalObject.id = "modalContainer";
	modalObject.style.height = doc.documentElement.scrollHeight + "px";

	//Create Div For Alert Box Container Body
	alertObj = modalObject.appendChild(doc.createElement("div"));
	alertObj.id = "alertBox";
	if (doc.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (doc.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
	alertObj.style.visiblity = "visible";

	//Create Element For Title Alert
	h1 = alertObj.appendChild(doc.createElement("h1"));
	h1.appendChild(doc.createTextNode(titleAlert));

	//Create Tag For Alert Body Content
	msg = alertObj.appendChild(doc.createElement("p"));
	msg.appendChild(doc.createTextNode(txt));
	msg.innerHTML = txt;

	//Create Tag To Close Modal Button
	btn = alertObj.appendChild(doc.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(doc.createTextNode(closeModal));
	btn.href = "#";
	btn.focus();
	btn.onclick = function () {
		removeCustomAlert();
		return false;
	}

	alertObj.style.display = "block";

}

//Function To Remove Custom Alert
function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
