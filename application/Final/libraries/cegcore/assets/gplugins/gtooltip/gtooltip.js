jQuery.gtooltip = {
	'tipclass' : 'gtooltip',
	'awaytime': 800,
	'ontime': 0,
	'ajax': 0,
	'ajax_cache': {},
	'ajaxloading': 'Loading....',
	'append': 'after',
	'position':'top',
	'closable':0,
	'on_close':'hide',
	'tid':'',
	'content':'',
	'trigger':'hover',
	'resetOnShow':false,
	'createOnShow':false,
	'onClose':null,
	'onShow':null,
	'spacing':3,
	'arrow_size':7,
	'css':{
		'background-color':'#000',
		'border-color':'#000',
		'border-radius':'4px',
		'padding':'8px',
		'color':'#fff',
		'font-size':'12px',
		'max-width':'200px',
		'text-align':'center',
	},
};

(function($){
	$.fn.gtooltip = function(options, params){
		if(this.length > 0){
			if($.type(params) === 'undefined' && $.type(options) === 'object'){
				params = options;
			}
			
			if($.type(options) === 'undefined' || $.type(options) === 'object'){
				params = $.extend(true, {}, $.gtooltip, params);
				
				var prefix = '';
				if(params.tid){
					prefix = '-'+params.tid;
				}
				
				return this.each(function(){
					if(!$(this).data('gtooltip'+prefix)){
						$(this).data('gtooltip'+prefix, new GTooltip(this, params));
					}
				});
			}
			
			if($.type(options) === 'string'){
				params = $.extend(true, {}, $.gtooltip, params);
				
				var prefix = '';
				if(params.tid){
					prefix = '-'+params.tid;
				}
				
				var tip = $(this).data('gtooltip'+prefix);
				if(typeof tip == 'undefined'){
					return null;
				}
				
				switch (options){
					case 'show':
						return tip.show();
					case 'hide':
						return tip.hide();
					case 'destroy':
						return tip.destroy();
					case 'reset':
						return tip.reset();
					case 'get':
						return tip.get();
				}
			}
		}
	}
	
	var GTooltip = function(elem, params){
		this.element = elem;
		this.settings = params;
		
		this.shown = false;
		this.hidden = false;
		
		this.init();
	};
	
	GTooltip.prototype = {
		init: function(){
			var tip = this;
			tip.create();
			if(!tip.settings.createOnShow){
				tip.create();
			}
			if(tip.settings.trigger == 'hover'){
				tip._hover();
			}else if(tip.settings.trigger == 'click'){
				tip._click();
			}
		},
		
		get: function(){
			var tip = this;
			return tip;
		},
		
		destroy: function(){
			var tip = this;
			tip.tip.remove();
			
			var prefix = '';
			if(tip.settings.tid){
				prefix = '-'+tip.settings.tid;
			}
			$(tip.element).removeData('gtooltip'+prefix);
			return true;
		},
		
		_click: function(){
			var tip = this;
			$(tip.element).on('click', function(){
				if(tip.shown){
					tip.hide();
				}else{
					tip.show();
				}
			});
		},
		
		_hover: function(){
			var tip = this;
			$(tip.element).on('mouseover', function(){
				clearTimeout(tip.awaytime);
				//$this.gtooltip('show');
				var ontime_timeout = setTimeout(function(){
					tip.show();
					tip.tip.on('mouseover', function(){
						clearTimeout(tip.awaytime);
					});
					tip.tip.on('mouseleave', function(){
						var awaytime_timeout = setTimeout(function(){
							tip.hide();
						}, tip.settings.awaytime);
						tip.awaytime = awaytime_timeout;
					});
				}, tip.settings.ontime);
				tip.ontime = ontime_timeout;
			});
			$(tip.element).on('mouseleave', function(){
				clearTimeout(tip.ontime);
				var awaytime_timeout = setTimeout(function(){
					tip.hide();
				}, tip.settings.awaytime);
				tip.awaytime = awaytime_timeout;
			});
		},
		
		show: function(){
			var tip = this;
			if(tip.settings.resetOnShow || tip.settings.createOnShow){
				tip.reset();
			}
			if($.isFunction(tip.settings.onShow)){
				tip.settings.onShow.call(this, tip);
			}
			//check ajax data
			if(tip.settings.ajax){
				if($.type($(tip.element).data('ajax')) !== 'undefined'){
					if($.type(tip.ajax_result) === 'undefined'){
						$(tip.element).data('content', tip.settings.ajaxloading);
						tip.reset();
						tip._show();
						$.ajax({
							"type" : "GET",
							"url" : $(tip.element).data('ajax'),
							"cache" : true,
							"success" : function(res){
								$(tip.element).data('content', res);
								tip.reset();
								tip._show();
								tip.ajax_result = res;
							},
						});
					}
				}
			}
			tip._show();
			tip.shown = true;
			tip.hidden = false;
			return true;
		},
		
		_show: function(){
			var tip = this;
			tip.tip.show();
		},
		
		hide: function(){
			var tip = this;
			tip.tip.hide();
			tip.hidden = true;
			tip.shown = false;
			return true;
		},
		
		reset: function(){
			var tip = this;
			//tip.destroy();
			if($.type(tip.tip) !== 'undefined' && $.contains(document, tip.tip[0])){
				tip.tip.remove();
			}
			tip.create();
			return true;
		},
		
		create: function(){
			var tip = this;
			if($.type(tip.tip) !== 'undefined' && $.contains(document, tip.tip[0])){
				//tip already exists and we don't need to create a new one
				return;
			}
			
			var tip_content = $(tip.element).prop('title');
			
			if(tip.settings.content){
				tip_content = tip.settings.content;
			}else{
				if($(tip.element).data('content')){
					tip_content = $(tip.element).data('content');
				}else{
					$(tip.element).data('content', $(tip.element).prop('title'));
					$(tip.element).prop('title', '');
				}
			}
			if(tip.settings.closable){
				var $close_button = '<div class="gtooltip-close">&times;</div>';
			}else{
				var $close_button = '';	
			}
			var $tip = $('<div class="'+tip.settings.tipclass+'" tid="'+tip.settings.tid+'">'+$close_button+'<div class="gtooltip-content">'+'</div><div class="gtooltip-arrow-border gtooltip-arrow-border-'+tip.settings.position+'"></div><div class="gtooltip-arrow gtooltip-arrow-'+tip.settings.position+'"></div></div>');
			$tip.find('.gtooltip-content').append(tip_content);
			//apply css
			/*$tip.css({
				'background-color': tip.settings.css['background-color'], 
				'border-color': tip.settings.css['border-color'], 
				'color': tip.settings.css['color'], 
				'border-radius': tip.settings.css['border-radius'], 
				'padding': tip.settings.css.padding,
				'font-size': tip.settings.css['font-size'],
				'max-width': tip.settings.css['max-width'],
			});*/
			$tip.css(tip.settings.css);
			var arrow_css = {};
			arrow_css['border-'+tip.settings.position+'-color'] = tip.settings.css['background-color'];
			$tip.find('.gtooltip-arrow').css(arrow_css);
			var arrow_border_css = {};
			arrow_border_css['border-'+tip.settings.position+'-color'] = tip.settings.css['border-color'];
			$tip.find('.gtooltip-arrow-border').css(arrow_border_css);
			
			$tip.find('.gtooltip-arrow, .gtooltip-arrow-border').css('border-width', tip.settings.arrow_size+'px');
			//calculate position
			var $offset = $(tip.element).offset();
			var $position = $(tip.element).position();
			if($(tip.element).data('target')){
				var $offset = $(tip.element).data('target').offset();
				var $position = $(tip.element).data('target').position();
			}
			var $location;
			if(tip.settings.append == 'after'){
				$(tip.element).after($tip);
				$location = $position;
			}else if(tip.settings.append == 'body'){
				$('body').append($tip);
				$location = $offset;
			}
			if(tip.settings.position == 'top'){
				var $top = $location.top - $tip.outerHeight() - $tip.find('.gtooltip-arrow').outerHeight() - tip.settings.spacing;
				var $left = $location.left + $(tip.element).outerWidth()/2 - $tip.outerWidth()/2;
				
				$tip.find('.gtooltip-arrow-border').css('left', $tip.outerWidth()/2 - $tip.find('.gtooltip-arrow-border').outerWidth()/2);
				$tip.find('.gtooltip-arrow').css('left', $tip.outerWidth()/2 - $tip.find('.gtooltip-arrow').outerWidth()/2);
				
				$tip.find('.gtooltip-arrow, .gtooltip-arrow-border').css('border-bottom-width', '0px');
				$tip.find('.gtooltip-arrow').css('bottom', -1 * (tip.settings.arrow_size - 1) + 'px');
				$tip.find('.gtooltip-arrow-border').css('bottom', -1 * (tip.settings.arrow_size + 1) + 'px');
			}else if(tip.settings.position == 'bottom'){
				var $top = $location.top + $(tip.element).outerHeight() + $tip.find('.gtooltip-arrow').outerHeight() + tip.settings.spacing;
				var $left = $location.left + $(tip.element).outerWidth()/2 - $tip.outerWidth()/2;
				
				$tip.find('.gtooltip-arrow-border').css('left', $tip.outerWidth()/2 - $tip.find('.gtooltip-arrow-border').outerWidth()/2);
				$tip.find('.gtooltip-arrow').css('left', $tip.outerWidth()/2 - $tip.find('.gtooltip-arrow').outerWidth()/2);
				
				$tip.find('.gtooltip-arrow, .gtooltip-arrow-border').css('border-top-width', '0px');
				$tip.find('.gtooltip-arrow').css('top', -1 * (tip.settings.arrow_size - 1) + 'px');
				$tip.find('.gtooltip-arrow-border').css('top', -1 * (tip.settings.arrow_size + 1) + 'px');
			}else if(tip.settings.position == 'right'){
				var $top = $location.top + $(tip.element).outerHeight()/2 - $tip.outerHeight()/2;
				var $left = $location.left + $(tip.element).outerWidth() + $tip.find('.gtooltip-arrow').outerWidth() + tip.settings.spacing;
				
				$tip.find('.gtooltip-arrow-border').css('top', $tip.outerHeight()/2 - $tip.find('.gtooltip-arrow-border').outerHeight()/2);
				$tip.find('.gtooltip-arrow').css('top', $tip.outerHeight()/2 - $tip.find('.gtooltip-arrow').outerHeight()/2);
				
				$tip.find('.gtooltip-arrow, .gtooltip-arrow-border').css('border-left-width', '0px');
				$tip.find('.gtooltip-arrow').css('left', -1 * (tip.settings.arrow_size - 1) + 'px');
				$tip.find('.gtooltip-arrow-border').css('left', -1 * (tip.settings.arrow_size + 1) + 'px');
			}else if(tip.settings.position == 'left'){
				var $top = $location.top + $(tip.element).outerHeight()/2 - $tip.outerHeight()/2;
				var $left = $location.left - $tip.outerWidth() - $tip.find('.gtooltip-arrow').outerWidth() - tip.settings.spacing;
				
				$tip.find('.gtooltip-arrow-border').css('top', $tip.outerHeight()/2 - $tip.find('.gtooltip-arrow-border').outerHeight()/2);
				$tip.find('.gtooltip-arrow').css('top', $tip.outerHeight()/2 - $tip.find('.gtooltip-arrow').outerHeight()/2);
				
				$tip.find('.gtooltip-arrow, .gtooltip-arrow-border').css('border-right-width', '0px');
				$tip.find('.gtooltip-arrow').css('right', -1 * (tip.settings.arrow_size - 1) + 'px');
				$tip.find('.gtooltip-arrow-border').css('right', -1 * (tip.settings.arrow_size + 1) + 'px');
			}
			$tip.css('top', $top);
			//$tip.css('left', $(tip.element).outerWidth()/2 - 30 - 10); //element width - tooltip arrow left shift - arrow's border width
			$tip.css('left', $left);
			$tip.hide();
			tip.tip = $tip;
			
			$tip.find('.gtooltip-close').on('click', function(){
				if($.isFunction(tip.settings.onClose)){
					tip.settings.onClose.call(this);
				}
				if(tip.settings.on_close == 'hide'){
					tip.hide();
				}else if(tip.settings.on_close == 'destroy'){
					tip.destroy();
				}
			});
			return true;
		},
	};
}(jQuery));