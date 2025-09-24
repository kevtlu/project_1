const http = require("http");
const dateEt = require("./src/dateTimeET");
const fs = require("fs");
const textRef = "txt/vanasõnad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="UTF-8">\n\t<title>Kevin Lillemets, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Kevin Lillemets, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee/">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu.</p>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Juhhei! Läkski käima!");
	res.write(pageStart);
	res.write(pageBody);
	res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate()+ ". Kell on " + dateEt.time() + ".</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5318);