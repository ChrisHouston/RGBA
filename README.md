# RGBA
Use JPEGs rather than PNGs for your transparent images. More than 80% smaller than 24-bit PNGs.

## Usage

1. Process your images using the included Photoshop CC action (rgba-jpeg.atn)
1. Include rgba.min.js in your project
1. Load your images with `rgba.getCanvas()`
1. Use the `rgba.setBackground()` helper function to set the returned canvas as the background of an element, or use the returned Canvas however you like.

## [example.html] See it in action

## Documentation

### `rgba.getCanvas(rgbFile, [aFile,] callback)`

### `rgba.setBackground(element, canvas)`


