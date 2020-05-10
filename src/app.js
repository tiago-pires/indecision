
class IndecisionApp extends React.Component {

	constructor(props){
		super(props)
		
		this.deleteOptions = this.deleteOptions.bind(this)
		this.deleteOption = this.deleteOption.bind(this)
		this.addOption = this.addOption.bind(this)
		this.pickOption = this.pickOption.bind(this)

		this.state = {
			options: props.options
		}
	}

	deleteOptions(){
		this.setState(() => ({ options: []}))
	}

	deleteOption(option){

		this.setState(state => (
			{
				options: state.options.filter(item => {
					return item != option
				})
			}
		))
	}

	addOption(option){ 

		if(!option){
			return 'option is empty'
		} else if (this.state.options.indexOf(option) > -1) {
			return `option ${option} already added`
		} 

		const updatedState = this.state.options.concat(option)

		this.setState( prevState => {

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

	componentDidMount(){

		console.log('component did mount')

		try {
			const options = JSON.parse(localStorage.getItem('options'))
			if(options) this.setState(() => ({ options }))
		} catch (e){
			// handle error
			console.log('error: ', localStorage.getItem('options'))
		}
	}

	componentDidUpdate(prevProps, prevState){
		console.log('component updated')
		if(this.state.options.length === prevState.options.length) return 
		localStorage.setItem('options', JSON.stringify(this.state.options))
	}

    render(){

        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a compter'

        return (
            <div>
                <Header subtitle={subtitle} />
				<Action 
					hasOptions={this.state.options.length > 0} 
					pickOption={this.pickOption}	
				/>
				{this.state.pickedOption && <h2>{this.state.pickedOption}</h2>}
				<Options 
					options={this.state.options} 
					deleteOptions={this.deleteOptions}
					deleteOption={this.deleteOption}
				/>
                <AddOption addOption={this.addOption} />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
	options: []
};

const Action = props => {
    return (
		<button 
			disabled={!props.hasOptions} 
			onClick={props.pickOption}
		> 
			What should I do?
		
		</button>)
}


const Header = props => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	)
}

Header.defaultProps = {
	title: 'Indecision'
}

const Options = props => {
	return (
		<div>
			{ props.options.length === 0 && 'Add your options to get started' }
			
			{ props.options.map(option => (
					<Option 
						key={option} 
						text={option}
						deleteOption={props.deleteOption}
					/>
				))
			}
			{props.options.length !== 0 && <button onClick={props.deleteOptions}>Delete Options</button>}
		</div>   
	)
}

const Option = props => {

	return (
		<p>
			<span style={{padding:'.5em'}} onClick={()=>{props.deleteOption(props.text)}}>&times;</span>
			{props.text}
		</p>
	)
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

		this.setState(()=>({ error }))

		if(!error){
			e.target.elements.optionInput.value = ''
		}
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))