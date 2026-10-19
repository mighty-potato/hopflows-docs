// Run with node tools/design-preview/verify.mjs. No packages required.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../docs/design');
let checks = 0;
function check(label, fn) {fn(); checks++; console.log('PASS ' + label);}
function component(name, props = {}) {
  const html = fs.readFileSync(path.join(root, name + '.dc.html'), 'utf8');
  const script = html.match(/<script[^>]*data-dc-script[^>]*>([\s\S]*?)<\/script>/)[1];
  const Class = vm.runInNewContext(script + '\nComponent', {DCLogic: class {
    constructor() {this.state = {}; this.props = props;}
    setState(patch) {Object.assign(this.state, patch);}
  }});
  return new Class();
}
const today = component('Main');
check('Today starts with 1 confirmed Done; review submission does not increment Done', () => {
  today.renderVals().sendCheckout();
  assert.equal(today.renderVals().doneCount, 1);
  assert.equal(today.renderVals().checkoutSent, true);
  assert.equal(today.renderVals().allClear, false);
});
check('Owner finishes remaining work: 2 Done, 1 awaiting review', () => {
  today.renderVals().advanceMenu(); today.renderVals().advanceMenu();
  assert.equal(today.renderVals().yourPartDone, true);
  assert.equal(today.renderVals().doneCount, 2);
  assert.equal(today.renderVals().allClear, false);
});
check('Accepted state alone shows 3 Done and All clear', () => {
  const accepted = component('Main', {state: 'allClear'}).renderVals();
  assert.equal(accepted.doneCount, 3); assert.equal(accepted.allClear, true);
  assert.equal(accepted.checkoutSent, false); assert.equal(accepted.checkoutActive, false);
});
check('Checklist changes survive subsequent component state updates', () => {
  today.renderVals().toggleThree();today.renderVals().setPriorityNote({target: {value: 'Urgent shop issue first'}});
  assert.equal(today.renderVals().stepThree, true);
});
check('Discuss priorities requires a note and does not change task status', () => {
  const c = component('Main');c.renderVals().discussPriorities();assert.equal(c.renderVals().priorityError, true);
  c.renderVals().setPriorityNote({target:{value:'Please check the order'}});c.renderVals().discussPriorities();
  assert.equal(c.renderVals().prioritiesSent, true);assert.equal(c.renderVals().checkoutActive, true);
});
const tasks = component('MyTasks');
const find = id => tasks.renderVals().rows.find(c => c.id === id);
check('Default task order prioritizes active and blocked work', () => {
  assert.deepEqual(Array.from(tasks.renderVals().listColumns, c => c.name), ['In progress','Needs help','To do','Awaiting review','Done']);
});
check('Blocked task cannot finish until unblocked', () => {
  assert.equal(find('printer').canFinish, false);assert.equal(find('printer').action, 'Unblock');
  find('printer').unblock();assert.equal(find('printer').status, 'In progress');assert.equal(find('printer').canFinish, true);
});
check('Review-required task is sent to Review, not Done', () => {
  assert.equal(find('checkout').finishLabel, 'Send to review');find('checkout').finish();
  assert.equal(find('checkout').status, 'Review');assert.equal(find('checkout').canFinish, false);
});
check('All task views use the same updated data', () => {
  for (const name of ['Board','Table','List']) {tasks.renderVals().views.find(v => v.name === name).pick();assert.equal(find('checkout').status, 'Review');}
});
check('Blocker note edits survive view switches', () => {
  find('printer').editBlocker({target:{value:'Vendor confirmed replacement tomorrow'}});
  tasks.renderVals().views.find(v=>v.name==='Board').pick();assert.equal(find('printer').blockerNote,'Vendor confirmed replacement tomorrow');
});
check('Task detail owner can request review; helper cannot', () => {
  const owner=component('TaskDetail');owner.renderVals().sendReview();assert.equal(owner.renderVals().canSendReview,false);assert.equal(owner.renderVals().statusLabel,'Awaiting review');
  assert.equal(component('TaskDetail',{viewer:'helper'}).renderVals().canSendReview,false);
});
check('Add Work retains the task/request routing distinction', () => {
  const c=component('AddWork');assert.equal(c.renderVals().doneLabel,'Add to my tasks');c.renderVals().pickRequest();assert.equal(c.renderVals().doneLabel,'Send to Chenda');assert.equal(c.renderVals().doneHref,'MyRequests.dc.html');
});
check('Calendar exposes all view choices and Week filters to the current week', () => {
  const c=component('Calendar');assert.equal(c.renderVals().calendarClass,'hf-calendar-responsive');c.renderVals().mobileViews.find(v=>v.name==='Week').pick();assert.equal(c.renderVals().calendarClass,'hf-calendar-explicit-week');assert.equal(c.renderVals().agenda.length,3);
});
check('Every employee screen imports mobile navigation, shared CSS, and valid local components', () => {
  const files=fs.readdirSync(root).filter(f=>f.endsWith('.dc.html'));
  for(const file of files){const html=fs.readFileSync(path.join(root,file),'utf8');
    if(html.includes('persona="employee"')){assert.match(html,/name="MobileNav"/);assert.match(html,/href="\/_blob\/9275412045caede2fafcdfc2bb2771d3"/);}
    for(const match of html.matchAll(/<dc-import name="([^"]+)"/g)) assert.ok(files.includes(match[1]+'.dc.html'),file+': missing import '+match[1]);
    // Parse every component script, including unchanged shared/lead screens.
    component(file.replace('.dc.html',''));
  }
});
check('Top 3 is a subset; search and filters preserve task state across views', () => {
  const c = component('MyTasks');
  assert.equal(c.renderVals().totalCount, 9);
  c.renderVals().filters.find(f => f.label === 'Top 3').pick();
  assert.equal(c.renderVals().visibleCount, 3);
  c.renderVals().rows.find(t => t.id === 'photos').start();
  c.renderVals().resetFilters();
  assert.equal(c.renderVals().visibleCount, 9);
  assert.equal(c.renderVals().rows.find(t => t.id === 'photos').status, 'In progress');
  c.renderVals().setQuery({target: {value: 'MENU'}});
  assert.equal(c.renderVals().visibleCount, 2);
  c.renderVals().filters.find(f => f.label === 'Needs help').pick();
  assert.equal(c.renderVals().noResults, true);
  c.renderVals().resetFilters();
  c.renderVals().filters.find(f => f.label === 'Awaiting review').pick();
  assert.equal(c.renderVals().visibleCount, 1);
});
check('Completed tasks collapse, search reveals matches, and Undo restores status', () => {
  const c = component('MyTasks');
  assert.equal(c.renderVals().listColumns.find(g => g.isDone).expanded, false);
  c.renderVals().toggleDone();
  assert.equal(c.renderVals().listColumns.find(g => g.isDone).expanded, true);
  c.renderVals().toggleDone();
  c.renderVals().setQuery({target: {value: 'rounding'}});
  assert.equal(c.renderVals().listColumns.find(g => g.isDone).expanded, true);
  c.renderVals().resetFilters();
  c.renderVals().rows.find(t => t.id === 'photos').start();
  c.renderVals().rows.find(t => t.id === 'photos').finish();
  assert.equal(c.renderVals().doneCount, 3);
  c.renderVals().undo();
  assert.equal(c.renderVals().rows.find(t => t.id === 'photos').status, 'In progress');
  assert.equal(c.renderVals().doneCount, 2);
  assert.equal(c.renderVals().canUndo, false);
});
console.log(`${checks} verification groups passed.`);
