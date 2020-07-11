'''
WIP - Will be updated with more info.
Requires numpy and matplotlib.
Optionally requires an image writer to save animation as video/gif.
'''

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.animation import FuncAnimation

# Intialize figure to be plotted on
fig = plt.figure(facecolor='white')
ax = fig.add_subplot(projection='3d')


def init():
    # Set inital viewing angle
    ax.view_init(elev=7, azim=-100)

    # Set axis max and mins.
    ax.set_xlabel('X')
    ax.set_xlim(-20, 20)

    ax.set_ylabel('Y')
    ax.set_ylim(-40, 40)

    ax.set_zlabel('Z')
    ax.set_zlim(-40, 40)


def animate(i):
    '''
    The animate function. This is used to generate each frame of the final gif.
    i represents the amount of degrees the function
    should revolve around the axis.
    '''
    x = np.linspace(-20, 20, 60)
    r = np.linspace(0, i, 60)
    X, R = np.meshgrid(x, r)

    # Change 'X + X * np.sin(X)' to try a different function.
    Y = (X + X * np.sin(X)) * np.cos(R)
    Z = (X + X * np.sin(X)) * np.sin(R)

    return [ax.plot_surface(X, Y, Z, color='red', rstride=2, cstride=2)]


# Animate graph
anim = FuncAnimation(fig, animate,
                     np.linspace(0, 2 * np.pi, 10), interval=130, init_func=init)

# Uncomment to save graph as gif. Change the writer to your liking.
# anim.save("SORVis.gif", writer="imagemagick")

# Displays the graph.
plt.show()
