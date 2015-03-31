jQuery.gtabs = {
	'pane_selector':'.pane',
	'tab_selector':'.tab',
	'active_pane_class':'active',
	'active_tab_class':'active',
};

(function($){
	$.fn.gtabs = function(options, params){
		if(this.length > 0){
			if($.type(params) === 'undefined' && $.type(options) === 'object'){
				params = options;
			}
			
			if($.type(options) === 'undefined' || $.type(options) === 'object'){
				params = $.extend(true, {}, $.gtabs, params);
				return this.each(function(){
					if(!$(this).data('gtabs')){
						$(this).data('gtabs', new GTabs(this, params));
					}
				});
			}
			
			if($.type(options) === 'string'){
				params = $.extend(true, {}, $.gtabs, params);
				
				var tabs = $(this).data('gtabs');
				
				switch (options){
					case 'open':
						return tabs.open();
					case 'close':
						return tabs.close();
					case 'get':
						return tabs.get();
				}
			}
		}
	}
	
	var GTabs = function(elem, params){
		this.element = elem;
		this.settings = params;
		
		this.init();
	};
	
	GTabs.prototype = {
		init: function(){
			var tabs = this;
			//hide pans without the active class
			$(tabs.settings.pane_selector).not('.'+tabs.settings.active_pane_class).hide();
			
			$(tabs.element).children('li').each(function(){
				var $li = $(this);
				$li.find('a'+tabs.settings.tab_selector).on('click', function(e){
					var $a = $(this);
					e.preventDefault();
					//activate tab
					$(tabs.element).children('li').removeClass(tabs.settings.active_tab_class);
					$li.addClass(tabs.settings.active_tab_class);
					//activate pane
					$(tabs.settings.pane_selector + $a.attr('href')).parent().children(tabs.settings.pane_selector).hide();
					$(tabs.settings.pane_selector + $a.attr('href')).parent().children(tabs.settings.pane_selector).removeClass(tabs.settings.active_pane_class);
					$(tabs.settings.pane_selector + $a.attr('href')).show();
					$(tabs.settings.pane_selector + $a.attr('href')).addClass(tabs.settings.active_pane_class);
				});
			});
		},
		
	};
}(jQuery));