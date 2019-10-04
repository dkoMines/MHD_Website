/* GET homepage */
const index = (req, res) => {
	res.render('index', { title: 'Mental Health Day Tracker'});
};
module.exports = {
	index
};