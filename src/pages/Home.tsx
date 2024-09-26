
import { Link, useLocation } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import './Home.css';

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option1 = queryParams.get('gamecomplete')

    return (
        <div className='body'>
            {option1 != "3" && <LoadingAnimation/>}
            {option1 == null && <Link to="Game1" className='homeTitle'> Before Getting Closer</Link>}
            {option1 == "1" && <Link to="Game2" className='homeTitle'> Before Confessing Our Love</Link>}
            {option1 == "2" && <Link to="Game3" className='homeTitle'> Before We Miss Each Other</Link>}
            {option1 == "3" && <div className='happy' style={{backgroundImage: `url(./sanrio/happy.png)`}}> </div>}
        </div>
    )
}
