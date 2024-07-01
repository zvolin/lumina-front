'use client'

import { ShaderGradientCanvas } from 'shadergradient';
import { Preload } from '@react-three/drei';
import { r3f } from '@parts/Helpers/global';

export default function Scene({ ...props }) {
  return (
    <ShaderGradientCanvas {...props}>
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </ShaderGradientCanvas>
  )
}
