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

## Buffer Z
{{< details title="Buffer Z" open=false >}}
{{< highlight js >}}
{{% include "/sketches/taller2/buffer_z.js" %}}
{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/Talleres/sketches/taller2/buffer_z.js" width="400" height="400" >}}

{{<section>}}