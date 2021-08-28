const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, React } = require('powercord/webpack');
const DateComponent = require('./Date');

module.exports = class dateViewer extends Plugin {
	startPlugin() {
		this.loadStylesheet('style.css');
		this.patchMemberList();
	}

	patchMemberList() {
		const { ListThin } = getModule(['ListThin'], false);
		inject('memberList', ListThin, 'render', (args, res) => {
			if (!args[0] || !args[0].innerAriaLabel?.startsWith('Members')) {
				return res;
			}
			res.props.children = [res.props.children, React.createElement(DateComponent)];
			return res;
		});
	}
	pluginWillUnload() {
		uninject('memberList');
		document.getElementById('dv-mount').remove();
	}
};
