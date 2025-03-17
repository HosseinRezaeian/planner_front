import React, { useState } from 'react';
import moment from 'moment-jalaali';





interface TestComponentProps {
    tes: string;   // tes یک رشته است
    age: string;   // age یک رشته است (می‌توان آن را به عدد تبدیل کرد)
    name: string;  // name یک رشته است
  }


const FullCalenderJalali: React.FC<TestComponentProps>=({tes,age,name})=>{




    return(
        <div>
            {tes}
            {age}
        </div>
    )
}