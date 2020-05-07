'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.deleteOptions = _this.deleteOptions.bind(_this);
		_this.addOption = _this.addOption.bind(_this);
		_this.pickOption = _this.pickOption.bind(_this);

		_this.state = {
			options: []
		};
		return _this;
	}

	_createClass(App, [{
		key: 'deleteOptions',
		value: function deleteOptions() {
			this.setState(function () {
				return {
					options: []
				};
			});
		}
	}, {
		key: 'addOption',
		value: function addOption(option) {

			if (!option) {
				return 'option is empty';
			} else if (this.state.options.indexOf(option) > -1) {
				return 'option ' + option + ' already added';
			}

			var updatedState = this.state.options.concat(option);

			this.setState(function (state) {

				return {
					options: updatedState
				};
			});
		}
	}, {
		key: 'pickOption',
		value: function pickOption() {
			var _this2 = this;

			console.log('pcik option');
			var randIndex = Math.floor(Math.random() * this.state.options.length);
			console.log(randIndex);

			this.setState(function (state) {
				return {
					pickedOption: _this2.state.options[randIndex]
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var title = 'Indecision';
			var subtitle = 'Put your life in the hands of a compter';

			return React.createElement(
				'div',
				null,
				React.createElement(Header, { title: title, subtitle: subtitle }),
				React.createElement(Action, {
					hasOptions: this.state.options.length > 0,
					pickOption: this.pickOption
				}),
				this.state.pickedOption && React.createElement(
					'h2',
					null,
					this.state.pickedOption
				),
				React.createElement(Options, {
					options: this.state.options,
					deleteOptions: this.deleteOptions
				}),
				React.createElement(AddOption, { addOption: this.addOption })
			);
		}
	}]);

	return App;
}(React.Component);

var Action = function (_React$Component2) {
	_inherits(Action, _React$Component2);

	function Action(props) {
		_classCallCheck(this, Action);

		return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).call(this, props));
	}

	_createClass(Action, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'button',
				{ disabled: !this.props.hasOptions, onClick: this.props.pickOption },
				' What should I do?'
			);
		}
	}]);

	return Action;
}(React.Component);

var Header = function (_React$Component3) {
	_inherits(Header, _React$Component3);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					this.props.title
				),
				React.createElement(
					'h2',
					null,
					this.props.subtitle
				)
			);
		}
	}]);

	return Header;
}(React.Component);

var Options = function (_React$Component4) {
	_inherits(Options, _React$Component4);

	function Options(props) {
		_classCallCheck(this, Options);

		return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, props));
	}

	_createClass(Options, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'ul',
					null,
					this.props.options.map(function (option) {
						return React.createElement(Option, { key: option, text: option });
					})
				),
				React.createElement(
					'button',
					{ onClick: this.props.deleteOptions },
					'Delete Options'
				)
			);
		}
	}]);

	return Options;
}(React.Component);

var Option = function (_React$Component5) {
	_inherits(Option, _React$Component5);

	function Option() {
		_classCallCheck(this, Option);

		return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
	}

	_createClass(Option, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'li',
				null,
				this.props.text
			);
		}
	}]);

	return Option;
}(React.Component);

var AddOption = function (_React$Component6) {
	_inherits(AddOption, _React$Component6);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this7 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this7.addOption = _this7.addOption.bind(_this7);
		_this7.state = {
			error: undefined
		};
		return _this7;
	}

	_createClass(AddOption, [{
		key: 'addOption',
		value: function addOption(e) {

			e.preventDefault();
			var option = e.target.elements.optionInput.value.trim();
			var error = this.props.addOption(option);
			// return message or undefined

			console.log(error);

			this.setState(function () {
				return {
					error: error
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				{ onSubmit: this.addOption },
				React.createElement('input', { type: 'text', name: 'optionInput', defaultValue: '' }),
				React.createElement(
					'button',
					null,
					'Add Option'
				),
				this.state.error && React.createElement(
					'div',
					null,
					this.state.error
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
