(function($) 
{		
	
	// functions ----------------------------------------------------------------------------------------------------
	
	$.alpha_hide = function(element, options)
	{								
		var base = this;									// ref				
		base.options = options;						// params		
		base.$element = $(element);				// element				
		base.to = options.to;							// data
		base.time = options.time;
		base.callback = options.callback;		
					
		base.func = function()
		{												
			base.callback = (!base.callback) ? function() { base.$element.hide() } : base.callback;
			base.$element.animate({"opacity":base.to}, base.time, null, base.callback);		
		}	
		base.func();
	};
	
	$.alpha_show = function(element, options)
	{								
		var base = this;									// ref				
		base.options = options;						// params		
		base.$element = $(element);				// element				
		base.from = options.from;					// data
		base.to = options.to;							
		base.time = options.time;
		base.callback = options.callback;		
					
		base.func = function()
		{												
			base.$element.css({"opacity":base.from, "display":"block"}).animate({"opacity":base.to}, base.time, null, base.callback);		
		}	
		base.func();
	};
	
	$.color_pulse = function(element, options)
	{								
		var base = this;											// ref				
		base.options = options;								// params		
		base.$element = $(element);						// element				
		base.callback = options.callback;		
		base.to = options.to;
		base.from = options.from;
				
		base.func = function()
		{												
			base.$element.animate({"color":base.to}, 50, function () 
			{   
				base.$element.animate({"color":base.from}, 50, function () 
				{   
					base.$element.animate({"color":base.to}, 50, function ()
					{
						base.$element.animate({"color":base.from}, 50, base.callback);
					}); 
				});
			});
		}	
		base.func();
	};
	
	$.border_pulse = function(element, options)
	{								
		var base = this;											// ref				
		base.options = options;								// params		
		base.$element = $(element);						// element					
		base.to = options.to;
		base.from = options.from;
				
		base.func = function()
		{												
			base.$element.animate({"borderLeftWidth":base.to, "borderRightWidth":base.to, "borderTopWidth":base.to, "borderBottomWidth":base.to}, 250, function () 
			{   	
				base.$element.animate({"borderLeftWidth":base.from, "borderRightWidth":base.from, "borderTopWidth":base.from, "borderBottomWidth":base.from}, 250, function () 
				{   
					base.func();
				});
			});
		}	
		base.func();
	};
	
	// callee	-------------------------------------------------------------------------------------------------------
			
	$.fn.alpha_hide = function(options)
	{								
		options = $.extend({}, { widget:"alpha_hide", ref:this.selector }, options);
		return this.each(function() { (new $.alpha_hide(this, options)); });		
	};
	
	$.fn.alpha_show = function(options)
	{								
		options = $.extend({}, { widget:"alpha_show", ref:this.selector }, options);
		return this.each(function() { (new $.alpha_show(this, options)); });		
	};
	
	$.fn.color_pulse = function(options)
	{								
		options = $.extend({}, { widget:"color_pulse", ref:this.selector }, options);
		return this.each(function() { (new $.color_pulse(this, options)); });		
	};
	
	$.fn.border_pulse = function(options)
	{								
		options = $.extend({}, { widget:"border_pulse", ref:this.selector }, options);
		return this.each(function() { (new $.border_pulse(this, options)); });		
	};
}
)(jQuery);