# About
This repository summarizes how to use `Shader` with `React Three Fiber / Drei` at this time (2022. 5. 11).<br>
Shader is structured both for use in `Material` and for `Post-processing`.<br>

In particular, for post-processing, I use Drei's [Effects](https://github.com/pmndrs/drei#effects), which I could not make into a component in TypeScript due to my lack of knowledge, so I structured it as a class so that Pass can be reused.

Post-processing implements three patterns: `Built-in Pass (UnrealBloomPass)`, `Built-in Shader (FXAAShader)` and `proprietary Shader (Volumetric Light)`.

If anyone knows of an implementation method that can make Pass a component, please let me know.

https://nemutas.github.io/r3f-shader-template/

![output(video-cutter-js com) (8)](https://user-images.githubusercontent.com/46724121/167693608-bdc90897-a65b-40c5-aa6e-7a3ba7efbe58.gif)

# Version
- react：18.0.0
- three：0.140.2
- @react-three/fiber：8.0.13
- @react-three/drei：9.7.1

# Reference
- [Drei - Effects](https://github.com/pmndrs/drei#effects)
- [Volumetric light](https://codesandbox.io/s/volumetric-light-w633u)
