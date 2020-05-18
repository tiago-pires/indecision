
import React from 'react'
import Option from './Option'

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

export default Options