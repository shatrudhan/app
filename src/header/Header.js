import React, { Fragment } from 'react';
import header_mod from './Header.module.css';

import Stopwatch from '../project_1/Stopwatch';
import Timer from '../project_2/Timer';
import Todo from '../project_3/Todo';
import Fileupload from '../project_4/Fileupload';
import Chatting from '../project_5/Chatting';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink 
  } from "react-router-dom";

const Header = () => {

    return <Fragment>
        <Router>

            <ul className={header_mod.ul}>
                <li className={header_mod.li}><NavLink  to="/app/stopwatch" activeClassName={header_mod.active}> STOPWATCH</NavLink ></li>
                {/* <li className={header_mod.li}><Link to="/project_2">Project 2</Link></li> */}
                <li className={header_mod.li}><NavLink  to="/app/todo" activeClassName={header_mod.active}>TODO LIST</NavLink ></li>
                <li className={header_mod.li}><NavLink  to="/app/gallery" activeClassName={header_mod.active}>GALLERY</NavLink ></li>
                <li className={header_mod.li}><NavLink  to="/app/chatting" activeClassName={header_mod.active}>LIVE CHATTING</NavLink ></li>
            </ul>

            <Switch>
                <Route path="/app/stopwatch">
                    <Stopwatch />
                </Route>
                <Route path="/app/project_2">
                    <Timer />
                </Route>
                <Route path="/app/todo">
                    <Todo />
                </Route>
                <Route path="/app/gallery">
                    <Fileupload />
                </Route>
                <Route path="/app/chatting">
                    <Chatting />
                </Route>
                <Route path="/app/">
                    <Stopwatch />
                </Route>
            </Switch>
                
        </Router>
    </Fragment>
}
export default Header;
