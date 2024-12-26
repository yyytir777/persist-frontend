import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DemoPage() {
    const state = useLocation();
    const [emp, setEmp] = useState(2);

    useEffect(() => {
        setEmp(1);
    }, []);

    useEffect(() => {
        console.log(emp);
    }, [emp]);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return(
        <>
        </>
    );
}