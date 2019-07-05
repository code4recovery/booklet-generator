// takes processed meetings JSON and converts to a LaTex string
function meetingsToLatex(appState, meetingsState, setMeetingsState, callback, meetings, errors) {
	
	setMeetingsState('errors', errors);
	setMeetingsState('load_message', errors.length ? "Error Loading" : "Loaded Successfully");
	setMeetingsState('latex', meetings);
	callback();

}

export default meetingsToLatex;