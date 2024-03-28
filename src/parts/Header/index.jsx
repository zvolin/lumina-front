'use client';

// Imports
// ------------
import React from 'react';
import Brand from './Brand';
import { Grid } from '@waffl';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Header = () => {
    return (
        <Grid>
            <Jacket $small="1/3" $medium="1/7" $large="1/13">
                <Brand />
            </Jacket>
        </Grid>
    );
}

export default Header;