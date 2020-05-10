'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp(props) {
		_classCallCheck(this, IndecisionApp);

		var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

		_this.deleteOptions = _this.deleteOptions.bind(_this);
		_this.deleteOption = _this.deleteOption.bind(_this);
		_this.addOption = _this.addOption.bind(_this);
		_this.pickOption = _this.pickOption.bind(_this);

		_this.state = {
			options: props.options
		};
		return _this;
	}

	_createClass(IndecisionApp, [{
		key: 'deleteOptions',
		value: function deleteOptions() {
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: 'deleteOption',
		value: function deleteOption(option) {

			this.setState(function (state) {
				return {
					options: state.options.filter(function (item) {
						return item != option;
					})
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

			this.setState(function (prevState) {

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
		key: 'componentDidMount',
		value: function componentDidMount() {

			console.log('component did mount');

			try {
				var options = JSON.parse(localStorage.getItem('options'));
				if (options) this.setState(function () {
					return { options: options };
				});
			} catch (e) {
				// handle error
				console.log('error: ', localStorage.getItem('options'));
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			console.log('component updated');
			if (this.state.options.length === prevState.options.length) return;
			localStorage.setItem('options', JSON.stringify(this.state.options));
		}
	}, {
		key: 'render',
		value: function render() {

			var title = 'Indecision';
			var subtitle = 'Put your life in the hands of a compter';

			return React.createElement(
				'div',
				null,
				React.createElement(Header, { subtitle: subtitle }),
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
					deleteOptions: this.deleteOptions,
					deleteOption: this.deleteOption
				}),
				React.createElement(AddOption, { addOption: this.addOption })
			);
		}
	}]);

	return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
	options: []
};

var Action = function Action(props) {
	return React.createElement(
		'button',
		{
			disabled: !props.hasOptions,
			onClick: props.pickOption
		},
		'What should I do?'
	);
};

var Header = function Header(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			props.title
		),
		props.subtitle && React.createElement(
			'h2',
			null,
			props.subtitle
		)
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

var Options = function Options(props) {
	return React.createElement(
		'div',
		null,
		props.options.length === 0 && 'Add your options to get started',
		props.options.map(function (option) {
			return React.createElement(Option, {
				key: option,
				text: option,
				deleteOption: props.deleteOption
			});
		}),
		props.options.length !== 0 && React.createElement(
			'button',
			{ onClick: props.deleteOptions },
			'Delete Options'
		)
	);
};

var Option = function Option(props) {

	return React.createElement(
		'p',
		null,
		React.createElement(
			'span',
			{ style: { padding: '.5em' }, onClick: function onClick() {
					props.deleteOption(props.text);
				} },
			'\xD7'
		),
		props.text
	);
};

var AddOption = function (_React$Component2) {
	_inherits(AddOption, _React$Component2);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this3.addOption = _this3.addOption.bind(_this3);
		_this3.state = {
			error: undefined
		};
		return _this3;
	}

	_createClass(AddOption, [{
		key: 'addOption',
		value: function addOption(e) {

			e.preventDefault();
			var option = e.target.elements.optionInput.value.trim();
			var error = this.props.addOption(option);

			this.setState(function () {
				return { error: error };
			});

			if (!error) {
				e.target.elements.optionInput.value = '';
			}
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

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
