import React,{ Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt,faComment,faTimes,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import NumberList from './NumberList';


class Create_home extends React.Component {
		//建構子
		constructor(props) {
			super(props);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleAddPost = this.handleAddPost.bind(this);
			this._handleImageChange = this._handleImageChange.bind(this);
			this.handleRemovePost = this.handleRemovePost.bind(this);
			this.handleTitleChange = this.handleTitleChange.bind(this);
			this.handleContentChange = this.handleContentChange.bind(this);
			this.state ={home_display:'inline',add_post_display:'none',title:'',content:'Please input content.',title_text:[],content_text:[],image_content:[],file:'',imagePreviewUrl:''};
		}
		
		//新增資料的按鈕
		handleAddPost(e) {
			this.setState({home_display:'none'});
			this.setState({add_post_display:'inline'});
			e.preventDefault();
		}
		
		//刪除資料的按鈕
		handleRemovePost(e) {
			const title_text = this.state.title_text;
			const content_text = this.state.content_text;
			const image_content = this.state.image_content;
			title_text.splice(title_text.length-1,1);
			content_text.splice(content_text.length-1,1);
			image_content.splice(image_content.length-1,1);
			this.setState({title_text:title_text ,content_text:content_text,image_content:image_content});
			e.preventDefault();
		}
		
		//選擇圖片的按鈕
		_handleImageChange(e) {
			e.preventDefault();
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				this.setState({
				file: file,
				imagePreviewUrl: reader.result
				});
			}
			reader.readAsDataURL(file);
			e.target.value = null;
		}
		
		//傳送表單(Submit)的按鈕
		handleSubmit(e) {
			//將列表物件顯示，表單隱藏
			this.setState({home_display:'inline'});
			this.setState({add_post_display:'none'});
		
			//增加列表元件
			const title_text = this.state.title_text;
			title_text.push(this.state.title);
			const content_text = this.state.content_text;
			content_text.push(this.state.content);
			const image_content = this.state.image_content;
			image_content.push(this.state.imagePreviewUrl);
			this.setState({title_text:title_text ,content_text:content_text,image_content:image_content});
			
			//成功送出
			//swal("成功!","成功送出表單","success")
			Swal.fire("success!","Successfully submit the post!","success");
			//重新預設文字
			this.setState({title:'',content:'Please input content.',imagePreviewUrl:''});
			e.preventDefault();
			
		}
		
		//處理Title的文字改變
		handleTitleChange(event) {
			this.setState({title:event.target.value});
		}

		//處理TextArea的文字改變
		handleContentChange(event) {
			this.setState({content:event.target.value});
		}


		//到螢幕上的元件
		render() {
			let {imagePreviewUrl} = this.state;
			let $imagePreview = null;
			let $imageText = null;
			if (imagePreviewUrl) {
					$imageText = (<p>Image Preview:</p>);
					$imagePreview = (<img src={imagePreviewUrl}/>);
			}
			return (
			<div>
				<div style={{display:this.state.home_display}}>
					<center>
						<button className="_button" onClick={this.handleAddPost} > <FontAwesomeIcon icon={faComment} /> Add Post</button>
						<button  className="_button" onClick={this.handleRemovePost} ><FontAwesomeIcon icon={faTimes} /> Remove Post</button>
						<NumberList title_text={this.state.title_text} content_text={this.state.content_text} image_content={this.state.image_content} />
					</center>
				</div>
				<div style={{display:this.state.add_post_display}}>
					<center>
						<p>Title:</p>
						<input  value={this.state.title} onChange={this.handleTitleChange} />
						<p>Content:</p>
						<textarea cols="50" rows="5" value={this.state.content} onChange={this.handleContentChange}></textarea>
						{$imageText}
						{$imagePreview}<br/><br/>
						<div className="upload-btn-wrapper">
							<button className="_button"> <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload</button>
							<input type="file" onChange={this._handleImageChange} />
						</div>
						<button  className="_button" onClick={this.handleSubmit} ><FontAwesomeIcon icon={faEnvelope} /> Submit</button>
					</center>
				</div>
			</div>
			);
		}
	}
	
export default Create_home;