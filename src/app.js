
class App extends React.Component {

	constructor(props){
		super(props)
		
		this.deleteOptions = this.deleteOptions.bind(this)
		this.addOption = this.addOption.bind(this)
		this.pickOption = this.pickOption.bind(this)

		this.state = {
			options: []
		}
	}

	deleteOptions(){
		this.setState(()=>{
			return {
				options: []
			}
		})
	}

	addOption(option){ 

		if(!option){
			return 'option is empty'
		} else if (this.state.options.indexOf(option) > -1) {
			return `option ${option} already added`
		} 

		const updatedState = this.state.options.concat(option)

		this.setState(state => {

			return {
				options: updatedState
			}
			
		})
	}

	pickOption(){
		console.log('pcik option')
		const randIndex = Math.floor(Math.random() * this.state.options.length)
		console.log(randIndex)		

		this.setState( state => {
			return {
				pickedOption : this.state.options[randIndex]
			}
		})
	}

    render(){

        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a compter'

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
				<Action 
					hasOptions={this.state.options.length > 0} 
					pickOption={this.pickOption}	
				/>
				{this.state.pickedOption && <h2>{this.state.pickedOption}</h2>}
				<Options 
					options={this.state.options} 
					deleteOptions={this.deleteOptions}
				/>
                <AddOption addOption={this.addOption} />
            </div>
        )
    }
}

class Action extends React.Component {
	
	constructor(props){
		super(props)
	}

    render(){
        return <button disabled={!this.props.hasOptions} onClick={this.props.pickOption}> What should I do?</button>
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

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <ul>
                    {this.props.options.map(option => <Option key={option} text={option}/>)}
                </ul>
                <button onClick={this.props.deleteOptions}>Delete Options</button>
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

	constructor(props){
		super(props)
		this.addOption = this.addOption.bind(this)
		this.state = {
			error: undefined
		}
	}

	addOption(e){

		e.preventDefault()
		const option = e.target.elements.optionInput.value.trim()
		const error = this.props.addOption(option)
			// return message or undefined

		console.log(error)

		this.setState(()=>{
			return {
				error: error
			}
		})
	}

    render(){
        return (
            <form onSubmit={this.addOption}>
                <input type="text" name="optionInput" defaultValue=""></input>
                <button>Add Option</button>
				{this.state.error && <div>{this.state.error}</div>}
            </form>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))