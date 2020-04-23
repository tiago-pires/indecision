
const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: ['One', 'Two']
}

const addOption = (e) => {
    e.preventDefault()
    const option = e.target.elements.addBtn.value;
    
    // add options to array 
    if(option) app.options.push(option)

    // clear the input 
    e.target.elements.addBtn.value = ''

    render()  
}

function render(){

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Your Options: ' + app.options.length  : 'No Options'}</p>
            <ol>
            {
                app.options.map((option, index) => {
                    return <li key={index}>{option}</li>
                })
            }
            </ol>
            <form onSubmit={addOption}>
                <input type="text" name="addBtn" />
                <button>Add Option Still</button>
            </form>
        </div>
    )

    ReactDOM.render(template, document.getElementById('app'))
}

render()


