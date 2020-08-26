# Videoflow Framework (VFF)

VFF is lightweight JavaScript library built to create graphic overlays for Videoflow. VFF exposes a state object that comunicates with Videoflow and is distributed acroess all videoflow players

# CDN
https://cdn.jsdelivr.net/npm/videoflow-framework@0

# Properties
* vff.state
* vff.style - automatically converts properties to css variables (camel case to dash)

# Methods
* vff.send()
* vff.onStateChange(namespace - *optional*, callback)
* vff.upload(asset, callback)
* vff.onModeChange(callback)
* vff.ready(callback)
* vff.isController() - should be called after vff is ready
* vff.video.getInfo() - *returns promise* with the input data
* vff.getApps() - *return promise* with the list of apps

# Utils
* vff.colorpicker(element, options)


License
----

MIT

