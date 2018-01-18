import React, { Component } from 'react';

import NavBar from './NavBar.js';
import Footer from './Footer.js';

import ChristmasLights from '../../utilities/ChristmasLights';

export default class FrontLayout extends Component {
	render() {
		return (
			<div>
				<ChristmasLights />
				<NavBar />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}