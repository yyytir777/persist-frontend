import { useEffect, useState } from "react";
import LogGrid from "../LogGrid";
import Categories from "../category/Categories";
import Readme from "../md/Readme";
import getLogApi from "../api/log/GetLogApi";
import getCategoryListApi from "../api/category/GetCategoryListApi";
import getReadmeApi from "../api/member/GetReadmeApi";

const TabContent = ({ activeTab, memberId }) => {
    const [logs, setLogs] = useState();
    const [category, setCategory] = useState();
    const [readme, setReadme] = useState();

    useEffect(() => {
        const fetchLogs = async() => {
            const logs = await getLogApi();
            setLogs(logs);
        }

        const fetchCategory = async() => {
            const categories = await getCategoryListApi();
            console.log('tabContent : ', categories);
            setCategory(categories);
        }

        const fetchReadme = async() => {
            const readme = await getReadmeApi(memberId);
            console.log('readme : ', readme);
            setReadme(readme);
        }

        switch(activeTab) {
            case "Log":
                fetchLogs();
                break;
            case "Readme":
                fetchReadme();
                break;
            case "Category":
                fetchCategory();
                break;
            default:
                return null;

        }
    }, [activeTab, memberId]);

    if (activeTab === 'Log') {
        return(<LogGrid logs={logs}/>);
    } else if (activeTab === 'Readme') {
        return(<Readme content={readme}/>);
    } else if (activeTab === 'Category') {
        return(<Categories category={category}/>);
    } else {
        return(<></>);
    }
}

export default TabContent;