//translates Google Sheet JSON into Meeting Guide format
function meetingsProcessGoogleSheet(data) {
	//see Cateret County example on https://github.com/meeting-guide/spreadsheet
	//https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ5OsDCKSDEvWvqM_Z6tmXe4N-VYEnEAfvU5PX5QXZjHVbnrX-aeiyhWnZp0wpWtOmWjO4L5GJtfFu/pubhtml
	//JSON: https://spreadsheets.google.com/feeds/list/1prbiXHu9JS5eREkYgBQkxlkJELRHqrKz6-_PLGPWIWk/1/public/values?alt=json
		
	let meetings = [];

	for (let i = 0; i < data.feed.entry.length; i++) {

		//creates a meeting object containing a property corresponding to each column header of the Google Sheet
		let meeting = {};
		const meetingKeys = Object.keys(data.feed.entry[i])
		for (let j= 0; j < meetingKeys.length; j++) {
			if (meetingKeys[j].substr(0,4) === 'gsx$') {
				meeting[meetingKeys[j].substr(4)] = data.feed.entry[i][meetingKeys[j]]['$t'];
			}
		}

		//converts time to HH:MM
		let timeTemp = meeting.time.toLowerCase();
		if (timeTemp.includes('am')) {
			meeting.time =  timeTemp.substr(0, timeTemp.indexOf(' am'));
			if (meeting.time === '12') {
				let [ tempHours, tempMinutes ] = timeTemp.split(':');
				tempHours = parseInt(tempHours) - 12;
				meeting.time = tempHours + ':' + tempMinutes;
			}
		} else if (timeTemp.includes('pm')) {
			timeTemp = timeTemp.substr(0, timeTemp.indexOf(' pm'));
			let [ tempHours, tempMinutes ] = timeTemp.split(':');
			if (tempHours !== '12') tempHours = parseInt(tempHours) + 12;
			meeting.time = tempHours + ':' + tempMinutes;
		}

		//array-ifys types
		meeting.types = meeting.types.split(',');

		meetings.push(meeting);
	}
		
	return meetings;
}


export default meetingsProcessGoogleSheet;