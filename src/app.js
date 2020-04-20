
const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: ['One', 'Two']
}


    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Your Optios' : 'No Options'}</p>
            <ol>
                <li>Item one</li>
                <li>Item two</li>
            </ol>
            <form>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    )
 


ReactDOM.render(template, document.getElementById('app'))