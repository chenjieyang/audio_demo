var cons_music = new Array();
var cons_music_totals = new Array();
var cons_music_i = 0;

// loads js class
$(document).ready(function() 
{					 
	cons = new c_audio(); 	// loads class		
});

if (!c_audio) var c_audio = function(obj)
{	
	// declare sys as object to hold all values globally   
	var sys = new Object();
	sys.data = new Object();
	
	// do not remove, privilege methods
	this.__check_music = function(p) 			{ return _check_music(p); 		};
	
	// main
	init();
	
	function init()
	{						
		_init_values();
		_init_objects();
		_events_music();
	}
	
	function _init_values()
	{
		sys.data.cache_music = false;
		// path or url
		sys.data.path = location.host;
		sys.data.root = "";
		// sys.data.root = $("#j_root").text();
	}
	
	function _init_objects()
	{
		sys.$win = $(window);												// window element
		sys.$doc = $(document);											// document	element

		sys.$music = $("#music");
		sys.$tmusic = $("#tmusic");
		sys.$data_music = $("#data_music");
	}
	
	// resize image icon on mouse over
	function _events_musicplayer(obj)
	{
		var thumbs = obj.find(".thumb");
		thumbs.each(function(i)
		{
			var pic = $(this).find(".pic");
			var pic_zindex = pic.css("z-index");
			
			pic.bind("mouseenter", function()
			{ 
				var $zoomin = $("#"+$(this).attr("target"));
				$zoomin.hide();	
				$(this).stop();
				$(this).animate({"width":"300px", "height":"253px", "position":"absolute", "z-index":10000}, 500, function()
				{
					$zoomin.hide();
				}); 
			});
			
			pic.bind("mouseleave", function() 
			{ 
				var $zoomin = $("#"+$(this).attr("target"));
				$zoomin.hide();
				$(this).stop();
				$(this).animate({"width":"59px", "height":"50px", "position":"absolute", "z-index":pic_zindex}, 500, function ()
				{
					$zoomin.show();					
				}); 
			});
		});

		jQuery.each(cons_music_totals, function(i) 
		{
			// console.log("cons_music_totals: "+cons_music_totals +" cons: "+cons);
			cons_music.push({name:"aud"+cons_music_totals[i], cons:new audio({"dom":jQuery("#aud"+cons_music_totals[i]), "name":"aud"+cons_music_totals[i], "cons":cons })});
		});
	}
	
	function _events_music(obj)
	{ 
		sys.$tmusic.show();
		if (!sys.data.cache_music) 
		{
			_request_ajax({ "url":"https://raw.github.com/chenjieyang/audio_demo/master/web/df_music.json", "cache":"true", "target":"music" });
			sys.data.cache_music = true;
		}
	}
	
	function _check_music(obj)
	{
		jQuery.each(cons_music, function(i) 
		{
			if (obj != cons_music[i].name)
			{
				if (cons_music[i].cons.play_status())
				{
					cons_music[i].cons.pause();
				}
			}
		}); 
	}
	
	// sets resize setInterval to prevent double execution of event handlers on resized window				
	function _detect_resize()
	{
		if (!sys.data.i_resize_on)
		{						
			sys.data.i_resize_start = new Date().toString();				
			clearInterval(sys.data.i_resize);
			sys.data.i_resize = setInterval(_resize, 250);
		}
	}	

	function _request_ajax(p)
	{								
		p.dataType = (p.dataType == undefined) ? "json" : p.dataType;
		p.type = (p.type == undefined) ? "get" : p.type;
		p.async = (p.async == undefined) ? true : p.async;
		p.cache = (p.cache == undefined) ? false : p.cache; // default set to no caching 
		p.data = (p.data == undefined) ? "" : p.data; 
		
		p.target;  	// sets the target element		
		
		
		$.ajaxSetup(
		{
			timeout:0 // optional timeout *note (set to no timeout) 
		});
		console.log(p.url); 					 	
		$.ajax(
		{
			url: p.url,
			dataType:p.dataType,
			type:p.type,
			async:p.async,
			data:p.data,			
			cache:p.cache, 
			success:function(data) // using function prevents collision of single thread like event
			{	
				console.log("correct");
				_response_ajax(p.target, data);
			}, 			
			error:function(xhr, options, error, p)
			{	
				console.log("status "+xhr.status);
				// if (xhr.status == 200)
				// {
				//	_response_ajax(p.target, data);
				// }
				// else
				//{
					_request_ajax_error(xhr, options, error);
			}							
		});
	}
	
	function _response_ajax(target, data)
	{				
		// console.log("class.music() data length ["+data.length+"]")	
		var timestamp = new Date().getTime().toString();
		
		for (var i01 = 0; i01 < data.length; i01++)
		{
			var obj_summary = data[i01].summary;
			var obj_details = data[i01].details;
			var title_lookup = obj_summary.title.toLowerCase().replace(/ /gi, "_");
			
			// console.log("class.music() sum  ["+obj_summary+"]")	
			// console.log("class.music() details ["+obj_details+"]")	
			// console.log("class.music() title ["+title_lookup+"]")	
			var html = '';
			html += '<div id="'+timestamp+'" lookup="'+title_lookup+'">';
			html += '	<div class="row_label">';
			html += '		<div class="thumb"><img class="pic" border="0" src="'+sys.data.root + obj_summary.pic+'" target="zoom'+i01+'"><div id="zoom'+i01+'" class="zoomin" title="mouseover to zoom in">&nbsp;</div></div>';
			html += '		<div class="info">';
			html += '			<div class="title">';
			html += '				<div class="album">'+obj_summary.title+'</div>';		
			html += '				<div class="intro">'+obj_summary.type+' By '+obj_summary.author+'</div>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
			html += '	<div class="row_header">';
			html += '		<div class="song">Song</div>';
			html += '		<div class="spacer">&nbsp;</div>';
			html += '		<div class="listen">Listen</div>';;
			html += '	</div>';
			html += '	<div class="row_listing">';
			
			for (var i02 = 0; i02 < obj_details.length; i02++)
			{
				var html_feature = '';
			
				if (obj_details[i02].featuring != null)
				{
					// console.log("class.music() featuring ["+obj_details[i02].featuring+"]")	
					
					html_feature += ' <span>(featuring ';
					
					for (var i03 = 0; i03 < obj_details[i02].featuring.length; i03++)
					{
						var feature = obj_details[i02].featuring;
						
						if ((feature.length == 1) || ((i03 > 0) && (i03 == feature.length -1)))
						{
							html_feature += feature[i03];
						}
						else
						{
							html_feature += feature[i03] + ", ";
						}
					}
					html_feature += ')</span>';
				}
				
				// console.log("class.music() html feature ["+html_feature+"]");
				cons_music_i++;
				cons_music_totals.push(cons_music_i)
				
				// console.log("class.music() cons count ["+cons_music_i+"]");
				
				if (i02  == obj_details.length -1)
				{
					html += '	<div class="row last" id="aud'+cons_music_i+'">';
				}
				else
				{
					html += '	<div class="row" id="aud'+cons_music_i+'">';
				}	
				html += '		<div class="song">'+obj_details[i02].track+' - '+obj_details[i02].title+''+html_feature+'</div>';
				html += '		<div class="spacer">&nbsp;</div>';
				html += '		<audio class="audio" preload="auto"></audio>';
				html += '		<div class="speaker" track="'+sys.data.root + obj_details[i02].filename+'"></div>';
				html += '		<div class="listen">[<span class="playback">play</span>] <span class="length">'+obj_details[i02].time+'</span></div>';
				html += '	</div>';
			}
			html += '</div></div>';
			
			// console.log("class.music() final html ["+html+"]");
			sys.$data_music.append(html);
		}
		timestamp = $("#"+timestamp);
		timestamp.available({ "func":function() 
		{
			_events_musicplayer(sys.$data_music);
		}});
	}
	
	function _request_ajax_error(xhr, options, error)
	{
		switch(xhr.status)
		{
			case 301:
			{
				alert("301 redirect");				
			}
			break;
			case 303:
			{
				alert("303 redirect");				
			}
			break;
			case 400:
			{
				alert("400 bad request");				
			}
			break;
			case 403:
			{
				alert("403 forbidden");				
			}
			break;
			case 404:
			{				
				alert("404 not found");				
			}
			break;
			case 429:
			{
				alert("429 too many requests");				
			}
			break;
			case 500:
			{				
				alert("500 internal server error");				
			}
			break;
			case 0:
			{				
				alert("no json data loaded");				
			}
			default:
			{
				alert("default "+ xhr.status +" | "+ options +" | "+ error);				
			}	
			break;								
		}
	}		
};

// do not remove the bottom public functions
c_audio.prototype.check_music = function(p) 		{ this.__check_music(p);			 			};

