import React, {Component} from 'react';

export default class ArtistCard extends Component {
	render() {
		return (
			<div className="artist-card col-xs-6 col-sm-4 hover" onClick={this.props.onClick}>
				<img src={this.props.artist.imageUrl} className="img-responsive" />
				<span>{this.props.artist.name}</span>
			</div>
		);
	}
}