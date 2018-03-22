import React, {Component} from 'react';

export default class ReleaseCard extends Component {

	render() {

		const release = this.props.release;

		let imageUrl = release.imageUrl;

		if (release.coverImageId) {
			imageUrl = `/images/${release.coverImageId}?size=350x350`;
		}

		return (
			<div className='release-card col-xs-6 col-sm-4 hover' onClick={this.props.onClick}>
				<img src={imageUrl} className="img-responsive center-block" />
				<span className="truncate">{release.name} ({release.albumType})</span>
			</div>
		);
	}
}