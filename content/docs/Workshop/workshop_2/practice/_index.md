---
bookCollapseSection: true
---
# Practice Rendering

## Problem statement
Implement in software any of the above visualizations: primitive rasterization, color shading, z-depth, texture-mapping (as illustrated above) and/or anti-aliasing (requires a bit of research).

## Primitive Rasterization
Rasterization consists of taking an image in vector graphics format and converting it into a raster image, this means a series of pixels, points or lines, which when displayed together create the image that was represented through vector graphics.

For this case we are going to make a rasterization of a triangle, then the first thing we must do is to know which pixels are contained within the triangle, for this case we use the edge function that is defined as follows:

{{<figure src="/Talleres/sketches/taller2/assets/formula.png">}}

When the equation gives us less than zero, it means that the point is on the left side of the line, when it gives us greater it means that it is on the right side of the line and when it is equal to 0 it means that the point is exactly on the line.

We do this for each line of the triangle, and we verify that the results give us the same sign, it is important to clarify that the lines are running clockwise to the hands of the clock. Below is an example where pressing any key shows a different triangle.

{{< details title="Primitive Rasterization" open=false >}}
{{< highlight js >}}
{{% include "/sketches/taller2/rendering.js" %}}
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/Talleres/sketches/taller2/rendering.js" width="450" height="450" >}}

## Z-Buffer

A z-buffer is a type of data buffer in which information about the depth of objects in 3D space from a particular perspective is stored. This helps to ensure that the correct polygons hide polygons that are further back.

It consists mainly of when you want to add a new element, it is compared pixel by pixel, and checks the buffer that currently has, if the depth is further away nothing is done, if it is greater the pixel of the element is added and the buffer is updated to the new depth.

Below is an example, you can press any key to change the location of the objects, additionally you can press the 'z' key to see the buffer, in this case the lighter it is the closer the object is.

{{< p5-iframe sketch="/Talleres/sketches/taller2/buffer_z.js" width="400" height="400" >}}

{{<section>}}