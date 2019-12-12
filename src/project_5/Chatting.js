import React, { Fragment, useState, useEffect } from 'react';
import {global} from '../global.js';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import '../global.css';
import firebase from '../Firebase.js';
import { animateScroll } from "react-scroll";

var allusers = '';
var chat_history = [];

const Chatting = () => {

    const [error_msg, set_error_msg] = useState('')
    const [success_msg, set_success_msg] = useState('')

    // login
    const [login_loader, set_login_loader] = useState({'is': false, 'txt':''})
    const [signin, set_signin] = useState({email:'',password:''})

    const LoginInputFileChange = (e) => {
        set_signin({[e.target.name] : e.target.value});
    }

    const LoginSubmitHandler = (e) => {

        e.preventDefault();

        const email= e.target[0].value;
        const password= e.target[1].value;
        
        setTimeout(() => {
            set_error_msg('');
            set_success_msg('');
        }, 1000);
       if(email === '' || email === null || email.trim() === ''){
            set_error_msg('Enter your email !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(global.isValidEmail(email) === false){
            set_error_msg('Enter valid email !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(password === '' || password === null || password.trim() === ''){
            set_error_msg('Enter your password !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(password.length < 6){
            set_error_msg('Password length should be atleast 6 character !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else{

            set_login_loader({'is': true, 'txt':'Please wait...'});
            axios.post(global.api_url+'welcome/user_login' , JSON.stringify({email:email,password:password})).then(res => {
                if(res.data.response === 1){
                    // set_allfiles({files : [...allfiles.files ,res.data.files]});
                    localStorage.setItem('is_logged_in',true);
                    localStorage.setItem('user_name',res.data.user_name)
                    localStorage.setItem('user_email',email)
                    localStorage.setItem('user_id',res.data.user_id)

                    set_signin({email:'',password:''})
                    setTimeout(() => {
                        set_login_loader({'is': false, 'txt':''});
                        set_success_msg(res.data.msg);
                    }, 1000);
                    setTimeout(() => {
                        set_success_msg('');
                        window.location.reload();
                    }, 6000);
                }else  if(res.data.response === 2){
                    setTimeout(() => {
                        set_login_loader({'is': false, 'txt':''});
                        set_error_msg(res.data.msg);
                    }, 1000);
                    setTimeout(() => {
                        set_error_msg('');
                    }, 6000);
                }else{
                    setTimeout(() => {
                        set_login_loader({'is': false, 'txt':''});
                        set_error_msg('Sorry ! We are unable to process your request.');
                    }, 1000);
                    setTimeout(() => {
                        set_error_msg('');
                    }, 6000);
                }
            })

        }

    }

    // registration
    const [regis_loader, set_regis_loader] = useState({'is': false, 'txt':''})
    const [signup, set_signup] = useState({name:'',email:'',password:''})

    const RegisInputFileChange = (e) => {
        set_signup({[e.target.name] : e.target.value});
    }

    const RegisSubmitHandler = (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email= e.target[1].value;
        const password= e.target[2].value;
        
        setTimeout(() => {
            set_error_msg('');
            set_success_msg('');
        }, 1000);
        if(name === '' || name === null || name.trim() === ''){
            set_error_msg('Enter your name !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(email === '' || email === null || email.trim() === ''){
            set_error_msg('Enter your email !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(global.isValidEmail(email) === false){
            set_error_msg('Enter valid email !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(password === '' || password === null || password.trim() === ''){
            set_error_msg('Enter your password !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else if(password.length < 6){
            set_error_msg('Password length should be atleast 6 character !');
            setTimeout(() => {
                set_error_msg('');
            }, 2000);
            return false;
        }else{

            set_regis_loader({'is': true, 'txt':'Please wait...'});
            axios.post(global.api_url+'welcome/user_registration' , JSON.stringify({name:name,email:email,password:password})).then(res => {
                if(res.data.response === 1){
                    // set_allfiles({files : [...allfiles.files ,res.data.files]});
                    set_signup({name:'',email:'',password:''})
                    setTimeout(() => {
                        set_regis_loader({'is': false, 'txt':''});
                        set_success_msg(res.data.msg);
                    }, 1000);
                    setTimeout(() => {
                        set_success_msg('');
                    }, 6000);
                }else  if(res.data.response === 2){
                    setTimeout(() => {
                        set_regis_loader({'is': false, 'txt':''});
                        set_error_msg(res.data.msg);
                    }, 1000);
                    setTimeout(() => {
                        set_error_msg('');
                    }, 6000);
                }else{
                    setTimeout(() => {
                        set_regis_loader({'is': false, 'txt':''});
                        set_error_msg('Sorry ! We are unable to process your request.');
                    }, 1000);
                    setTimeout(() => {
                        set_error_msg('');
                    }, 6000);
                }
            })

        }

    }

    const [all_user, set_all_user] = useState('')
    useEffect(() => {
        let fetchData = async () => {
            const result = await axios(
                global.api_url+'welcome/GetAllUsers',
            );
            set_all_user(result.data.allusers)
        };
        fetchData();
    }, []);

    const [chat_with_email, set_chat_with_email] = useState('')
    const [chat_with_name, set_chat_with_name] = useState('')
    const [chat_with_id, set_chat_with_id] = useState('')

    const SelectChatWithUser = (chat_with_email,chat_with_name,chat_with_id) => {
        set_chat_with_email(chat_with_email);
        set_chat_with_name(chat_with_name);
        set_chat_with_id(chat_with_id);
    }

    if(all_user){
        allusers = all_user.slice(0).reverse().map( (item,index) => (
            (item.email != localStorage.getItem('user_email')) ? <p key={index}> <a onClick={SelectChatWithUser.bind(this,item.email,item.name,item.id)}>{index+1}. {item.name}</a> </p> : ''
        ))
    }
    
    const LogoutMe = () => {
        localStorage.clear('is_logged_in');
        localStorage.clear('user_name')
        window.location.reload();
    }

    // chatting
    const [chatting, set_chatting] = useState({txt:'', txt_hidden:''})

    const ChatInputChange = (e) => {
        set_chatting({[e.target.name] : e.target.value});
    }

    var GetAllChatDetails = () => {
        chat_history = []
        let dbname;
        if(localStorage.getItem('user_id') > chat_with_id){
            dbname = "chat-"+localStorage.getItem('user_id')+"-"+chat_with_id;
        }else{
            dbname = "chat-"+chat_with_id+"-"+localStorage.getItem('user_id');
        }
        var ref = firebase.database().ref(dbname);
        ref.on("child_added", function(snapshot) {
            chat_history.push(<div className={ snapshot.val().to == chat_with_email ? 'chat_left' : 'chat_right'}>{snapshot.val().msg}</div>)
        });
        console.log(chat_history)
    }

    if(chat_with_email){
        chat_history = []
        GetAllChatDetails();
    }else{
        chat_history = []
    }
    
    const ChatSubmitHandler = (e) => {
        e.preventDefault();
        const txt_chat = e.target[1].value;

        const fdata = {
            'msg' : txt_chat,
            'to': chat_with_email,
            'from': localStorage.getItem('user_email')
        }

        let dbname;
        if(localStorage.getItem('user_id') > chat_with_id){
            dbname = "chat-"+localStorage.getItem('user_id')+"-"+chat_with_id;
        }else{
            dbname = "chat-"+chat_with_id+"-"+localStorage.getItem('user_id');
        }
        const fadd = firebase.database().ref(dbname)
        fadd.push(fdata).then( res =>{
            GetAllChatDetails();
            set_chatting({txt:''})
            scrollToBottom();
        });

    }

    useEffect(() => {
        const interval = setInterval(() => {
            set_chatting({txt_hidden: chatting.txt_hidden})
            scrollToBottom();
            // GetAllChatDetails();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
          containerId: "bottom_scroll_me"
        });
    }

    return <Fragment>
        <div className="timer_main_div">
        <div> <h1>5. CHATTING</h1> </div> <br /><br />
        <div className='chatting_form_box' >


            {/* Login / signup form */}
            <div className="row" hidden={localStorage.getItem('is_logged_in')}>
                <div className="col-md-6 form_1">
                    <LoadingOverlay
                        active={login_loader.is}
                        spinner
                        text={login_loader.txt}
                    >
                    <span># USER LOGIN FORM</span>
                    <div className='sign_in_box'>
                        <form className="col-md-12" onSubmit={LoginSubmitHandler}>
                            <input type="text" name="login_email" id="login_email" className="form-control" value={signin.email} placeholder="ENTER YOUR EMAIL" onChange={LoginInputFileChange} />
                            <br />
                            <input type="password" name="login_password" id="login_password" className="form-control" value={signin.password} placeholder="ENTER YOUR PASSWORD" onChange={LoginInputFileChange} /> 
                            <br />
                            <button type="submit" className="btn btn-block btn-info ">SIGN IN</button>
                        </form>
                    </div>
                    </LoadingOverlay>
                </div>
                <div className="col-md-6 form_2">
                    <LoadingOverlay
                        active={regis_loader.is}
                        spinner
                        text={regis_loader.txt}
                    >
                    <span># USER REGISTRATION  FORM</span>
                    <div className='sign_in_box'>
                        <form className="col-md-12" onSubmit={RegisSubmitHandler}>
                            <input type="text" name="signup_name" id="signup_name" className="form-control" value={signup.name} placeholder="ENTER YOUR NAME" onChange={RegisInputFileChange} />
                            <br />
                            <input type="text" name="signup_email" id="signup_email" className="form-control" value={signup.email} placeholder="ENTER YOUR EMAIL" onChange={RegisInputFileChange} />
                            <br />
                            <input type="password" name="signup_password" id="signup_password" className="form-control" value={signup.password} placeholder="ENTER YOUR PASSWORD" onChange={RegisInputFileChange} /> 
                            <br />
                            <button type="submit" className="btn btn-block btn-info ">SIGN UP</button>
                        </form>
                    </div>
                    </LoadingOverlay>
                </div>
                <div className="col-md-12">
                    <span className="error_msg">{error_msg}</span>
                    <span className="success_msg">{success_msg}</span>
                </div>
            </div>

            {/* chat section */}
            <div className="row" hidden={!localStorage.getItem('is_logged_in')}>
                <div className="col-md-12 user_info_box">
                    <span>Welcome, {localStorage.getItem('user_name')}</span>
                    <button onClick={LogoutMe}>Logout</button>
                </div>

                <div className="col-md-12">
                    <div className="col-md-4 abc_1">
                        <p>MEMBERS</p>
                    </div>
                    <div className="col-md-8 abc_2">
                        <p className="">{ (chat_with_name) ? chat_with_name : 'CHAT WINDOW'}</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-4 chat_user_list">
                        {allusers}
                    </div>
                    <div className="col-md-8 chat_window" id="bottom_scroll_me">
                        {chat_history}
                    </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <form className="form-inline chat_form" onSubmit={ChatSubmitHandler}>
                        <input type="hidden" name="chat_txt_hidden" id="chat_txt_hidden" className="form-control chat_txt" value={chatting.txt_hidden} placeholder="this is hidden" onChange={ChatInputChange} autoComplete="off" />
                        <input type="text" name="chat_txt" id="chat_txt" className="form-control chat_txt" value={chatting.txt} placeholder="enter your message here" onChange={ChatInputChange} autoComplete="off" />
                        <button type="submit" className="btn btn-info " disabled={ chat_with_id ? false : true}>SEND</button>
                    </form>
                </div>

            </div>




        </div></div><br /><br />
    </Fragment>
}
export default Chatting;
