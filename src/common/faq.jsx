import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import faqData from './faqData.json';

class FAQ extends React.Component {
	constructor(props){
		super(props);
	}
	state = {
		visible: 1,
		showdivcomplete: true,
		backme: false,
		showdiv: false,
	};

	

	handleClick = () => {
		this.setState({ showdiv: true });
		this.setState({ showdivcomplete: false });
		this.setState({ backme: true });
	};

	handleOnClick = () => {
		this.setState({ showdiv: false });
		this.setState({ showdivcomplete: true });
		this.setState({ backme: false });
	};


	render() {
		return (
			<React.Fragment>
					<div className="profileContainer right-side-faq">
						<button aria-label="Click here to back" class="btn backbtn" hidden={!this.state.backme} onClick={this.handleOnClick}><i class="material-icons">keyboard_backspace</i></button>
						<div className="pagefaq" hidden={!this.state.showdivcomplete}>

							<Typography variant="h2">FAQs</Typography>
							<div class="faq_right">
								<ul>
									{faqData.map((item, index) =>
										<li key={item.id} id={item.id}>
											<Button aria-label={`click here to open ${item.listText}`}  class="btn" color="primary" variant="outlined" onClick={this.handleClick}>
												{item.listText}
												<i class="material-icons">chevron_right</i>
											</Button>
										</li>
									)}
								</ul>
							</div>
						</div>
						{faqData.slice(0, this.state.visible).map((item, index) =>
							<div key={item.id} id={item.id} hidden={!this.state.showdiv} className="answerquestion">
								<h3>{item.listText}</h3>
								<div className="answer">
									<p>{item.DetailedText1}</p>
									<p>{item.DetailedText2}</p>
									<p>{item.DetailedText3}</p>
								</div>
							</div>
						)}
					</div>
			</React.Fragment>
		);
	}
}


export default (FAQ);
