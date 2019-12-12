import React,{Fragment,useState} from 'react';
import '../global.css';

var abc;
var inc_ms = 1;

const App = () => {

  const [start_stop, set_start_stop] = useState(1);
  const [timer_h, settimer_h] = useState({hour : 0});
  const [timer_m, settimer_m] = useState({minut : 0});
  const [timer_s, settimer_s] = useState({second : 0});
  const [timer_ms, settimer_ms] = useState({milisecond : 0});
  
  const ClickHandler= (remark) =>{

    if(remark === 1){
      // START TIMER
      
      set_start_stop(2);

      abc = setInterval(() => {

        if(inc_ms > 100){
          inc_ms = 1;
          SecondTimer();
        }else{
          settimer_ms({ milisecond : timer_ms.milisecond+inc_ms });
          inc_ms++;
        } 

      }, 10);
      
    }else if(remark === 2){
      // STOP TIMER
      set_start_stop(1);
      settimer_ms({ milisecond : 0 });
      clearInterval(abc);
    }else if(remark === 3){
      // RESET TIMER
      clearInterval(abc);
      set_start_stop(1);
      settimer_h({hour : 0});
      settimer_m({minut : 0});
      settimer_s({second : 0});
      settimer_ms({milisecond : 0});
    }

  }

  var inc_s = 1;
  const SecondTimer = () =>{
    if(inc_s === 60){
      inc_s = 0;
      minutTimer();
    }else{
      settimer_s({second : timer_s.second+inc_s});
      inc_s++;
    }
  }

  var inc_m = 1;
  const minutTimer = () =>{
    if(inc_m === 60){
      inc_m = 0;
      hourTimer();
    }else{
      settimer_m({minut : timer_m.minut+inc_m});
      inc_m++;
    }
  }

  var inc_h = 1;
  const hourTimer = () =>{
    settimer_h({hour : timer_h.hour+inc_h});
    inc_h++;
  }

  return <Fragment>
            <div className="timer_main_div">
              
              <div>
                <h1>1. STOP WATCH</h1>
              </div>

              <br /><br />

              <div className="timer_div">              
                  <p className="p1">H &nbsp; M &nbsp; S &nbsp; MS</p>
                  <div className="p2">
                    <div>{timer_h.hour}</div> :
                    <div>{timer_m.minut}</div> :
                    <div>{timer_s.second}</div> :
                    <div>{timer_ms.milisecond}</div>
                  </div>
                  <p>
                    <button className="" onClick={ClickHandler.bind(this, start_stop)}> {start_stop === 1 ? 'START' : 'STOP'}   </button>
                    <button className="" onClick={ClickHandler.bind(this,3)}>RESET</button>
                  </p>
              </div>

            </div>
          </Fragment>
          
}

export default App;
