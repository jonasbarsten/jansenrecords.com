import React, { Component } from 'react';

class AddShortlink extends Component {

	constructor() {
		super ();
		this.state = {
			token: ''
		}
	}

	componentDidMount() {
		this.generateRandomToken();
	}

	generateRandomToken() {
		this.setState({
			token: Math.random().toString(36).slice(-3)
		});	
	}

	urlFriendly() {
		var token = this.refs.token.value.replace(/[^\w\s]/gi, '');
		token = token.replace(/\s+/g, '-').toLowerCase();

		this.setState({token: token});
	}

	handleSubmit(e) {
		e.preventDefault();

		Meteor.call('shortlink.add', this.refs.url.value, this.state.token, (err, res) => {
			if (err) {
				this.refs.url.value = '';
				Bert.alert('URL not valid or shortlink exists', 'danger', 'growl-bottom-right', 'fa-frown-o');
			} else {
				this.refs.url.value = '';
				this.generateRandomToken();
				Bert.alert('Shortlink added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)} className="row">
					<div className="form-group col-xs-5">
						<label>URL</label>
						<input ref="url" className="form-control" />
					</div>
					<div className="form-group col-xs-5">
						<label>SHORT</label>
						<input 
							ref="token" 
							className="form-control" 
							value={this.state.token}
							onChange={this.urlFriendly.bind(this)}
						/>
					</div>
					<button className="btn btn-primary col-xs-2" style={{marginTop: '25px'}}>Shorten!</button>
				</form>
			</div>
		);
	}
}

export default AddShortlink;