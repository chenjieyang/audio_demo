if (!audio) var audio = function(obj)
{
	//declare sys as object to hold all values globally
	var sys = new Object();
	sys.dom_cons = undefined;
	
	// dependancies go here i.e: aka var cons_videoplayer = new VideoPlayers(); 
	sys.comp_device = new device();	
	sys.device = sys.comp_device.detection();
	
	dom_check();
	fix_one();
	init();
	
	// do not remove, privilege methods =========================================================================
	this.__load = function(p)			{ return _load(p); 				};
	this.__play_status = function() 	{ return _play_status();		};
	this.__play = function() 			{ return _play(); 				};
	this.__pause = function() 			{ return _pause();				};

	function _load(p)
	{		
		sys.dom_res = new Object();
		var sys = new Object();
		sys.dom_j = jQuery;
		audio.error = false;
	}
	
	function _load_dependencies(p)
	{
		sys.dom_cons = p.cons;  
	};

	function fix_one()
	{	
		sys.dom_speakers_on = false;
		sys.dom_i_speakers_on = 0;
		sys.dom_speakers_on_data_trans = 100;
		sys.dom_speakers_on_cnt = 0;
		sys.dom_speakers_on_max = 8;
		
		sys.dom_data_ready = false;
		sys.dom_play_on = false;
		sys.dom_end_on = false;
		sys.dom_stop_on = false;
		
		sys.dom_autoplay_on = true;
		sys.dom_video_169_ratio = 16/9;	// System Var
		sys.dom_current_time = 0;
		sys.dom_duration = 0;
	}
	
	function dom_check()
	{
		if ((obj == undefined) || ((obj.id == undefined) && (obj.dom == undefined)))
		{
			alert(audio.product + " is missing an dom element or dom id reference which is required");
			audio.error = true;
		}
		else if ((obj.id != undefined) && (obj.dom == undefined))
		{
			sys.dom_dom = j(obj.id);
		}
		else if ((obj.id == undefined) && (obj.dom != undefined))
		{
			sys.dom_dom = obj.dom;
		}
		
		if (sys.dom_dom.length == 0)
		{
			alert(audio.product + " has an element or id that is not psys.dom_resent in the dom");
			audio.error = true;
		}
	}
			
	function init()
	{		
		doms();					// set dom elements
		content();			// set language to labels
		events();				// set events listeners 	
	}

	function _play_status()
	{
		return sys.dom_play_on;
	}
	
	function _play()
	{
		sys.dom_play_on = false;
		sys.dom_playback.trigger("click");
	}
	
	function _pause()
	{
		sys.dom_play_on = true;
		sys.dom_playback.trigger("click"); 
	}
	
	function doms()
	{		
		sys.dom_audio = sys.dom_dom.find(".audio");
		sys.dom_speaker = sys.dom_dom.find(".speaker");
		sys.dom_playback = sys.dom_dom.find(".playback");
		sys.dom_length = sys.dom_dom.find(".length");
	}
	
	function content()
	{				
		sys.dom_playback.attr("title", "Play Song");
		sys.dom_length.html("00:00:00");
		sys.dom_length.attr("title", "00:00:00");
	};
	
	function speakers_on_setup()
	{
		sys.dom_i_speakers_on = setInterval(speakers_on, sys.dom_speakers_on_data_trans);
	};
	
	function speakers_on()
	{
		if (sys.dom_speakers_on)
		{
			if (sys.dom_speaker.attr("class").indexOf("speaker_on") == -1)
			{
				sys.dom_speaker.addClass("speaker_on");
			}
			sys.dom_speaker.css({"backgroundPosition":"0px "+((sys.dom_speakers_on_cnt * -28).toString())+"px"});
			sys.dom_speakers_on_cnt++;
			if (sys.dom_speakers_on_cnt == sys.dom_speakers_on_max)
			{
				sys.dom_speakers_on_cnt = 0;
			}
		}
		else
		{
			if (sys.dom_speaker.attr("class").indexOf("speaker_on") != -1)
			{
				sys.dom_speaker.removeClass("speaker_on");
				sys.dom_speaker.css({"backgroundPosition":"0px 0px"});
			}
		}	
	}
	
	function events()
	{
		load();
		speakers_on_setup();
		sys.dom_audio.bind("error", error);
		sys.dom_audio.bind("loadedmetadata", meta);
		sys.dom_playback.bind("click", playback);		
	};
		
	function playback()
	{														
		if (sys.dom_play_on)
		{												
			sys.dom_play_on = false;
			
			sys.dom_playback.attr("title", "play");
			sys.dom_playback.text("play");
			sys.dom_speakers_on = false;
			sys.dom_audio[0].pause();	
		}
		else
		{					
			sys.dom_play_on = true;
			sys.dom_playback.attr("title", "pause");
			sys.dom_playback.text("pause");
			sys.dom_speakers_on = true;
			
			obj.cons.check_music(obj.name);
			sys.dom_audio[0].play();
		}				
	};
				
	function error()
	{
		switch(sys.dom_audio[0].error.code)
		{
			case 1:
			{
				alert("audio error [1 MEDIA_ERR_ABORTED - fetching process aborted by user]");
				// sys.dom_next.trigger("click");
			}
			break;
			case 2:
			{
				alert("audio error [2 MEDIA_ERR_NETWORK - error occurred when downloading]");
				// sys.dom_next.trigger("click");
			}
			break;
			case 3:
			{
				alert("audio error [3 MEDIA_ERR_DECODE - error occurred when decoding]");
				// sys.dom_next.trigger("click");
			}
			break;
			case 4:
			{
				//alert("video error [4 MEDIA_ERR_SRC_NOT_SUPPORTED - audio/video not supported]");
			}
			break;
		}
	};
	
	/*
	function ending()
	{							
		if (sys.dom_data_ready)
		{	
			sys.dom_stop_on = true;
			sys.dom_audio[0].stop();
		}
	};*/
	
	function meta()
	{
		sys.dom_duration = sys.dom_audio[0].duration;	
		sys.dom_duration = Math.floor(sys.dom_duration);	
		sys.dom_length.text(utils_time(sys.dom_duration));
	};
	
	function utils_time(seconds)
	{
		var Hr	= Math.floor(seconds/60/60);
		Hr = (Hr != 0) ? (Hr.toString() + ":") : "";
		var Min = Math.floor(Math.floor(seconds / 60) % 60);
		Min = (Hr == 0 && Min == 0) ? "" : (Hr == 0 && Min < 9) ? Min.toString() : (Hr != 0 && Min < 9) ? "0" + Min.toString() : (Min > 9) ? Min.toString() : "00";
		var Sec = Math.floor(seconds % 60);
		Sec	= (Sec < 10) ? "0" + Sec : Sec;	
		Sec = ":" + Sec.toString();			
		return Hr + Min + Sec;
	};
	
	function auto_start()
	{		
		if (sys.dom_data_ready)
		{
	  		if (sys.dom_autoplay_on)
	  		{
	  			sys.dom_playback.trigger("click");
	  		}
		}
	};
	
	function load()
	{
		var ts = new Date().getTime();

		sys.dom_audio.attr("preload", "metadata");
		
		switch(sys.device.browser)
		{
			case "ff":
			{
				sys.dom_audio.attr("src", sys.dom_speaker.attr('track')+".ogg?"+ts);
				sys.dom_audio.attr("type", "audio/ogg");
			} 
			break;
			case "ie":
			{
				sys.dom_audio.attr("src", sys.dom_speaker.attr('track')+".mp3?"+ts);
				sys.dom_audio.attr("type", "audio/mpeg");
			}
			break;
			case "safari":
			{
				sys.dom_audio.attr("src", sys.dom_speaker.attr('track')+".mp3?"+ts);
				sys.dom_audio.attr("type", "audio/mpeg");
			} 
			break;
		}	
		
		sys.dom_audio[0].load();
		sys.dom_end_on = false;
		
		if (sys.dom_play_on) 
		{									
			sys.dom_audio[0].play();
		}		
	};
};

// do not remove the bottom public functions =================================================================
audio.prototype.load = function(p) 						  { return this.__load(p); 						    };
audio.prototype.play_status = function() 				{ if (!audio.error) { return this.__play_status(); 	}};
audio.prototype.play = function() 							{ if (!audio.error) { return this.__play(); 				}};
audio.prototype.pause = function()							{ if (!audio.error) { return this.__pause(); 				}};