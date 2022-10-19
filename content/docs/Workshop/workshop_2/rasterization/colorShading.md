---
katex: true
---
# Color shading
## Code
{{< details title="Color shading Code" open=false >}}
{{< highlight js >}}
{{% include "/sketches/taller2/colorShading.js" %}}
{{< /highlight >}}
{{< /details >}}
## Visualization
{{< p5-iframe sketch="/Talleres/sketches/taller2/colorShading.js" width="420" height="465" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" >}}

## Background
Color Shading is a technique that allows us to create a smooth transition between two or more colors. This technique is used in many applications, such as in the creation of gradients, shadows, and even in the creation of 3D objects.
The color shading technique is based on the interpolation of colors. I.e., the color of a pixel is calculated by interpolating the colors of the vertices of the triangle that contains the pixel. The interpolation is done by calculating the barycentric coordinates of the pixel with respect to the triangle. The barycentric coordinates are calculated by solving the following system of equations:
$$
\begin{cases}
\alpha x_0 + \beta x_1 + \gamma x_2 = x\\\\
\alpha y_0 + \beta y_1 + \gamma y_2 = y
\end{cases}
$$
Where $(x_0, y_0)$, $(x_1, y_1)$, and $(x_2, y_2)$ are the coordinates of the vertices of the triangle, and $(x, y)$ are the coordinates of the pixel. The solution of the system of equations is given by:
$$
\begin{cases}
\alpha = \frac{(y_1 - y_2)(x - x_2) + (x_2 - x_1)(y - y_2)}{(y_1 - y_2)(x_0 - x_2) + (x_2 - x_1)(y_0 - y_2)}\\\\
\beta = \frac{(y_2 - y_0)(x - x_2) + (x_0 - x_2)(y - y_2)}{(y_1 - y_2)(x_0 - x_2) + (x_2 - x_1)(y_0 - y_2)}\\\\
\gamma = 1 - \alpha - \beta
\end{cases}
$$
The color of the pixel is calculated by interpolating the colors of the vertices of the triangle. The interpolation is done by multiplying the color of each vertex by its barycentric coordinate and adding the results. The result is the color of the pixel.
$$
\begin{cases}
r = \alpha r_0 + \beta r_1 + \gamma r_2\\\\
g = \alpha g_0 + \beta g_1 + \gamma g_2\\\\
b = \alpha b_0 + \beta b_1 + \gamma b_2
\end{cases}
$$
Where $r_0$, $g_0$, and $b_0$ are the red, green, and blue components of the color of the first vertex, respectively. The same applies for the other vertices.

## Bibliography
- [Barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system)
- [Codigo basado de los ejemplos libreria p5.quadrille.js](https://github.com/objetos/p5.quadrille.js/tree/main/examples/raster) 