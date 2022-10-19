# Tetris 3D

The following project applies concepts of visual computing to the classic game of Tetris. The goal is to create a 3D version of the game, where the player can rotate the game board and the falling blocks. The game should be playable with a keyboard. The purpose is to learn about the following topics:

* 3D transformations
* Matrix transformations to different coordinate systems
* Views, and productions of 3D scenes

{{< p5-iframe sketch="/Talleres/sketches/taller2/tetris.js" width="780" height="1000" >}}

# Background

The use of Kernels also known as convolution matrices or masks is invaluable to image processing. Techniques such as blurring, edge detection, and sharpening all rely on kernels - small matrices of numbers to be applied across an image in order to process the image as a whole.

They're also used in machine learning for 'feature extraction', a technique for determining the most important portions of an image. In this context the process is referred to more generally as "convolution" (see: [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network).)

# Results

We implemented the convolutional layer by defining a 3x3 matrix in which the filter was defined, then we just iterated through each pixel in the image and calculated a new filtered pixel by adding each of its neighbors weighted with the kernel matrix. Edge pixels were ignored as they don't have the 8 corresponding neighbors.

# Conclusions & Future Work

This method may not be the most efficient to implement this kind of filtering process, using parallel computing may be faster. But as an educative example it's pretty effective and illustrative. We use this kind of filters in our daily lives wihtout even knowing it (until we learned about it), it's used in processing image software (such as photoshop or gimp) and the social media networks we often use. As a future work, it'd be interesting to know how to generate (or approximate) a kernel matrix to achieve a desired filter, also to learn how to implement this by using parallel computing and implement some video filtering.