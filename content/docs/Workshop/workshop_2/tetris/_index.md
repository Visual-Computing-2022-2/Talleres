# Tetris 3D

The following project applies concepts of visual computing to the classic game of Tetris. The goal is to create a 3D version of the game, where the player can rotate the game board and the falling blocks. The game should be playable with a keyboard. The purpose is to learn about the following topics:

- 3D transformations
- Matrix transformations to different coordinate systems
- Views, and productions of 3D scenes

{{< p5-iframe sketch="/Talleres/sketches/taller2/tetris.js" width="780" height="1000" >}}

## Background

Every transformation in spaces of 2D or 3D can be represented as a matrix. Each matrix will have a different effect on the object. The following table shows the different matrices and their effects.

| Matrix      | Effect                      |
| ----------- | --------------------------- |
| Translation | Moves the object in space   |
| Rotation    | Rotates the object in space |
| Scaling     | Scales the object in space  |
| Shearing    | Shears the object in space  |

For a generalization of the transformations, we can use matrix 4x4, to generalize the transformations needed to do affine and linear transformations.

Thanks to the property of space transformations to be capable to be performed using several matrices multiplications, we can build interesting transformations to many objects on the space changing the reference system, and in the way we apply each transformation continuously.

In this way, we can get many perspectives of objects and they may perform different actions dependin on the order in our scene trees.

(see: [Homogenous Coordinates, Coordinate Spaces sections](https://visualcomputing.github.io/docs/).)

Thanks to different libraries and implementations, as [p5.js](https://p5js.org/), we can easily implement these transformations and get a visual representation of them, using webGL API, for example.

I  this way, we can get interesting and entertaining results, as we will see in the following project, making a 3D version of the classic game of Tetris, changing the perspective of the game board and the falling blocks, and sightly its dynamics.

## The Game

Tetris is a tile-matching puzzle video game, originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov. The first playable version was completed on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the Academy of Sciences of the USSR in Moscow. It was officially released on June 6, 1984, and published by the Soviet Union's Academy of Sciences. [Wikipedia](https://en.wikipedia.org/wiki/Tetris).

The game consists of seven different tetrominoes, each made up of four squares. The tetrominoes fall down the playing field (a rectangular vertical shaft, called the "well" or "matrix"). The objective of the game is to manipulate these tetrominoes, by moving each one sideways and rotating it by 90-degree angles, with the aim of creating a horizontal line of ten units without gaps. When such a line is created, it disappears, and any block above the deleted line will fall. The player can proceed to fill the vacated line. The game ends when the stack of tetrominoes reaches the top of the playing field and no new tetrominoes are able to enter. [Wikipedia](https://en.wikipedia.org/wiki/Tetris).

In this way, we preserve the original game dynamics almost completely, but we will add a new perspective to the game, and we will change the way the blocks fall, and the way the game board is rotated, making the board have no limits on its sides, and the blocks will fall in a more natural way, as if they were falling in a real 3D space.

As the original game, its memory is conformed by a matrix of 10x20, where the blocks will fall, and the player will be able to move them, and rotate the game board, to make the blocks fit in the matrix, but, as there are no limits on its sides, each tetrominoes can be traslated freely in the X axis. The game will be over when the blocks reach the top of the matrix.

## Results

As a result, we got a new 3D Tetris experience, which is entertaining and fun to play. The game is playable with the keyboard, and the player can rotate the game board and the falling blocks, and change the perspective of the game. You can check it out at the top of this article.

## Conclusions & Future Work

The project was a success, and we got a new perspective of the classic game of Tetris, which is fun to play. It also shows how many different games that used to be played on a 2D screen can be adapted to a 3D environment, and how the game dynamics can be changed, and the game can be more entertaining, and get different variations of the original game.

In the future, we could add more features to the game, like a new menu and graphical interface, to start the game, and to end it. Pther multiple variations or game modes can be implemented too. We could also add a multiplayer mode, where the player can play against another player, or against the computer, and the game board could be bigger, and the blocks could fall faster, making the game more challenging.

Finally, it has been demostrated that, visual computings are not only useful, but also fun, and entertaining, and they can be used to create new experiences, and new ways to play games, and to have fun. The real limit of the possibilities of visual computing , modular arithmetics, linear algebra and many other topics, is the imagination of the people who use them.

## References

- [Tetris](https://en.wikipedia.org/wiki/Tetris)
- [p5.js](https://p5js.org/)
- [Homogenous Coordinates, Coordinate Spaces](https://visualcomputing.github.io/docs/)
