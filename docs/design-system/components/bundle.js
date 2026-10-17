/* @ds-bundle: {"format":4,"namespace":"HopFlows","components":[{"name":"Button"},{"name":"StatusPill"},{"name":"CapacityCell"},{"name":"Tile"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }

  function Button(p) {
    var rest = omit(p, ['variant', 'size', 'className', 'children']);
    rest.type = rest.type || 'button';
    rest.className = cx('hf-btn', 'hf-btn-' + (p.variant || 'primary'), 'hf-btn-' + (p.size || 'md'), p.className);
    return h('button', rest, p.children);
  }

  var PILL = { 'on-track': 'On track', 'at-risk': 'At risk', 'off-track': 'Off track', 'urgent': 'Urgent' };
  function StatusPill(p) {
    var tone = p.tone || 'on-track';
    var rest = omit(p, ['tone', 'className', 'children']);
    rest.className = cx('hf-pill', 'hf-pill-' + tone, p.className);
    return h('span', rest, tone === 'urgent' ? null : h('span', { className: 'hf-pill-dot', 'aria-hidden': 'true' }), p.children || PILL[tone]);
  }

  var CAP = { room: 'Room', balanced: 'Balanced', buffer: 'Using buffer', overloaded: 'Overloaded', away: 'Away' };
  function CapacityCell(p) {
    var state = p.state || 'balanced';
    var rest = omit(p, ['state', 'hours', 'className', 'children']);
    rest.className = cx('hf-cap', 'hf-cap-' + state, p.className);
    return h('div', rest, h('span', null, p.children || CAP[state]), p.hours ? h('span', { className: 'hf-cap-hours' }, p.hours) : null);
  }

  function Tile(p) {
    var tone = p.tone || 'card';
    var rest = omit(p, ['tone', 'hero', 'label', 'value', 'text', 'note', 'className', 'children']);
    rest.className = cx('hf-tile', 'hf-tile-' + tone, p.hero && 'hf-tile-hero', p.className);
    return h('div', rest,
      p.label ? h('span', { className: 'hf-tile-label' }, p.label) : null,
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
        p.value ? h('span', { className: 'hf-tile-value' }, p.value) : null,
        p.text ? h('span', { className: 'hf-tile-text' }, p.text) : null,
        p.note ? h('span', { className: 'hf-tile-note' }, p.note) : null),
      p.children);
  }

  window.HopFlows = { Button: Button, StatusPill: StatusPill, CapacityCell: CapacityCell, Tile: Tile };
})();
