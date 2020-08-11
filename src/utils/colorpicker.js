import {loadScript, loadStyle} from './helpers.js';

loadStyle("https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/nano.min.css");
loadScript("https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js");
loadScript("https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.es5.min.js");
module.exports = {
	colorPicker : (el, options) => {
		window.Pickr.create({
			el,
			theme: 'nano',
			// container: element.parent(),
			default: options.default || '#00ff00',
			comparison: false,
			components: {
				// Main components
				preview: true,
				opacity: true,
				hue: true,
				// Input / output Options
				interaction: {
					input: true
				}
			}
		})
		.on('init', instance => {
				if(options.onInit) options.onInit(instance);
		})
		.on('change', (color, instance) => {
			if(options.onChange) options.onChange(color, instance);
		});
	}
};