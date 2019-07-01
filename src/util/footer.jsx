import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const MadeWithLove = () => {

    return (
     
            <Typography variant="body1" color="textSecondary" align="center">
            {'Made with '} <FontAwesomeIcon icon={faHeart} color="red"/> {' by '}
                <Link color="inherit" href="mailto:gabriel.liu3615@gmail.com">
                    Yufei
                </Link>
            </Typography>
       
    );
}
export default MadeWithLove
