import { HashLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: '0 auto 50px auto'
}


const Spinner = ({color = 'lightblue', size='150'}) => {
    return ( <div>
        <HashLoader
            color={color}
            size={size}
            cssOverride={override}
            aria-label="Loading..."
        />
    </div> );
}
 
export default Spinner;