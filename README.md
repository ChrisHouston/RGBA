# RGBA
Use JPEGs rather than PNGs for your transparent images. More than 80% smaller than 24-bit PNGs.

## Usage

1. Process your images using the included Photoshop CC action (rgba-jpeg.atn)
1. Include rgba.min.js in your project
1. Load your images with `rgba.getCanvas()`
1. Use the `rgba.setBackground()` helper function to set the returned canvas as the background of an element, or use the returned Canvas however you like.

## [See it in action](example.html)

## Documentation

### `rgba.getCanvas(rgbFile [, aFile] [, callback])`

#### `rgbFile [String]`
URL of an image containing RGBA image data, typically a JPEG.
#### `aFile [String, Optional]`
URL of an image containing the A (alpha/opacity) image data, typically a JPEG, but sometimes a PNG would be a better bet. If it is not set, or is the same value as `rgbFile`, the assumption is made that the bottom half of `rgbFile` contains the alpha information.
#### `callback [Function, Optional]`
The function to call once the image compositing is complete. It will be passed a canvas.




### `rgba.setBackground(element, canvas)`


