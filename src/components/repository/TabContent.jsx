import LogGrid from "../LogGrid";
import Categories from "../category/Categories";
import Readme from "../md/Readme";

const TabContent = ({ tab, content }) => {

    if (tab === 'Logs') {
        return(<LogGrid logs={content}/>);
    } else if (tab === 'Readme') {
        return(<Readme value={content}/>);
    } else if (tab === 'Categories') {
        return(<Categories value={content}/>);
    } else {
        return(<></>);
    }
}

export default TabContent;