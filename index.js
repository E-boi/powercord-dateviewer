const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { createElement, getOwnerInstance } = require('powercord/util')
const { getModule } = require('powercord/webpack');

module.exports = class dateViewer extends Plugin {
  startPlugin() {
    this.loadStylesheet('style.css')
    this.state = {
      time: '', date: '', weekday: ''
    };
    this.patchMemberList()
  }
  updateFucker() {
    const element = document.querySelector('.membersWrap-2h-GB4')
    const getViewer = document.querySelector('.dv-main')
    if (getViewer) {
      return getViewer.innerHTML = `<span class='dv-time'>${this.state.time}</span><span class='dv-date'>${this.state.date}</span><span class='dv-weekday'>${this.state.weekday}</span>`
    }
    if (!element) return
    const elm = createElement('div', { id: 'dv-mount' })
    element.append(elm)
    elm.append(createElement('div', { className: 'dv-main', innerHTML: `<span class='dv-time'>${this.state.time}</span><span class='dv-date'>${this.state.date}</span><span class='dv-weekday'>${this.state.weekday}</span>` }))
    setInterval(() => this.update(), 1000)
  }
  update() {
    setTimeout(() => this.updateFucker(), 1000)
    const date = new Date();
    const lang = document.documentElement.lang;
    this.state = {
      time: date.toLocaleTimeString(lang),
      date: date.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }),
      weekday: date.toLocaleDateString(lang, { weekday: 'long' })
    };
  }
  patchMemberList() {
    const { ListThin } = getModule(['ListThin'], false);
    inject('memberList', ListThin, 'render', (_, res) => {
      if (!document.querySelector('.membersWrap-2h-GB4')) {
        clearInterval()
        return res
      }
      this.update()
      return res
    })
  }
  updateMemberList() {
    const memberList = document.querySelector('.membersWrap-2h-GB4');
    if (memberList) getOwnerInstance(memberList).forceUpdate();
  }
  pluginWillUnload() {
    uninject('memberList')
  }
}