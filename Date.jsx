const { React } = require('powercord/webpack');

module.exports = () => {
	const [time, setTime] = React.useState(Date.now());
	const lang = document.documentElement.lang;
	React.useEffect(() => {
		setInterval(() => {
			setTime(Date.now());
		}, 1000);
	}, []);

	return (
		<div id='dv-mount'>
			<div className='dv-main'>
				<span className='dv-time'>{new Date(time).toLocaleTimeString(lang)}</span>
				<span className='dv-date'>{new Date(time).toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
				<span className='dv-weekday'>{new Date(time).toLocaleDateString(lang, { weekday: 'long' })}</span>
			</div>
		</div>
	);
};
