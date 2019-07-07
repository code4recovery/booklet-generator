//uses TexLive.js to generate a PDF from the latex produced by the App

export default function generatePDF(appState, setGenerateState){
	let pdftex = new window.PDFTeX();
	let latex_code = "" + 
	"\\documentclass{article}" + 
	"\\begin{document}" + 
	"\\LaTeX is great!" + 
	"$E = mc^2$" + 
	"\\end{document}"; 

	pdftex.compile(latex_code)
		.then(function(pdf) {
			setGenerateState("download", pdf);
			setGenerateState("loading", false);
		}
	);
}