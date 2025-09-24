const http = require("http");
const dateEt = require("./src/dateTimeET");
//lisame mooduli, et päringu URL-i mõista
const url = require("url");
//liidame mooduli, et lisada virtuaalsele failisüsteemile päris failitee osi
const path = require("path");
const fs = require("fs");
const textRef = "txt/vanasõnad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="UTF-8">\n\t<title>Kevin Lillemets, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Kevin Lillemets, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee/">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu.</p>\n\t<hr>';
const pageBanner = '<img src="AA.png" alt="Kursuse bänner">';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	//vaatan päringut (req), mida klient tahab
	console.log("Praegune URL: " + req.url);
	//eraldame (parse) puhta URL-i ilma parameetrite jms kraamita
	let currentUrl = url.parse(req.url, true);
	console.log("Puhas url: " + currentUrl.pathname);
	
	//loon marsruudid erinevate URL-ide jaoks
	
	//avaleht
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
		res.write('\n\t<p>Vaata ka valikut <a href = "/vanasonad">vanasõnu</a>.</p>');
		res.write(pageEnd);
		return res.end();
	} // "/" lõpeb
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageStart);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
				res.write(pageEnd);
				return res.end();
			} else {
				let oldWisdomList = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < oldWisdomList.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageStart);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageEnd);
				return res.end();
			}
		});
	} // "/vanasonad" lõpeb
	
	else if(currentUrl.pathname === "/AA.png"){
		//liidame veebilehe aadressile vajaliku päris kataloogi nime
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			}
			else {
				res.writeHead(200, {"content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	
	else{
		res.end("Viga 404, sellist lehte ei ole olemas!")
	} // else lõpeb
}).listen(5318);