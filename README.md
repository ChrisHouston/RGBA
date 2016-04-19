# RGBA
Use JPEGs rather than PNGs for your transparent images. More than 80% smaller than 24-bit PNGs.

## Usage

1. Process your images using the included Adobe Photoshop CC 2015 action (rgba-jpeg.atn)
1. Include rgba.min.js in your project
1. Load your images with `rgba.getCanvas()`
1. Use the `rgba.setBackground()` helper function to set the returned canvas as the background of an element, or use the returned Canvas however you like.

```
rgba.getCanvas("images/test-rgba.jpg", function (canvas) {
	rgba.setBackground(document.getElementById("Div4"), canvas);
});
```

## [See it in action](https://cdn.rawgit.com/ChrisHouston/RGBA/master/example.html)

## Documentation

### `rgba.getCanvas(rgbFile [, aFile] [, callback])`

The main task that loads images, composites them and returns a Canvas.

#### `rgbFile` [String]
URL of an image containing RGBA image data, typically a JPEG.
#### `aFile` [String, Optional]
URL of an image containing the A (alpha/opacity) image data, typically a JPEG, but sometimes a PNG would be a better bet. If it is not set, or is the same value as `rgbFile`, the assumption is made that the bottom half of `rgbFile` contains the alpha information.
#### `callback` [Function, Optional]
The function to call once the image compositing is complete. It will be passed a canvas.

```
rgba.getCanvas("images/test-rgb.jpg", "images/test-a.jpg", myCallback);

```

### `rgba.setBackground(element, canvas)`

#### `element` [HTMLElement]
The HTML element to set the background of.
#### `canvas` [Canvas]
The canvas object containing the image to use as the background.

```
rgba.setBackground(document.getElementById("Div4"), canvas);

```

## About the Photoshop Action

The action is designed for processing PNGs, so will look for a layer called "Layer 0". This layer will be transformed into the Alpha data (black for transparent, white for opaque), and the RGB data (with the background set to your current background colour).

You should then export the two layers either to separate files, or to the same file by placing the A layer below the RGB layer (see images/test-rgba.jpg for an example). It's your call which method to use - neither way is intrinsically better than the other. I prefer to use separate images when the A data would compress better as an 8-colour PNG.

The colourful haloes on the RGB layer allow the JPEG compression to work a little bit more effectively, with less risk of dirty edges.

