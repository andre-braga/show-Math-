'''
maclaurin.py
Author: Andre Saggio Braga
Copyright (C) 2020 Andre Braga

Comments will be added eventually.
'''


from sympy import *
from sympy.core.rules import Transform
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

degree = 6
x = Symbol('x')
xvals = np.linspace(-2*np.pi, 2*np.pi, 50)
y = sin(x)
yvals = np.sin(xvals)

def maclaurin(n):
    output = 0
    for i in range(0, n + 1):
        output += (y.diff(x, i).evalf(subs={x : 0}) / factorial(i)) * (x ** i)

    return output

def plot():

    maclaurinPolynomial = maclaurin(degree)

    maclaurinText.set_text("Maclaurin Series: " + str(maclaurinPolynomial.xreplace(Transform(lambda x: x.round(degree), lambda x: isinstance(x, Float)))))

    f = lambdify(x, maclaurinPolynomial, 'numpy')
    fx = f(xvals)

    if np.all(fx == 0):
        maclaurinGraph.set_ydata(np.zeros(50))
    else: 
        maclaurinGraph.set_ydata(fx)

    fig.canvas.draw_idle()

fig, ax = plt.subplots(num="Maclaurin Series Approximation of sin(x)",figsize=(10,7))
plt.subplots_adjust(bottom=0.25)
ax.set_ylim(-3, 3)
ax.spines['left'].set_position('center')
ax.spines['bottom'].set_position('center')
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.yaxis.set_ticks_position('left')

axDegree = plt.axes([0.25, .1, 0.65, 0.03], facecolor='lightgoldenrodyellow')

degreeSlider = Slider(axDegree, 'Degree', 0, 18, valinit=6, valstep=2, color='goldenrod')

def update(val):
    global degree
    degree = val
    plot()

degreeSlider.on_changed(update)

ax.plot(xvals, yvals, 'k-')
maclaurinText = axDegree.text(-3.2, 1.5, "Maclaurin Series: " + str(maclaurin(degree).xreplace(Transform(lambda x: x.round(2), lambda x: isinstance(x, Float)))))
maclaurinGraph, = ax.plot(xvals, lambdify(x, maclaurin(degree), 'numpy')(xvals), color='red')

plt.show()
