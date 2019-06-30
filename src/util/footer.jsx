import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';




const MadeWithLove = () => {

    return (
     
            <Typography variant="body1" color="textSecondary" align="center">
                {'Built with love by '}
                <Link color="inherit" href="mailto:gabriel.liu3615@gmail.com">
                    Yufei
            </Link>
            </Typography>
       
    );
}
export default MadeWithLove
