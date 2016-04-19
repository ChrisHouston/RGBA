window.rgba = window.rgba || (function () {


	function getCanvas(rgbFile, aFile, callback) {
		/**
		rgbFile: URL of an image containing RGBA image data, typically a JPEG
		aFile: URL of an image containing A (alpha/opacity) image data, typically a JPEG, but sometimes a PNG would be a better bet.
		callback: function to call once the texture atlas is ready.
		**/

		function onImgLoaded() {
			this.ready = true;
			if (rgbImg.ready && aImg.ready) {
				compositeImages();
			}
		}

		function compositeImages() {

			var aData, rgbData, rgbImageData

			var w = rgbImg.naturalWidth;
			var h = rgbImg.naturalHeight;

			var aOffset = 0;

			if (singleImage) {
				h *= 0.5
				aOffset = h;
			}

			//the final output canvas
			var cvs = document.createElement("canvas");
			cvs.width = w;
			cvs.height = h;
			var ctx = cvs.getContext("2d");

			//smaller canvas for compositing
			var cvs1 = document.createElement("canvas");
			cvs1.width = w;
			cvs1.height = 32;
			var ctx1 = cvs1.getContext("2d");

			//process in small chunks to use less memory
			for (var j = 0; j < h; j += 32) {

				//get alpha information
				ctx1.drawImage(aImg, 0, -j - aOffset);
				aData = ctx1.getImageData(0, 0, w, 32).data;

				//get rgb information
				ctx1.drawImage(rgbImg, 0, -j);
				rgbImageData = ctx1.getImageData(0, 0, w, 32)
				rgbData = rgbImageData.data;

				//copy the green channel from aImg to the alpha channel of rgbImg
				for (var i = 3, len = rgbData.length; i < len; i = i + 4) {
					rgbData[i] = aData[i - 2];
				}

				ctx.putImageData(rgbImageData, 0, j, 0, 0, w, 32);

			}

			rgbImg = null;
			aImg = null;

			if (callback) {
				callback(cvs);
			}
		}

		var singleImage = false;

		if (aFile == rgbFile) {
			singleImage = true;
		}

		if (typeof (aFile) !== "string") {
			callback = aFile;
			singleImage = true;
		}

		var rgbImg = new Image();
		var aImg = (singleImage) ? rgbImg : new Image();

		rgbImg.ready = false;
		rgbImg.onload = onImgLoaded;
		rgbImg.src = rgbFile;

		if (!singleImage) {
			aImg.ready = false;
			aImg.onload = onImgLoaded;
			aImg.src = aFile;
		}
	}


	function setBackground(element, canvas) {
		element.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
	}

	return {
		getCanvas: getCanvas,
		setBackground: setBackground
	}

})();