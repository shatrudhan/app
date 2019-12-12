import React,{Fragment,useState} from 'react';
import '../global.css';

var xyz;
var tmr_ms = 100;
var tmr_s = 1;

const Timer = () => {

  const [input_num, set_input_num] = useState('');
  const [start_stop, set_start_stop] = useState(1);

  const [timer_h, settimer_h] = useState({hour : 0});
  const [timer_m, settimer_m] = useState({minut : 0});
  const [timer_s, settimer_s] = useState({second : 0});
  const [timer_ms, settimer_ms] = useState({milisecond : 0});

  const ClickHandler= (remark) =>{
    if(remark === 1){
      // START TIMER 
      set_start_stop(2);
      
      if(input_num <= 1){
        set_start_stop(1);
        set_input_num('');    
        settimer_h({hour : 0});
        settimer_m({minut : 0});
        settimer_s({second : 0});
      }else{
        xyz = setInterval(() => { 
          if(tmr_ms <= 0){
            tmr_ms = 100;
          }else{
            if(tmr_ms === 1){
              ManageSecond();
            }
            settimer_ms({ milisecond : timer_ms.milisecond+tmr_ms });
            tmr_ms--;
          } 
        }, 10);
      }
    
    }else if(remark === 2){
      // STOP TIMER
      set_start_stop(1);
      clearInterval(xyz);
      settimer_ms({ milisecond : 0 });
    }else if(remark === 3){
      // RESET TIMER
      clearInterval(xyz);
      set_start_stop(1);
      set_input_num('');    
      settimer_h({hour : 0});
      settimer_m({minut : 0});
      settimer_s({second : 0});
      settimer_ms({ milisecond : 0 });
    }
  }

  const ManageSecond = () => {

      settimer_s({second : timer_s.second-tmr_s});
      tmr_s++;
      ManageMinute();

  }

  const ManageMinute = () => {
    console.clear()
    console.log()
  }

  // const ManageHour = () => {
  // }

  const secondsToHms = (d) => {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + (h === 1 ? "" : "") : "";
      var mDisplay = m > 0 ? m + (m === 1 ? "" : "") : "";
      var sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "";
      return hDisplay +':'+ mDisplay +':'+ sDisplay; 
  }
  
  const handlerOnchange = (e) => {

    if(e.target.value <= 86400){
      const hms = secondsToHms(e.target.value).split(':');

      set_input_num(e.target.value);
      
      settimer_h({hour : hms[0] === '' ? 0 : hms[0] });
      settimer_m({minut : hms[1] === '' ? 0 : hms[1]});
      settimer_s({second : hms[2] === '' ? 0 : hms[2]});
    }else if(e.target.value === 0){
      set_input_num('');    
      settimer_h({hour : 0});
      settimer_m({minut : 0});
      settimer_s({second : 0});
    }else{  
      set_input_num('');    
      settimer_h({hour : 0});
      settimer_m({minut : 0});
      settimer_s({second : 0});
    }
    
  }

  const SubmitHandler = (e) =>{
    e.preventDefault();
    ClickHandler(1);
  }

  return <Fragment>
          <div className="timer_main_div">
            
            <div>
              <h1>2. TIMER</h1>
            </div>

            <br /><br />

            <div className="timer_div">

                <p className="p4">H &nbsp; M &nbsp; S &nbsp; MS</p>

                <div className="p2">
                  <div>{timer_h.hour}</div> :
                  <div>{timer_m.minut}</div> :
                  <div>{timer_s.second}</div> :
                  <div>{timer_ms.milisecond}</div>
                </div>

                <div className="p3">
                  <form onSubmit={SubmitHandler}>
                    <input className="input_num" type="number" name="input_num" value={input_num} placeholder="enter some number value" disabled={start_stop === 1 ? false : true} autoComplete="off" onChange={handlerOnchange} />
                  </form>
                </div>

                <p>
                  <button className="btn_t" onClick={ClickHandler.bind(this, start_stop)} disabled={input_num !== '' ? false : true}> {start_stop === 1 ? 'START' : 'STOP'} </button>
                  <button className="btn_t" onClick={ClickHandler.bind(this,3)}>RESET</button>
                </p>

            </div>

          </div>
  </Fragment>

          
}

export default Timer;
