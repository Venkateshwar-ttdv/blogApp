import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "./backEnd";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
]};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const CreatePost = () => {
    const [title ,setTitle] = useState('');
    const [summary ,setSummary] = useState('');
    const [content ,setContent] = useState('');
    const [files ,setFiles] = useState('');
    const [redirect ,setRedirect] = useState(false);
    const createNewPost = async(ev) => {
        ev.preventDefault();

        if(title !== "" && summary !== "" && content !== "" && files !== "") {
            const data = new FormData();
            data.set("title" ,title);
            data.set("summary" ,summary);
            data.set("content" ,content);
            data.set("file" ,files[0]);

            const responce = await fetch(`${BASE_URL}/post` ,{
                method : "POST" ,
                body : data,
                credentials:"include",
            })
            
            if(responce.ok) {
                setRedirect(true);
            }
        } else {
            swal("Creating Post" ,"Please fill all required fields" ,"info");
        }
    }

    if(redirect) {
        return <Navigate to = "/" />
    }
    return (
        <form onSubmit={createNewPost} className="create-new-post">
            <input type = "title" 
                   className="title"
                   placeholder = {"title"} 
                   value = {title} 
                   spellCheck = "false"
                   onChange = {ev => setTitle(ev.target.value)}/>
            <input type = "summary" 
                   className="summary"
                   placeholder = {"Summary"} 
                   value = {summary}
                   spellCheck = "false"
                   onChange = {ev => setSummary(ev.target.value)}
                   />
            <input type = "file" 
                   className="file"
                   onChange = {ev => setFiles(ev.target.files)}
            />
            <ReactQuill value={content}
                        modules={modules} 
                        formats = {formats}
                        spellCheck = "false"
                        onChange={newValue => setContent(newValue)}
            ></ReactQuill>
        
            <button style={{marginTop : "80px"}}> Create Post </button>
        </form>
    );
}

export default CreatePost;