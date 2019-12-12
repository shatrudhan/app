import React, { Fragment, useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ImageZoom from 'react-medium-image-zoom';
import {global} from '../global.js';
import LoadingOverlay from 'react-loading-overlay';


let myfiles = '';
const Fileupload = () => {

    const style_txt_name = {
        'padding' : '2px 10px 2px 18px',
        'borderRight': '1px solid #9c9c9c',
        'borderBottom': '1px solid #9c9c9c',
        'borderTop': '1px solid #9c9c9c',
        'borderLeft': '1px solid #9c9c9c',
        'marginRight': '-1px',
    }

    const [input, set_input] = useState({name:'',file:''})
    const [allfiles, set_allfiles] = useState({files:''})
    const [loader, set_loader] = useState({'is': false, 'txt':''})

    const ToDoInputFileChange = (e) => {
        const inval =  e.target.value.toUpperCase();
        if(inval.length <= 15){
            set_input({name:inval});
        }else{
          return false;
        }
    }

    const FileUploadSubmit = (e) => {
        e.preventDefault();
      
        const txt_name = e.target[0].value;
        const myfile = e.target[1].files;

        if(txt_name === '' || txt_name === null || txt_name.trim() === ''){
            alert('Enter name !');
            return false;
        }else if(myfile.length === 0){
            alert('Upload file !');
            return false;
        }else{

            // const file_name = myfile[0].name
            // const file_size = myfile[0].size
            const file_type = myfile[0].type

            let reader = new FileReader();
            reader.readAsDataURL(myfile[0]);
            reader.onload = (ev) => {
                const file_64 = ev.target.result;
                // console.warn(file_64)
                set_loader({'is': true, 'txt':'Uploading...'});
                axios.post(global.api_url+'welcome/file_upload' , JSON.stringify({file_64:file_64,name:txt_name,file_type:file_type})).then(res => {
                    if(res.data.response === 1){
                        // alert(res.data.msg);
                        allfiles.files = [];
                        set_allfiles({files : [...allfiles.files ,res.data.files]});
                        set_input({name:'',file:''});
                        setTimeout(() => {
                            set_loader({'is': false, 'txt':''});
                        }, 1000);
                        
                    }
                })
            }

        }
    }

    useEffect(() => {

        set_loader({'is': true, 'txt':'Getting Information...'});

        const fetchData = async () => {
          const result = await axios(
            global.api_url+'welcome/GetAllFiles',
          );
          set_allfiles({files : [...allfiles.files ,result.data.files]});
          set_loader({'is': false, 'txt':''});
        };
        fetchData();
  
      }, []);
    
      const RemoveFile = (id,file_path) => {
        axios.post(global.api_url+'welcome/delete_file' , JSON.stringify({file_id:id,file_path:file_path})).then(res => {
            if(res.data.response === 1){
                // alert(res.data.msg);
                allfiles.files = [];
                set_allfiles({files : [...allfiles.files ,res.data.files]});
                set_input({name:'',file:''});
            }
        })
      }

      if(allfiles.files[0]){
        myfiles = allfiles.files[0].slice(0).reverse().map( (item,index) => ( 
                    <Fragment key={index}> 
                        <div className="col-md-2" key={index} >
                            <ImageZoom
                                image={{
                                src: item.image_path,
                                alt: item.name,
                                className: 'img'
                                }}
                            />
                            <span>{item.name}</span>
                            <button type="button" className="btn-link" onClick={RemoveFile.bind(this,item.id,item.image_path)}>X</button>
                        </div> 
                    </Fragment>  ))
      }

    return <Fragment>
          <div className="timer_main_div">
            
            <div>
              <h1>4. FILE UPLOAD</h1>
            </div>

            <br /><br />

            <div className="todo_box">

                <LoadingOverlay
                    active={loader.is}
                    spinner
                    text={loader.txt}
                >
                    <form className="form-inline fil-eupload-form" onSubmit={FileUploadSubmit}>
                        <input type="text" name="txt_name" id="txt_name" className="form-control" value={input.name} placeholder="ENTER YOUR NAME" style={style_txt_name} onChange={ToDoInputFileChange} />
                        &nbsp;
                        <input type="file" name="myfile" id="myfile" className="filestyle" accept="image/*" value={input.file} onChange={ToDoInputFileChange} /> 
                        &nbsp;
                        <button type="submit" className="btn btn-success ">SUBMIT</button>
                    </form>
                    <br /><br />
                    <div className="All_images_box row">
                        {myfiles} 
                    </div>
                </LoadingOverlay>
            </div>

          </div>
          <br /><br />
  </Fragment>

}

export default Fileupload;
