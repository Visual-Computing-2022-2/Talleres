---
katex: true
---
# Texture mapping
## Code
{{< details title="Texture mapping Code" open=false >}}
{{< highlight js >}}
{{% include "/sketches/taller2/textureMapping.js" %}}
{{< /highlight >}}
{{< /details >}}
## Visualization
{{< p5-iframe sketch="/Talleres/sketches/taller2/textureMapping.js" width="720" height="375" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" >}}

## Background
Texture mapping is a technique that allows us to apply a texture to a 3D object. This technique is used in many applications, such as in the creation of 3D models, in the creation of video games, and in the creation of 3D animations. The texture mapping technique is based on the interpolation of texture coordinates. I.e., the texture coordinates of a pixel are calculated by interpolating the texture coordinates of the vertices of the triangle that contains the pixel. The interpolation is done by calculating the barycentric coordinates of the pixel with respect to the triangle. The barycentric coordinates are calculated by solving the system of equations, which is the same as the one used in the color shading technique.

## Bibliography
- [Barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system)
- [Codigo basado de los ejemplos del docente](https://github.com/objetos/p5.quadrille.js/tree/main/examples/raster) 