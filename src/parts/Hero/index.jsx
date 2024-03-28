// Imports
// ------------
import React from 'react';
import { Grid } from '@waffl';

// Styles
// ------------
import { Jacket, Title } from './styles';

// Component
// ------------
const Hero = () => {
    return (
        <Grid>
            <Jacket $small="1/3" $medium="1/7" $large="1/13">
                <Title>Verify the availability of block data by sampling the Celestia network for shares</Title>
            </Jacket>
        </Grid>
    );
}

export default Hero;