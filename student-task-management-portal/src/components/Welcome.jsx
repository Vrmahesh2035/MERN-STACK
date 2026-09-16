import { useEffect, useState } from "react";

function Welcome(){
    const [time, setTime] = useState(new Date());
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <section className="welcome">
            <h1>HI, MAHESH !!</h1><p>{time.toLocaleDateString("en-IN",{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric"
            })}</p>
        </section>
    );
}
export default Welcome;