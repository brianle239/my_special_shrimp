
import { Link } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';

export default function Home() {
    return (
        <div>
            Yes
            <Link to="Test"> Test </Link>
            <Link to="Game1"> Game1 </Link>
            <Link to="Game2"> Game2</Link>
            <Link to="Game3"> Game3</Link>
            <LoadingAnimation />
        </div>
    )
}
