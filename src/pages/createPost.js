import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
export default function CreatePost()
{
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);

async function createNewPost(ev){
    const data=new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    ev.preventDefault();
       const response= await fetch("https://vercel-backend-navy.vercel.app/post",{
        method:"POST",
        body:data,
        credentials:'include'
    })

    if(response.ok)
    {
            setRedirect(true)
         
    }
}
    if(redirect)
    {
        console.log("redirect to home page")
    
        return <Navigate to={"/"}/>
      
    }


    return (
        <form onSubmit={createNewPost}>
            <input type="title" 
                placeholder="Title" 
                value={title}
                onChange={ev=>setTitle(ev.target.value)}
                required
                />

            
            <input type="summary" 
                placeholder="Summary"
                value={summary}
                onChange={ev=>setSummary(ev.target.value)}
                required
            
            />

            <input type="file" onChange={ev=>setFiles(ev.target.files)} required/>
            <ReactQuill  value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats}/>
            <button style ={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}