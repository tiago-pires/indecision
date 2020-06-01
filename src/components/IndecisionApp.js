import React from 'react'
import ReactDOM from 'react-dom'
import Action from './Action'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import Option from './Option'


class IndecisionApp extends React.Component {

	state = {
		options: [] 
	}

	deleteOptions = () => {
		this.setState(() => ({ options: []}))
	}

	deleteOption = (option) => {

		this.setState(state => (
			{
				options: state.options.filter(item => {
					return item != option
				})
			}
		))
	}

	addOption = (option) => { 

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

	pickOption = () => {
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

export default IndecisionApp