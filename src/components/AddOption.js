import React from 'react'

export default class AddOption extends React.Component {

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
