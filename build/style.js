'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;
exports.getColorStyles = getColorStyles;

var _gradients = require('./gradients.js');

var _gradients2 = _interopRequireDefault(_gradients);

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PRIMARY_COLOR = '#F26B83';

function getColorStyles(_ref) {
  var themeSelector = _ref.themeSelector,
      theme = _ref.theme,
      color1 = _ref.color1,
      _ref$headerColor = _ref.headerColor,
      headerColor = _ref$headerColor === undefined ? color1 : _ref$headerColor;

  var backgroundColor = '';
  var primaryColor = '';
  if (theme) {
    var selectedGradient = (0, _lodash2.default)(_gradients2.default, function getTheme(o) {
      return o.name === theme;
    });

    if (selectedGradient) {
      var colors = selectedGradient.colors;
      primaryColor = color1 ? color1 : colors[0];
      backgroundColor = '\n      background: ' + colors[0] + ';\n      background: -webkit-linear-gradient(to left,' + colors[0] + '  , ' + colors[1] + ');\n      background: linear-gradient(to left, ' + colors[0] + ' ,' + colors[1] + ');';
    } else {
      backgroundColor = 'background-color: ' + DEFAULT_PRIMARY_COLOR + ';';
      primaryColor = DEFAULT_PRIMARY_COLOR;
    }
  } else {
    primaryColor = color1 || DEFAULT_PRIMARY_COLOR;
    backgroundColor = 'background-color: ' + (headerColor || primaryColor) + ';';
  }

  return '\n    .react-timepicker-background-color-' + themeSelector + ' {\n      ' + backgroundColor + ';\n     }\n    .react-timepicker-primary-color-background-' + themeSelector + ' {\n      background: ' + primaryColor + ' !important;\n    }\n    .react-timepicker-primary-color-color-' + themeSelector + ' {\n      color: ' + primaryColor + ' !important;\n    }\n    ';
}
var transformLeftRightMiddle = 'translateX(-50%) translateY(-50%);';
var style = exports.style = '\n.timepicker-backdrop {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  top: 0;\n  left: 0;\n  padding: 0;\n  margin: 0;\n  z-index: 100000;\n  background: rgba(0, 0, 0, 0.49);\n}\n\n.timepicker-modal {\n  font-family: "Helvetica";\n  width: 50%;\n  max-width: 400px;\n  min-width: 300px;\n  background: #fff;\n  position: fixed;\n  top: 50%;\n  z-index: 100001;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.timepicker-modal .timepicker-header {\n  height: 120px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  color: #fff;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.timepicker-modal .am-pm-input {\n  width: 0.1px;\n  height: 0.1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  z-index: -1;\n}\n\n.text-shadow {\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.13);\n}\n\n.timepicker-modal .am-pm-label {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 14px;\n  margin-left: 12px;\n  cursor: pointer;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.13);\n}\n\n.timepicker-modal .timepicker-time-container {\n  font-size: 42px;\n  color: inherit;\n  letter-spacing: 2px;\n  cursor: pointer;\n  font-weight: bold;\n}\n\n.timepicker-modal .timepicker-time-container .is-not-selected {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.timepicker-modal .am-pm-input:checked + .am-pm-label {\n  color: inherit;\n  display: block;\n}\n\n.timepicker-modal .timepicker-main {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 20px;\n  box-sizing: border-box;\n}\n\n.timepicker-modal .hours-container {\n  width: 260px;\n  height: 260px;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  background: #efefef;\n  border-radius: 50%;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.timepicker-modal .hand {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 45%;\n  position: absolute;\n  left: 50%;\n  bottom: 50%;\n  -webkit-transform-origin: center left 0px;\n  transform-origin: center left 0px;\n  pointer-events: none;\n  -webkit-transform: rotateZ(0deg);\n  transform: rotateZ(0deg);\n  height: 2px;\n}\n\n.timepicker-modal .hand:after {\n  position: absolute;\n  content: "";\n  top: -5px;\n  border-radius: 50%;\n  right: 0;\n  width: 12px;\n  height: 12px;\n  background: inherit;\n}\n\n.timepicker-modal .circle {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-size: 16px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  cursor: pointer;\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  border-radius: 50%;\n  top: 50%;\n  left: 50%;\n}\n\n.timepicker-modal .circle.selected {\n  color: #fff;\n}\n\n.timepicker-modal .circle:nth-of-type(1) {\n  -webkit-transform: translate3d(0px, -110px, 0) ' + transformLeftRightMiddle + ';\n  transform: translate3d(0px, -110px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(2) {\n  transform: translate3d(55px, -95px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(55px, -95px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(3) {\n  -webkit-transform: translate3d(95px, -55px, 0) ' + transformLeftRightMiddle + ';\n  transform: translate3d(95px, -55px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(4) {\n  transform: translate3d(110px, 0px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(110px, 0px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(5) {\n  transform: translate3d(95px, 55px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(95px, 55px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(6) {\n  transform: translate3d(55px, 95px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(55px, 95px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(7) {\n  transform: translate3d(0px, 110px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(0px, 110px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(8) {\n  transform: translate3d(-55px, 95px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(-55px, 95px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(9) {\n  transform: translate3d(-95px, 55px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(-95px, 55px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(10) {\n  transform: translate3d(-110px, 0px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(-110px, 0px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(11) {\n  transform: translate3d(-95px, -55px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(-95px, -55px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .circle:nth-of-type(12) {\n  transform: translate3d(-55px, -95px, 0) ' + transformLeftRightMiddle + ';\n  -webkit-transform: translate3d(-55px, -95px, 0) ' + transformLeftRightMiddle + ';\n}\n\n.timepicker-modal .mask {\n  width: 100%;\n  height: 100%;\n}\n\n.timepicker-modal footer {\n  text-align: right;\n  padding: 20px;\n}\n\n.timepicker-modal .timepicker-button {\n  border: 0;\n  background: white;\n  text-transform: uppercase;\n  cursor: pointer;\n  font-size: 14px;\n  margin-left: 12px;\n  font-weight: bold;\n  color: #ffffff;\n  padding: 10px 21px;\n  border-radius: 21px;\n}\n\n.timepicker-modal .timepicker-button.close {\n  background: white;\n}';
exports.default = style;