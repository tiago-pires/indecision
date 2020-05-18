import React from 'react'

const Option = props => {

	return (
		<p>
			<span style={{padding:'.5em'}} onClick={()=>{props.deleteOption(props.text)}}>&times;</span>
			{props.text}
		</p>
	)
}

export default Option