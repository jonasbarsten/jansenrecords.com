import React, { Component } from 'react';
import moment from 'moment';

import './ChristmasLights.css';

class ChristmasLights extends Component {
	render () {

		const currentMonth = moment().month();
		
		if (currentMonth != 11) {
			return (null);
		}

		return (
			<div style={{position: 'absolute', top: '0', left: '0', width: '100%'}}>
				<ul className="lightrope">
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				  <li></li>
				</ul>
			</div>
		);
	}
}

export default ChristmasLights;