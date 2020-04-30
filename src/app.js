
class App extends React.Component {
    render(){

        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a compter'
        const options = ['Thing one', 'Second thing', 'Thirdest thingy']

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action />
                <Options options={options}/>
                <AddOption />
            </div>
        )
    }
}

class Action extends React.Component {
    render(){
        return <button> What should I do?</button>
    }
}

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

class Options extends React.Component {
    deleteOptions(){
        console.log(console.log('clear options'))
    }
    render(){
        return (
            <div>
                <ul>
                    {this.props.options.map(option => <Option key={option} text={option}/>)}
                </ul>
                <button onClick={this.deleteOptions}>Delete Options</button>
            </div>   
        )
    }
}

class Option extends React.Component {
    render(){
        return (
            <li>
                {this.props.text}
            </li>
        )
    }
}

class AddOption extends React.Component {

    add(e){

        e.preventDefault() 

        if(!e.target.elements.theOption.value) return

        const theOption = e.target.elements.theOption.value
        console.log(theOption)

    }

    render(){
        return (
            <form onSubmit={this.add}>
                <input type="text" name="theOption"></input>
                <button>Add Option</button>
            </form>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))