window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
	// The speech recognition interface lives on the browser’s window object as SpeechRecognition in Firefox and as
	// webkitSpeechRecognition in Chrome.
    
const recognition = new SpeechRecognition();
// new speech recognition object.
recognition.interimResults = true;
// // Interim results are results that are not yet final
// true means interim results are returned
// If you set the recognition.interimResults = true, then your event handler is going to give you a stream of results back, until you 
// stop talking.
recognition.lang = "en-US";

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);
// appendChild() method adds a node to the end of the list of children of a specified parent node

recognition.addEventListener("result", (e) => {  //list
    // console.log(e);
	const transcript = Array.from(e.results)    //array
		.map((result) => result[0])
		.map((result) => result.transcript)    
        .join("");
        console.log(e.results[0]);

	const happyScript = transcript.replace(/happy|smile|calm/gi, "😊");
	p.textContent = happyScript;

	if (e.results[0].isFinal) {
		p = document.createElement("p");
		words.appendChild(p);
	}
});

recognition.addEventListener("end", recognition.start);

recognition.start();
