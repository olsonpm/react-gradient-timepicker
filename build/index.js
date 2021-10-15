'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style2 = require('./style');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePicker = function (_Component) {
  _inherits(TimePicker, _Component);

  /*  static defaultProps = {
      keyName : 'react-theme-style'
    };*/

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

    _this.handleKeyPress = function (e) {
      switch (e.which) {
        case 13:
          {
            if (e.target !== _this.closeButton) {
              _this.handleSet();
            }
          }
          break;

        case 27:
          {
            _this.toggleToShow(false);
          }
          break;

        case 38:
          {
            // up
            _this.state.toShowHourContainer ? _this.setHour((_this.state.degree + 30) % 360 || 360) : _this.setMinute((_this.state.degree + 6) % 360 || 360);
          }
          break;

        case 40:
          {
            // down
            _this.state.toShowHourContainer ? _this.setHour((_this.state.degree - 30) % 360 || 360) : _this.setMinute((_this.state.degree - 6) % 360 || 360);
          }
          break;
      }
    };

    _this.handleMove = function (event) {
      event.preventDefault();
      if ((0, _utils.isMousePressed)(event)) return;
      _this.changeClock(event.nativeEvent.clientX, event.nativeEvent.clientY);
    };

    _this.handleTouchMove = function (event) {
      event.preventDefault();
      _this.changeClock(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    };

    _this.handleTouchUp = function (event) {
      if (event.target === _this.mask) return;
      _this.changeClock(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    };

    _this.handleMoveUp = function (event) {
      if (event.target === _this.mask) return;
      _this.changeClock(event.nativeEvent.clientX, event.nativeEvent.clientY);
    };

    _this.changeClock = function (clientX, clientY) {
      var x = clientX - _this.containerPos.x;
      var y = clientY - _this.containerPos.y;
      _this.state.toShowHourContainer ? _this.setHour(_this.getDegree(x, y)) : _this.setMinute(_this.getDegree(x, y));
    };

    _this.handleFocus = function (e) {
      e.preventDefault();
      var format24 = _this.props.time;

      var _this$getInitialConfi = _this.getInitialConfig(format24),
          hour = _this$getInitialConfi.hour,
          minute = _this$getInitialConfi.minute,
          degree = _this$getInitialConfi.degree,
          selectedIndexDegree = _this$getInitialConfi.selectedIndexDegree,
          isAmSelected = _this$getInitialConfi.isAmSelected;
      // hour = appendZero(Math.round(degree / 30) || '12'); //not sure why i added this


      _this.toggleToShow();
      _this.setState({
        degree: degree,
        hour: hour,
        minute: minute,
        toShowHourContainer: true,
        selectedIndexDegree: selectedIndexDegree,
        isAmSelected: isAmSelected
      }, function () {
        _this.init();
      });
    };

    _this.handleSet = function () {
      var allFormat = _this.getTime(Number(_this.state.hour), Number(_this.state.minute), _this.state.isAmSelected);
      _this.setState({
        time: allFormat
      });

      _this.toggleToShow(false);
      _this.inputField.blur();
      _this.props.onSet(allFormat);
    };

    _this.getClock = function (className) {
      var hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      var hoursOrMinutes = _this.state.toShowHourContainer ? hours : minutes;
      return hoursOrMinutes.map(function (i, j) {
        return _react2.default.createElement(
          'span',
          {
            key: i,
            className: 'circle ' + (_this.state.selectedIndexDegree === j ? 'selected ' + className : '')
          },
          i
        );
      });
    };

    var format12 = '';
    if (_this.props.time) {
      var time = _this.props.time.split(':');
      format12 = (0, _utils.format24to12)(Number(time[0]), Number(time[1]));
    }
    _this.state = {
      toShow: false,
      time: {
        format12: format12,
        format24: ''
      }
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.addStyles();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var format12 = '';
      var format24 = '';

      if (nextProps.time) {
        var temp = nextProps.time.split(':');
        format12 = (0, _utils.format24to12)(Number(temp[0]), Number(temp[1]));
        format24 = nextProps.time;
      }

      this.setState({
        time: {
          format12: format12,
          format24: format24
        }
      });
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      var commonSelector = 'react-timepicker-common-style';
      var themeSelector = this.getThemeSelector(this.props.theme, this.props.color1);
      var _props = this.props,
          theme = _props.theme,
          color1 = _props.color1,
          headerColor = _props.headerColor;

      var head = document.head || document.getElementsByTagName('head')[0];

      if (!document.getElementById(commonSelector)) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id = commonSelector;

        if (style.styleSheet) {
          style.styleSheet.cssText = _style2.style;
        } else {
          style.appendChild(document.createTextNode(_style2.style));
        }

        head.appendChild(style);
      }

      if (!document.getElementById(themeSelector)) {
        var themeStyles = (0, _style2.getColorStyles)({
          themeSelector: themeSelector,
          theme: theme,
          color1: color1,
          headerColor: headerColor
        });

        var _style = document.createElement('style');
        _style.type = 'text/css';
        _style.id = themeSelector;

        if (_style.styleSheet) {
          _style.styleSheet.cssText = themeStyles;
        } else {
          _style.appendChild(document.createTextNode(themeStyles));
        }
        head.appendChild(_style);
      }
    }

    // utils

  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener() {
      window.addEventListener('keydown', this.handleKeyPress);
    }

    // handlers

  }, {
    key: 'toggleHourOrMinuteContainer',
    value: function toggleHourOrMinuteContainer(toShowHourContainer) {
      var _ref = toShowHourContainer ? this.getSelectedIndexDegreeAndDegreeForHour(Number(this.state.hour)) : this.getSelectedIndexDegreeAndDegreeForMinute(Number(this.state.minute)),
          degree = _ref.degree,
          selectedIndexDegree = _ref.selectedIndexDegree;

      this.setState({
        toShowHourContainer: toShowHourContainer,
        degree: degree,
        selectedIndexDegree: selectedIndexDegree
      });
    }
  }, {
    key: 'toggleAmPm',
    value: function toggleAmPm(isAmSelected) {
      this.setState({
        isAmSelected: isAmSelected
      });
    }
  }, {
    key: 'toggleToShow',
    value: function toggleToShow() {
      var toShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.setState({
        toShow: toShow
      });

      toShow ? this.addEventListener() : this.removeEventListener();
    }
  }, {
    key: 'init',


    // functionality
    value: function init() {
      this.center = {
        x: 130,
        y: 130
      };

      var maskPosition = this.mask.getBoundingClientRect();
      this.containerPos = {
        y: maskPosition.top,
        x: maskPosition.left
      };
      this.basePoint = {
        x: 130,
        y: 0
      };
    }
  }, {
    key: 'getThemeSelector',
    value: function getThemeSelector(theme, color1) {
      var _color1 = color1;
      if (color1 && color1.indexOf('#') === 0) {
        _color1 = color1.substr(1);
      }

      if (theme) {
        if (color1) {
          return theme.split(' ').join('-') + _color1;
        }
        return theme.split(' ').join('-');
      }

      if (_color1) {
        return _color1;
      }

      return 'react-time-picker-theme';
    }
  }, {
    key: 'getHour',
    value: function getHour(val) {
      return (0, _utils.appendZero)(val % 12 || '12');
    }
  }, {
    key: 'getMinute',
    value: function getMinute(val) {
      return (0, _utils.appendZero)(val % 60 || '0');
    }
  }, {
    key: 'getInitialConfig',
    value: function getInitialConfig(time) {
      var date = new Date();
      time = time ? time : date.getHours() + ':' + date.getMinutes();
      var temp = time.split(':');
      var hour24 = Number(temp[0]);
      var minute24 = Number(temp[1]);

      var _getSelectedIndexDegr = this.getSelectedIndexDegreeAndDegreeForHour(hour24),
          degree = _getSelectedIndexDegr.degree,
          selectedIndexDegree = _getSelectedIndexDegr.selectedIndexDegree;

      return {
        hour: this.getHour(hour24),
        minute: this.getMinute(minute24),
        degree: degree,
        selectedIndexDegree: selectedIndexDegree,
        isAmSelected: Number(temp[0]) <= 12
      };
    }
  }, {
    key: 'getSelectedIndexDegreeAndDegreeForHour',
    value: function getSelectedIndexDegreeAndDegreeForHour(val) {
      var degree = val * 30 % 360;
      return {
        selectedIndexDegree: this.getSelectedIndexDegree(degree),
        degree: degree
      };
    }
  }, {
    key: 'getSelectedIndexDegreeAndDegreeForMinute',
    value: function getSelectedIndexDegreeAndDegreeForMinute(val) {
      /* const degree = val * 6 || 360; // why?
      const i = (degree / 6) % 5;
      return {
        selectedIndexDegree : i ? -1 : this.getSelectedIndexDegree(degree),
        degree
      };
      */
      var degree = val * 6 % 360; // why?
      // const i = (degree / 6) % 5;
      return {
        selectedIndexDegree: this.getSelectedIndexDegree(degree),
        degree: degree
      };
    }
  }, {
    key: 'getSelectedIndexDegree',
    value: function getSelectedIndexDegree(degree) {
      return degree / 30 % 12;
    }
  }, {
    key: 'getDegree',
    value: function getDegree(offsetX, offsetY) {
      var x = offsetX - this.center.x;
      var y = offsetY - this.center.y;
      var cx = this.basePoint.x - this.center.x;
      var cy = this.basePoint.y - this.center.y;
      var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
      return atan * 57.29577951308232 % 360;
    }
  }, {
    key: 'getTime',
    value: function getTime(hour, minute, isAmSelected) {
      var format12 = (0, _utils.getFormat12)(hour, minute, isAmSelected);
      var format24 = (0, _utils.format12to24)(hour, minute, isAmSelected);
      return {
        format12: format12,
        format24: format24
      };
    }
  }, {
    key: 'setMinute',
    value: function setMinute(degree) {
      /* let toRound = degree % 6;
      toRound < 3 ? degree -= toRound : degree += (6 - toRound); */
      var base = Math.round(degree / 6);
      degree = base * 6;
      var minute = this.getMinute(base);
      var selectedIndexDegree = this.getSelectedIndexDegree(degree);
      var toReturn = {
        degree: degree,
        minute: minute,
        selectedIndexDegree: selectedIndexDegree
      };
      this.setState(toReturn);
      return toReturn;
    }
  }, {
    key: 'setHour',
    value: function setHour(degree) {
      /* let toRound = degree % 30;
      toRound < 15 ? degree -= toRound : degree += (30 - toRound);*/
      var base = Math.round(degree / 30);
      degree = base * 30;
      var hour = this.getHour(base);
      var selectedIndexDegree = this.getSelectedIndexDegree(degree);
      var toReturn = {
        degree: degree,
        hour: hour,
        selectedIndexDegree: selectedIndexDegree
      };
      this.setState(toReturn);
      return toReturn;
    }
  }, {
    key: 'getBody',
    value: function getBody() {
      var _this2 = this;

      if (!this.state.toShow) return false;
      var themeSelector = this.getThemeSelector(this.props.theme, this.props.color1);
      var primaryColorColorClassName = 'react-timepicker-primary-color-color-' + themeSelector;
      var primaryColorBackgroundClassName = 'react-timepicker-primary-color-background-' + themeSelector;
      var backgroundColorClassName = 'react-timepicker-background-color-' + themeSelector;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          className: 'timepicker-backdrop',
          onClick: this.toggleToShow.bind(this, false)
        }),
        _react2.default.createElement(
          'div',
          { className: 'timepicker-modal' },
          _react2.default.createElement(
            'header',
            { className: 'timepicker-header ' + backgroundColorClassName },
            _react2.default.createElement(
              'div',
              { className: 'timepicker-time-container' },
              _react2.default.createElement(
                'span',
                {
                  className: 'text-shadow ' + (!this.state.toShowHourContainer ? 'is-not-selected' : ''),
                  onClick: this.toggleHourOrMinuteContainer.bind(this, true)
                },
                this.state.hour
              ),
              _react2.default.createElement(
                'span',
                { className: 'text-shadow' },
                ':'
              ),
              _react2.default.createElement(
                'span',
                {
                  className: 'text-shadow ' + (this.state.toShowHourContainer ? 'is-not-selected' : ''),
                  onClick: this.toggleHourOrMinuteContainer.bind(this, false)
                },
                this.state.minute
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'timepicker-am-pm-container' },
              _react2.default.createElement('input', {
                className: 'am-pm-input',
                type: 'radio',
                id: 'am',
                name: 'am-pm',
                value: 'am',
                onChange: this.toggleAmPm.bind(this, true),
                defaultChecked: this.state.isAmSelected
              }),
              _react2.default.createElement(
                'label',
                { className: 'am-pm-label', htmlFor: 'am' },
                'AM'
              ),
              _react2.default.createElement('input', {
                className: 'am-pm-input',
                type: 'radio',
                id: 'pm',
                name: 'am-pm',
                value: 'pm',
                onChange: this.toggleAmPm.bind(this, false),
                defaultChecked: !this.state.isAmSelected
              }),
              _react2.default.createElement(
                'label',
                { className: 'am-pm-label', htmlFor: 'pm' },
                'PM'
              )
            )
          ),
          _react2.default.createElement(
            'main',
            { className: 'timepicker-main' },
            _react2.default.createElement(
              'div',
              {
                className: 'hours-container',
                ref: function ref(_ref2) {
                  _this2.mask = _ref2;
                },
                onTouchMove: this.handleTouchMove,
                onTouchEnd: this.handleTouchUp,
                onMouseMove: this.handleMove,
                onMouseUp: this.handleMoveUp
              },
              _react2.default.createElement(
                'div',
                {
                  className: primaryColorBackgroundClassName + ' hand',
                  style: {
                    transform: 'rotate(' + (this.state.degree - 90) + 'deg)',
                    WebkitTransform: 'rotate(' + (this.state.degree - 90) + 'deg)'
                  }
                },
                '\xA0'
              ),
              this.getClock(primaryColorBackgroundClassName)
            )
          ),
          _react2.default.createElement(
            'footer',
            null,
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: primaryColorColorClassName + ' timepicker-button close',
                onClick: this.toggleToShow.bind(this, false),
                ref: function ref(_ref3) {
                  _this2.closeButton = _ref3;
                }
              },
              'Close'
            ),
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: primaryColorBackgroundClassName + ' timepicker-button',
                onClick: this.handleSet
              },
              'Set'
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'timepicker-container' },
        _react2.default.createElement('input', {
          readOnly: true,
          type: 'text',
          placeholder: this.props.placeholder,
          className: this.props.className,
          value: this.state.time.format12,
          onFocus: this.handleFocus,
          ref: function ref(_ref4) {
            _this3.inputField = _ref4;
          },
          style: this.props.style
        }),
        this.getBody()
      );
    }
  }]);

  return TimePicker;
}(_react.Component);

TimePicker.propTypes = {
  time: _propTypes2.default.string,
  theme: _propTypes2.default.string,
  color1: _propTypes2.default.string,
  headerColor: _propTypes2.default.string,
  placeholder: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  onSet: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.object
};
exports.default = TimePicker;