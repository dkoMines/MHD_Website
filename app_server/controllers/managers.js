/* Get Managers page */
const managerInput = (req, res) => {
	res.render('managerInput', { 
		title: 'Manager Input',
		pageHeader: {
			title: 'HWI',
			strapline: 'Assign mental health days to your employees'
		}
	});

};

var dt = new Array("2/3/19","5/1/19","6/18/19");
var dtNil = new Array();

const managerRead = (req, res) => {
	res.render('managerRead', { 
		title: 'Manager Read',
		pageHeader: {
			title: 'HWI',
			strapline: 'View Employee Mental Health Day History'
		},
		employees: [{
			name: 'Dylan',
			daysLeft: '3',
			datesTaken: dt
		},
		{
			name: 'Chris',
			daysLeft: '5',
			datesTaken: dtNil
		},
		{
			name: 'Kyle',
			daysLeft: '1',
			datesTaken: dt
		}]
	});
};

module.exports = {
	managerInput,
	managerRead
};