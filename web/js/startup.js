var url = location.toString();
var root = "/";

if (url.indexOf("localhost") > -1);
{
	root = ""
}

// css
document.write('<link rel="stylesheet" type="text/css" href="'+root+'css/style.css" />');			
// js code
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/jquery-1.7.js"></script>');
// js jquery ui 
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.core.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.widget.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.mouse.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.sortable.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.droppable.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/jquery/ui/jquery.ui.draggable.js"></script>');
// js utils
document.write('<script type="text/javascript" src="'+root+'js/libs/utils/jquery.json-2.3.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/utils/jquery.scrollTo.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/utils/available.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/utils/transitions.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/utils/legacy.js"></script>');
// js portal
document.write('<script type="text/javascript" src="'+root+'js/libs/comps/audio.js"></script>');
document.write('<script type="text/javascript" src="'+root+'js/libs/comps/device.js"></script>');
// js class
document.write('<script type="text/javascript" src="'+root+'js/class_audio.js"></script>');