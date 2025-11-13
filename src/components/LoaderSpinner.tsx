import {HashLoader} from "react-spinners";

function LoaderSpinner() {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <HashLoader color={"#3EE0CF"} size={60}/>
        </div>
    );
}

export default LoaderSpinner;