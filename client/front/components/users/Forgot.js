import React, {Component} from 'react';
import { browserHistory } from 'react-router';

export default class Forgot extends Component {

	componentDidMount() {
		
	}

	handleSubmit (event) {

		// Prevent reload
		event.preventDefault();

		// Fetch data from form
		const email = this.refs.emailAddress.value;

		// Validate
		check(email, ValidEmail);

		var options = {
			'email': email
		};

		// Send reset mail
		Accounts.forgotPassword(options, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				Bert.alert('Reset email sendt', 'success', 'growl-bottom-right', 'fa-smile-o');
				browserHistory.push('/login');
			}
		})
	}

	render () {

		document.title = "Jansen || Forgot";

		return (
			<div className="login container">
				<h4>Reset Password</h4>
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-4">
						<form onSubmit={ this.handleSubmit.bind(this) }>
								
							<div className="row">
						        <div className="input-field col s12 m6">
						        	<input ref="emailAddress" id="email" type="email" className="validate" />
						        	<label htmlFor="email">Email</label>
						        </div>
						    </div>
							
							<button className="btn grey waves-effect waves-light" type="submit">Reset</button>
			
						</form>
					</div>
					<br />
					<p>Did you suddenly remember? <a href="/login">Login</a></p>
					<p>Don't have an account? <a href="/signup">Signup</a></p>
				</div>
			</div>
		);
	}
}