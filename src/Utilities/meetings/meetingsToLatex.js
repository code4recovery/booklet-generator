// takes processed meetings JSON and converts to a LaTex string
export default function meetingsToLatex(appState, meetingsState, setMeetingsState, callback, meetings, errors) {
	
	let latex = '';
	let meetingsByDay = [];

	console.log(meetings);

	// sorts meeting by day
	for (let i=0; i < 7; i++) {
		meetingsByDay[i] = [];
		for (let j=0; j < meetings.length; j++) {
  			if (meetings[j].day === i.toString()) {
				meetingsByDay[i].push(meetings[j]);
			}
		}
	}

	// loops through and creates latex for each meeting organized by day
	for (let i=0; i < 7; i++) {
		//need to do latex for day heading
		for (let j=0; j<meetingsByDay[i].length; j++) {
			latex += singleMeetingToLatex(meetingsByDay[i][j]);
		}
	}

	console.log(latex);

	//updates Meeting state 
	setMeetingsState('errors', errors);
	setMeetingsState('load_message', errors.length ? "Error Loading" : "Loaded Successfully");
	setMeetingsState('latex', latex);
	callback();
}

function singleMeetingToLatex(meeting){
	let newname = latexEscapeCharacterFilter(meeting.name);
	let newaddress = latexEscapeCharacterFilter(meeting.address);
	let newnotes = latexEscapeCharacterFilter(meeting.notes);

	//need to format time
	let latex = "\\settowidth{\\extSpace}{" + meeting.time + "} \\setlength{\\extSpace}{4.2em - \\extSpace} ";
		latex = latex + meeting.time + " \\hspace{\\extSpace} \\textbf{"+newname+"} \\hfill "+meeting.city+"\n";
		latex = latex + "\\settowidth{\\extSpace}{" + meeting.types + "} \\setlength{\\extSpace}{4.2em - \\extSpace} ";
		latex = latex + "\\\\ " + meeting.types + " \\hspace{\\extSpace} " + newaddress + newnotes;

	return latex;
}

function latexEscapeCharacterFilter(preString){
	let postString = preString.replace(/&/g, "\\&");
	// right now only a need for &
	//postString = postString.replace(/%/g, "\\%");
	// $ is doing something weird so definitely leave it out until issue figured out
	//postString = postString.replace(/$/g, "\\$");
	postString = postString.replace(/#/g, "\\#");
	//postString = postString.replace(/_/g, "\\_");
	//postString = postString.replace(/\{/g, "\\\{");
	//postString = postString.replace(/\}/g, "\\\}");
	return postString;
}

function formatTime(time) {

	//check that string is HH:MM
	if (!time || time.length !== 5 || time.substr(2, 1) !== ':') return null;

	//get hours and minutes
	const [ hours, minutes ] = time.split(':');

	//check for times with special names
	if (hours == '12' && minutes == '00') {
		//return strings.noon;
		return "noon";
	} else if (
		(hours == '00' && minutes == '00') || 
		(hours == '23' && minutes == '59') || 
		(hours == '24' && minutes == '00')
	) {
		//return strings.midnight;
		return "midnight";
	}

	//create a date object
	let date = new Date();
	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));
	return date.toLocaleTimeString([], {
		hour: '2-digit',
		minute:'2-digit'
	});
}