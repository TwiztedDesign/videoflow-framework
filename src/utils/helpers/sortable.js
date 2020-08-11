import {loadScript} from '../helpers.js';

loadScript("https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js");


// function onUpdate(e) {
// 	let item = this.removeItem(e.oldIndex);
// 	this.addItem(item, e.newIndex);
// 	if(this.options.onUpdate){
// 		this.options.onUpdate(e);
// 	}
// }

const defaults = {
	animation : 1150,
	// onUpdate
};



export default class Sortable {

	constructor(element, items, options){

		let self = this;

		function onUpdate(e) {
			let item = self.removeItem(e.oldIndex);
			self.addItem(item, e.newIndex);
			if(self.onUpdate){
				self.onUpdate(e);
			}
		}

		this.items = items;
		this.onUpdate = options && options.onUpdate;
		this.options = Object.assign({onUpdate}, defaults, options);
		window.Sortable.create(element, this.options);
	}
	addItem(item, index){
		index = index !== undefined? index : this.items.length;
		this.items.splice(index, 0, item);
	}
	removeItem(index){
		index = index !== undefined? index : this.items.length - 1;
		return this.items.splice(index, 1)[0];
	}


}
