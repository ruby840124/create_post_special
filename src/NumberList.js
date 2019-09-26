import React, { Component } from 'react';

function NumberList(props) {
		const title_text = props.title_text;
		const content_text = props.content_text;
		const image_content= props.image_content;
		let IsImg = [];
		for (var index in image_content) {
			(image_content[index] !=""?IsImg.push("inline"):IsImg.push("none"));
		}
		const listItems = title_text.map((title,index) =>
			<div key={title+content_text[index]+index} className="list_css">
					<p>{title}</p>
					<p>{content_text[index]}</p>
					<img src={image_content[index]} style={{display:IsImg[index]}} />
			</div>
		);
		return (
			listItems
		);
	}
	
export default NumberList;
