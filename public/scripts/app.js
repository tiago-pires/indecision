'use strict';

var app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: ['One', 'Two']
};

var addOption = function addOption(e) {
    e.preventDefault();
    var option = e.target.elements.addBtn.value;

    // add options to array 
    if (option) app.options.push(option);

    // clear the input 
    e.target.elements.addBtn.value = '';

    render();
};

function render() {

    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            'p',
            null,
            app.subtitle
        ),
        React.createElement(
            'p',
            null,
            app.options.length > 0 ? 'Your Options: ' + app.options.length : 'No Options'
        ),
        React.createElement(
            'ol',
            null,
            app.options.map(function (option, index) {
                return React.createElement(
                    'li',
                    { key: index },
                    option
                );
            })
        ),
        React.createElement(
            'form',
            { onSubmit: addOption },
            React.createElement('input', { type: 'text', name: 'addBtn' }),
            React.createElement(
                'button',
                null,
                'Add Option Still'
            )
        )
    );

    ReactDOM.render(template, document.getElementById('app'));
}

render();
