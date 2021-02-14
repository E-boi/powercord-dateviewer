const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { createElement } = require('powercord/util')
const { getModule, React, ReactDOM } = require('powercord/webpack');

module.exports = class dateViewer extends Plugin {
  startPlugin() {
    this.loadStylesheet('style.css')
    this.state = {
      time: '', date: '', weekday: ''
    };
    this.patchMemberList()
  }
  updateTime() {
    const element = document.querySelector('.membersWrap-2h-GB4')
    const getViewer = document.querySelector('.dv-main')
    if (getViewer) {
      const date = new Date()
      const lang = document.documentElement.lang
      this.state = {
        time: date.toLocaleTimeString(lang),
        date: date.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }),
        weekday: date.toLocaleDateString(lang, { weekday: 'long' })
      };
      return getViewer.childNodes.forEach((ele, key) => ele.textContent = Object.entries(this.state)[key][1])
    }
    if (!element) return
    const elm = React.createElement('div', { className: 'dv-main' },
      React.createElement('span', { className: 'dv-time' }, this.state.time),
      React.createElement('span', { className: 'dv-date' }, this.state.date),
      React.createElement('span', { className: 'dv-weekend' }, this.state.weekday)
    )
    element.append(createElement('div', { id: 'dv-mount' }))
    ReactDOM.render(elm, element.children[1])
  }
  patchMemberList() {
    const { ListThin } = getModule(['ListThin'], false);
    inject('memberList', ListThin, 'render', (_, res) => {
      if (!document.querySelector('.membersWrap-2h-GB4')) return res
      clearInterval(this.interval)
      this.interval = setInterval(() => this.updateTime(), 1000)
      return res
    })
  }
  pluginWillUnload() {
    uninject('memberList')
    console.log(this.interval)
    clearInterval(this.interval)
    document.getElementById('dv-mount').remove()
  }
}