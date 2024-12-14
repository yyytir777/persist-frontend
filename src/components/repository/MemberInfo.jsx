import { useEffect, useState } from "react";
import getMember from "../api/member/GetMemberApi";

const MemberInfo = ({ id }) => {
    const [member, setMember] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await getMember(id);
                setMember(response);
                console.log('response : ', response);
            } catch(error) {
                console.log(error);
            }    
        }
    
        fetchData();
    }, [id]);

    return(
        <div>
            <p>{member?.email}</p>
            <p>{member?.name}</p>
            <p>{member?.logName}</p>
            <p>{member?.thumbnail}</p>
        </div>
    );
}

export default MemberInfo;