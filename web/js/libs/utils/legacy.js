(function ($) 
{
	function isRGBACapable() 
	{
		var $script = $('script:first'), color = $script.css('color'), result = false;
		if (/^rgba/.test(color)) 
		{
			result = true;
		} 
		else 
		{
			try 
			{
				result = (color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color'));
				$script.css('color', color);
			} 
			catch (e) {}
		}
		return result;
	}

	$.extend(true, $, { support: {	'rgba': isRGBACapable()}});
	
  var properties = ['color', 'backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'outlineColor'];
    
	$.each(properties, function (i, property) 
	{
		$.fx.step[property] = function (fx) 
		{
			if (!fx.init) 
			{
				fx.begin = parseColor($(fx.elem).css(property));
				fx.end = parseColor(fx.end);
				fx.init = true;
			}
				fx.elem.style[property] = calculateColor(fx.begin, fx.end, fx.pos);
			}
	});
	
	$.fx.step.borderColor = function (fx) 
	{
		if (!fx.init) 
		{
			fx.end = parseColor(fx.end);
		}
		
		var borders = properties.slice(2, 6); // All four border properties
		
		$.each(borders, function (i, property) 
		{
			if (!fx.init) 
			{
				fx[property] = { begin: parseColor($(fx.elem).css(property)) };
			}
			fx.elem.style[property] = calculateColor(fx[property].begin, fx.end, fx.pos);
		});
		
		fx.init = true;
	}

	function calculateColor(begin, end, pos) 
	{
		var color = 'rgb' + ($.support['rgba'] ? 'a' : '') + '(' + parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ',' + parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ',' + parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
		if ($.support['rgba']) 
		{
			color += ',' + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
		}
		color += ')';
		
		return color;
	}

	function parseColor(color) 
	{
		var match, triplet;
		if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) 
		{
			triplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];
		} 
		else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) 
		{
			triplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];	
		} 
		else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) 
		{
			triplet = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];
		} 
		else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color)) 
		{
			triplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), parseFloat(match[4])];
		}
		return triplet;
	}
})(jQuery);