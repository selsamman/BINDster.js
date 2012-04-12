function formatJS(file, startingLine, endingLine, containerId)
{
	file = getFile(file, parseJS, {startingLine: startingLine, endingLine: endingLine, containerId: containerId});
}
function formatJSFromTextArea(textAreaId, startingLine, endingLine, containerId)
{
	parseJS.call({startingLine: startingLine, endingLine: endingLine, containerId: containerId}, 
		document.getElementById(textAreaId).value);
}
function parseJS(text)
{
	var text = text
		.replace(/_textarea_/, "textarea")
		.replace(/\>/g, "&gt;")
		.replace(/\r|\n/g, ">5")
		//.replace(/\<script(.*?)&gt;(.+?)\<\/script&gt;/gi, "<script$1&gt;>3Boo>4</script&gt;")
		.replace(/>5/g, "\n")
		//.replace(/ /g, "&nbsp;")
		.replace(/\<(b:[A-Za-z:]+)/g, "&lt;>3$1>4")
		.replace(/\<(\/b:[A-Za-z:]+)/g, "&lt;>3$1>4")
		.replace(/\<([A-Za-z:]+)/g, "&lt;>1$1>2")
		.replace(/\<(\/[A-Za-z:]+)/g, "&lt;>1$1>2")
		.replace(/\</g, "&lt;")
		.replace(/>1/g, "<span style='color: red'>")
		.replace(/>2/g, "</span>")
		.replace(/>3/g, "<span style='color: #2f7da5;font-weight: bold'>")
		.replace(/>4/g, "</span>")
		//.replace(/>3/g, "<div style='color: #a29647'>")
		//.replace(/>4/g, "</div>")
		
		.replace(/\t\t\t\t\t\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 160px'>$1</div>\n")
		.replace(/\t\t\t\t\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 144px'>$1</div>\n")
		.replace(/\t\t\t\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 128px'>$1</div>\n")
		.replace(/\t\t\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 112px'>$1</div>\n")
		.replace(/\t\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 96px'>$1</div>\n")
		.replace(/\t\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 80px'>$1</div>\n")
		.replace(/\t\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 64px'>$1</div>\n")
		.replace(/\t\t\t(.*)(\r|\n)/g, "<div style='margin-left: 48px'>$1</div>\n")
		.replace(/\t\t(.*)(\r|\n)/g, "<div style='margin-left: 32px'>$1</div>\n")
		.replace(/\t(.*)(\r|\n)/g, "<div style='margin-left: 16px'>$1</div>\n")
		
		.replace(/(b:[A-Za-z]+=".*?")/g, "<span style='color: #2f7da5;font-weight: bold'>$1</span>")
		.replace(/(&nbsp;[A-Za-z]+=".*?")/g, "<span style='color: #648b27'>$1</span>")
		//.replace(/\r|\n/g, "<br/>");

	var lines = text.split(/\r|\n|\r\n|\n\r/);
	if (!this.startingLine) {
		this.startingLine = 1;
		this.endingLine = lines.length;
	}
	var text = "";
	for (var ix = this.startingLine - 1; ix < this.endingLine && ix < lines.length - 1; ++ix) {
		text += ("<div class='codeLineNumber'>" + (ix + 1) + ":</div><div class='codeLine'>" + lines[ix] + "</div><br />");
	}
	text = text + "<div class='codeClear'>&nbsp;</div>";
	if (this.containerId)
		document.getElementById(this.containerId).innerHTML = text 
	else
		document.write(text);
}
function getFile (file, callback, obj)
{
	var request = getXMLHTTPRequest();
	request.onreadystatechange = function ()
	{
		if (request.readyState != 4)
			return;
		
		if(request.status == 200 || request.status == 0)
			callback.call(obj, request.responseText);
		else
			alert ("getXML returned" + request.status);
	}
	request.open('GET', file);
	request.send("");
}

function getXMLHTTPRequest()
{
	try {
		return new XMLHttpRequest();
	} catch (e) {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e2) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e3) {
				alert('No support for XMLHTTP');
			}
		}
	}
}
