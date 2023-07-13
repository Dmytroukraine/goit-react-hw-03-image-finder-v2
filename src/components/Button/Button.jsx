

import PropTypes from 'prop-types';
import styles from './Button.module.css';

const LoadMoreButton = ({onButtonClick}) => {
    return(
        <div className={styles.BtnContainer}>
            <button className={styles.Button} type='button' onClick={onButtonClick}>
                Load more
            </button>
        </div>
    );
};


export default LoadMoreButton;

LoadMoreButton.propTypes = {
    onButtonClick: PropTypes.func,
};