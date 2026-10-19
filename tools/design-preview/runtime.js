/* Minimal local adapter, not the Claude Design runtime. No network mutations. */
(() => {
  const sources = new Map();
  const components = [];
  const evaluate = (expression, scope) => Function('scope', `with(scope){return (${expression});}`)(scope);
  const whole = /^\s*\{\{([^{}]*?)\}\}\s*$/;
  function value(raw, scope) {
    const match = raw.match(whole);
    return match ? evaluate(match[1], scope) : raw.replace(/\{\{([\s\S]*?)\}\}/g, (_, expression) => String(evaluate(expression, scope) ?? ''));
  }
  async function source(name) {
    if (!sources.has(name)) sources.set(name, fetch(`/docs/design/${name}.dc.html`).then(r => {
      if (!r.ok) throw Error(`Missing component: ${name}`);
      return r.text();
    }).then(text => new DOMParser().parseFromString(
      // Native HTML parsing foster-parents custom elements inside tables.
      // Templates preserve the intended row/loop hierarchy until expansion.
      text.replace(/<(\/?)sc-(for|if)\b/g, (_, close, kind) => close ? '</template' : `<template data-sc-${kind}`),
      'text/html')));
    return sources.get(name);
  }
  function diagnostics() {
    const visible = element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
    const small = [...document.querySelectorAll('button, summary, label:has(input[type=checkbox])')].filter(visible).filter(el => el.getBoundingClientRect().height < 43.5).map(el => ({text: el.textContent.trim().slice(0, 60), height: el.getBoundingClientRect().height}));
    const unresolved = document.body.textContent.includes('{{');
    return {width: innerWidth, documentWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1, smallTargets: small, unresolved, errors: window.previewErrors || []};
  }
  window.previewDiagnostics = diagnostics;
  window.addEventListener('error', e => (window.previewErrors ||= []).push(e.message));

  class DCLogic {
    constructor(props) { this.props = props; this.state = {}; }
    setState(patch) {
      this.state = Object.assign({}, this.state, patch);
      this.renderPromise = this.redraw();
      return this.renderPromise;
    }
  }
  async function mount(name, host, givenProps = {}) {
    const doc = await source(name);
    const script = doc.querySelector('script[data-dc-script]');
    const spec = JSON.parse(script?.getAttribute('data-props') || '{}');
    const defaults = Object.fromEntries(Object.entries(spec).filter(([k]) => k !== '$preview').map(([k,v]) => [k, v.default]));
    const Class = Function('DCLogic', `${script?.textContent || 'class Component extends DCLogic {renderVals(){return {}}}'}; return Component;`)(DCLogic);
    const instance = new Class(Object.assign(defaults, givenProps));
    components.push(instance);
    host.dataset.component = name;
    const template = doc.querySelector('x-dc');
    if (!template) throw Error(`No x-dc in ${name}`);
    async function build(node, scope) {
      if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(value(node.textContent, scope));
      if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();
      const tag = node.hasAttribute('data-sc-for') ? 'sc-for' : node.hasAttribute('data-sc-if') ? 'sc-if' : node.tagName.toLowerCase();
      const children = node.content?.childNodes || node.childNodes;
      if (tag === 'helmet') {
        for (const item of node.children) {
          const key = item.outerHTML;
          if (![...document.head.children].some(el => el.dataset.previewHead === key)) {
            const copy = item.cloneNode(true);
            copy.dataset.previewHead = key;
            document.head.append(copy);
          }
        }
        return document.createDocumentFragment();
      }
      if (tag === 'sc-if') {
        const fragment = document.createDocumentFragment();
        if (value(node.getAttribute('value'), scope)) for (const child of children) fragment.append(await build(child, scope));
        return fragment;
      }
      if (tag === 'sc-for') {
        const fragment = document.createDocumentFragment();
        const list = value(node.getAttribute('list'), scope) || [];
        for (const item of list) for (const child of children) fragment.append(await build(child, Object.assign({}, scope, {[node.getAttribute('as')]: item})));
        return fragment;
      }
      const el = node.namespaceURI === 'http://www.w3.org/2000/svg'
        ? document.createElementNS(node.namespaceURI, node.tagName)
        : document.createElement(tag === 'dc-import' ? 'div' : tag);
      if (tag === 'dc-import') {
        el.style.display = 'contents';
        const props = Object.fromEntries([...node.attributes].filter(a => !['name','hint-size'].includes(a.name)).map(a => [a.name, value(a.value, scope)]));
        await mount(node.getAttribute('name'), el, props);
        return el;
      }
      for (const attr of node.attributes) {
        const val = value(attr.value, scope);
        if (/^on/.test(attr.name) && typeof val === 'function') el.addEventListener(attr.name.slice(2).toLowerCase(), val);
        else if (['checked','disabled','required','open'].includes(attr.name)) { if (val !== false && val !== 'false' && val != null) {el.setAttribute(attr.name, ''); el[attr.name] = true;} }
        else el.setAttribute(attr.name, String(val ?? ''));
      }
      for (const child of node.childNodes) el.append(await build(child, scope));
      return el;
    }
    instance.redraw = async () => {
      const details = [...host.querySelectorAll('details')].map(el => el.open);
      const active = host.contains(document.activeElement) ? document.activeElement : null;
      const focusedId = active?.id;
      const controls = [...host.querySelectorAll('input,textarea')].map(el => ({id: el.id, value: el.value, checked: el.checked}));
      const scope = Object.assign({}, instance.renderVals());
      const fragment = document.createDocumentFragment();
      for (const child of template.childNodes) fragment.append(await build(child, scope));
      host.replaceChildren(fragment);
      [...host.querySelectorAll('details')].forEach((el,i) => el.open = details[i] || false);
      // Preserve native, unbound field edits as a keyed renderer would.
      for (const control of controls) if (control.id) {
        const el = [...host.querySelectorAll('input,textarea')].find(el => el.id === control.id);
        if (el && !el.hasAttribute('data-bound')) {el.value = control.value;}
      }
      if (focusedId) host.querySelector(`[id="${CSS.escape(focusedId)}"]`)?.focus();
      parent.postMessage({type: 'preview-ready', name, diagnostics: diagnostics()}, location.origin);
    };
    await instance.redraw();
    return instance;
  }
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const name = location.pathname.split('/').pop().replace('.dc.html','');
      const template = document.querySelector('x-dc');
      const host = document.createElement('div');
      template.replaceWith(host);
      const props = Object.fromEntries(new URLSearchParams(location.search));
      await mount(name, host, props);
      document.querySelector('script[data-dc-script]')?.remove();
      window.previewReady = true;
    } catch (error) {
      (window.previewErrors ||= []).push(error.message);
      const message = document.createElement('pre'); message.textContent = error.stack; document.body.append(message);
      parent.postMessage({type: 'preview-error', message: error.message}, location.origin);
    }
  });
})();
