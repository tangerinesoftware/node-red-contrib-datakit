# Node Red datakit

Data analysis tools for payload input data. This is a wrapper around the [datakitjs](https://www.npmjs.com/package/datakitjs) Node library.

## Inputs

Normally, the value of msg.payload is saved into the data set. When a message with a topic that ends in a datakit function name is received, that datakitjs is calculated and output as the msg.payload. For example, a message with the topic `data/mean` would output the mean of the data received so far. Optionally, the function name can be stripped from the topic. For datakitjs functions that require a parameter, the parameter is passed in using msg.payload.

## Functions

The functions in the datakitjs library that are supported are:

Statistical Methods

- mean
- sd
- vari
- cov
- reg

Convenience Methods
- seq
- rep
- isclose
- sum
- prod
- min
- max

Random Numbers
- exp
- norm
- uni


In addition, two other functions are implemented:

- size - returns the size of the data set
- clear - clears the data set

For more detailed information about the functions see the [datakitjs API documentation](https://github.com/NathanEpstein/datakit).
