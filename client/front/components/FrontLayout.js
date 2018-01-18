import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import NavBar from './NavBar.js';
import Footer from './Footer.js';

import ChristmasLights from '../../utilities/ChristmasLights';

export default class FrontLayout extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<meta name="google-site-verification" content={Meteor.settings.public.googleSiteVerification} />
				</Helmet>
				<ChristmasLights />
				<NavBar />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}