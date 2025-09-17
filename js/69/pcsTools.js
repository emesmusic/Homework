'use strict';
window.pcs = function (selector) {

  const element = getElement(selector);

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  function randomColorPicker() {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
  }



  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        return setCss(element, property, value);
      }
    },
    on: (event, callback) => {
      on(element, event, callback);
    },
    click: (callback) => on(element, 'click', callback),
    hide: () => setCss(element, 'display', 'none'),
    show: () => setCss(element, 'display', 'inline-block'),
    sparkle: (time, speed) => {
      let interval = setInterval(() => { setCss(element, 'color', randomColorPicker()); }, speed);
      setTimeout(() => clearInterval(interval), time);
    }
  };
};
