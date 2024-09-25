import './loadingAnimation.css';


const LoadingAnimation: React.FC = () => {
    

    
    return (
        <div className='entire'>
            <div className="gif">
                <img className="image1 flipX" src="loading_image/shadows_image.png" alt="description" />
                <img className="image2 flipX" src="loading_image/shadows_image2.png" alt="description" />
                <img className="image3 flipX" src="loading_image/shadows_image3.png" alt="description" />
                <img className="image4 flipX" src="loading_image/shadows_image4.png" alt="description" />
                <img className="image5 flipX" src="loading_image/shadows_image5.png" alt="description" />
            </div>
            
        </div>

    );
};

export default LoadingAnimation;
