if (!device) var device = function(obj)
{	
	// [error] ==============================================================================
	
	device.error = false;

	//declare sys as object to hold all values globally
	var sys = new Object();
	sys.device = new Object();
	
	//dependancies go here i.e: aka var cons_videoplayer = new VideoPlayers(); 
	
	//do not remove, privilege methods =========================================================================
	this.__detection = function(obj) 	{ return _detection(obj);	};
	this.__flash = function(obj) 			{ return _flash(obj);			};
	
	function _flash(swf)
	{
		if (sys.device.browser == "ie")
		{
			return window[swf];
		}
		else
		{						
			return document[swf];
		}
	}
	
	function _detection(obj)
	{
		sys.device.agent = navigator.userAgent;
		
		if (sys.device.agent.indexOf("iPhone") != -1)
		{
			sys.device.type = "mobile";
			sys.device.name = "iphone";
			sys.device.os = "ios";
				
			detection_media();
			detection_browser();
		}
		else if (sys.device.agent.indexOf("iPad") != -1)
		{
			sys.device.type = "mobile";
			sys.device.name = "ipad";
			sys.device.os = "ios";
			
			detection_media();
			detection_browser();
		}
		else if (sys.device.agent.indexOf("BlackBerry") != -1)
		{
			sys.device.type = "mobile";
			sys.device.name = "blackberry";
			sys.device.os = "blackberry";
			
			detection_media();
			detection_browser();
		}
		else if (sys.device.agent.indexOf("Andriod") != -1)
		{
			sys.device.type = "mobile";
			sys.device.name = "";
			sys.device.os = "andriod";
			
			detection_media();
			detection_browser();
		}
		else if (sys.device.agent.indexOf("Windows") != -1)
		{
			sys.device.type = "pc";
			sys.device.name = "pc";
			sys.device.os = "windows";
			
			detection_media();
			detection_browser();
		}
		else if (sys.device.agent.indexOf("Mac") != -1)
		{
			sys.device.type = "mac";
			sys.device.name = "mac";
			sys.device.os = "";
			
			detection_media();
			detection_browser();
		}
		
		return sys.device;
	};
	
	function detection_media()
	{
		if (jQuery.browser.flash)
		{
			sys.device.flash_on = true;				
		}
		
		if (jQuery.browser.pdf)
		{
			sys.device.pdf_on = true;				
		}
		
		if (jQuery.browser.qtime)
		{
			sys.device.qtime_on = true;				
		}
		
		if (jQuery.browser.wmp)
		{
			sys.device.wmp_on = true;				
		}
		
		if (jQuery.browser.rp)
		{
			sys.device.rp_on = true;				
		}
		
		sys.device.html5_canvas_on = !!document.createElement('canvas').getContext;		
		sys.device.html5_video_on = !!document.createElement('video').canPlayType;
	};
	
	function detection_browser()
	{
		if (sys.device.agent.indexOf("Firefox") != -1)
		{															
			sys.device.browser = "ff";
			sys.device.version = sys.device.agent.substring(sys.device.agent.indexOf("Firefox")+8, sys.device.agent.indexOf("Firefox")+10);
		}
		else if (sys.device.agent.indexOf("MSIE") != -1)
		{
			sys.device.browser = "ie";										
			sys.device.version = sys.device.agent.substring(sys.device.agent.indexOf("MSIE")+5, sys.device.agent.indexOf("MSIE")+8);				
		}
		else if (sys.device.agent.indexOf("Opera") != -1)
		{
			sys.device.browser = "opera";								
			sys.device.version = sys.device.agent.substring(sys.device.agent.indexOf("Opera")+6, sys.device.agent.indexOf("Opera")+9);
		}
		else if (sys.device.agent.indexOf("Chrome") != -1)
		{
			sys.device.browser = "chrome";								
			sys.device.version = sys.device.agent.substring(sys.device.agent.indexOf("Chrome")+7, sys.device.agent.indexOf("Chrome")+10);
		}
		else if (sys.device.agent.indexOf("Safari") != -1)
		{
			sys.device.browser = "safari";
			sys.device.version = sys.device.agent.substring(sys.device.agent.indexOf("Safari")-6, sys.device.agent.indexOf("Safari")-5);
		}
	};
};

//do not remove the bottom public functions =================================================================
device.prototype.detection = function(obj) 				{ if (!device.error) { return this.__detection(obj);		}};
device.prototype.flash = function(obj) 						{ if (!device.error) { return this.__flash(obj); 				}};