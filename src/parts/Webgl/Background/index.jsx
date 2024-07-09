'use client';

// Imports
// ------------
import React, { Suspense } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import ExportedImage from 'next-image-export-optimizer';

// Styles
// ------------
import { Jacket } from './styles';

const Background = ({ isPaused }) => {
    return (
        <Jacket>
            <ExportedImage
                src="/Texture.png"
                alt="Brand texture"
                fill
                style={{ objectFit: 'contain' }}
                priority={true}
                className="tl"
            />

            <ExportedImage
                src="/Texture.png"
                alt="Brand texture"
                fill
                style={{ objectFit: 'contain' }}
                priority={true}
                className="br"
            />

            <Suspense fallback={null}>
                <ShaderGradientCanvas
                    style={{
                        position: 'absolute',
                        top: 0,
                        pointerEvents: 'none',
                        zIndex: -1,
                    }}
                    >
                    <ShaderGradient
                        control='query'
                        urlString={`https://www.shadergradient.co/customize?animate=${isPaused ? 'off' : 'on'}&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23CDB4DB&color2=%23FFC8DD&color3=%23A2D2FF&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=30&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=26.1&rangeStart=3.1&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.6&uFrequency=5.5&uSpeed=0.4&uStrength=1.7&uTime=3.1&wireframe=false`}
                    />
                </ShaderGradientCanvas>
            </Suspense>
        </Jacket>
    )
}

export default Background;