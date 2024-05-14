// Imports
// ------------
import React, { useContext } from 'react';
import { Grid } from '@waffl';
import { GlobalContext } from '@parts/Contexts';

// Styles
// ------------
import { Jacket, Title } from './styles';

// Component
// ------------
const Hero = () => {
    // NOTE • Contexts
    const { begin } = useContext(GlobalContext);

    return (
        <Grid>
            <Jacket $small="1/3" $medium="1/7" $large="1/13">
                <Title $isHidden={begin}>Directly verify Celestia</Title>
            </Jacket>
        </Grid>
    );
}

export default Hero;