jQuery.gdatetimepicker = {
	display_month: function (picker_id, year, month, day){
		var the_month = new Date();
		if(typeof day == 'undefined'){
			the_month.setUTCFullYear(year, month, 1);
		}else{
			the_month.setUTCFullYear(year, month, day);
		}
		var days_header = this.build_days_header(picker_id, the_month);
		var days_list = this.build_days_panel(picker_id, the_month);
		return days_header + days_list;
	},
	
	display_year: function (picker_id, year, month){
		var the_year = new Date();
		if(typeof month == 'undefined'){
			the_year.setUTCFullYear(year, 0);
		}else{
			the_year.setUTCFullYear(year, month);
		}
		var months_header = this.build_months_header(picker_id, the_year);
		var months_list = this.build_months_panel(picker_id, the_year);
		return months_header + months_list;
	},
	
	display_decade: function (picker_id, year){
		var the_decade = new Date();
		if(typeof year == 'undefined'){
			//the_decade.setUTCFullYear(year, 1);
		}else{
			the_decade.setUTCFullYear(year);
		}
		var years_header = this.build_years_header(picker_id, the_decade);
		var years_list = this.build_years_panel(picker_id, the_decade);
		return years_header + years_list;
	},
	
	get_first_day: function (year, month){
		var the_day = new Date(year, month, 1, 0, 1, 0);
		var offset = the_day.getTimezoneOffset();
		return the_day.getDay();
		/*if(offset >= 0){
			return the_day.getUTCDay() - 1;
		}else{
			return the_day.getUTCDay();
		}*/
	},
	get_month_length: function (year, month){
		var next_month = new Date(year, month + 1, 1);
		next_month.setUTCHours(next_month.getUTCHours() - 13);
		return next_month.getUTCDate();
	},
	build_years_header: function (picker_id, current_date){
		var years_header = '';
		var current_year = current_date.getUTCFullYear();
		var decade_start = Math.floor(current_year/10) * 10;
		var decade_end = decade_start + 20;
		years_header = years_header  + '<div class="gcore-years-header">';

		years_header = years_header  + '<span class="date-nav-item date-nav-left switch_decade" data-year="'+(decade_start - 11)+'">&lsaquo;</span>';
		years_header = years_header  + '<span class="date-nav-item date-select">'+ decade_start + '-' + (decade_end - 1) +'</span>';

		years_header = years_header  + '<span class="date-nav-item date-nav-right switch_decade" data-year="'+(decade_end - 1)+'">&rsaquo;</span>';
		years_header = years_header + '</div>';
		return years_header;
	},
	build_years_panel: function (picker_id, current_date){
		var years_list = '';
		years_list = years_list  + '<div class="gcore-years-picker">';
		var years_rows = [1,2,3,4];
		var current_year = current_date.getUTCFullYear();
		var decade_start = Math.floor(current_year/10) * 10;
		var decade_end = decade_start + 20;
		jQuery.each(years_rows, function(i, row){
			var row_start = decade_start + (i * 5);
			years_list = years_list  + '<div class="years-row">';
			for(var year = row_start; year <= decade_end; year++){
				var active_class = '';
				if(current_date.getUTCFullYear() == year){
					active_class = ' active_date';
				}
				if((year - decade_start) < 5 * row){
					years_list = years_list  + '<div class="year-item selectable_date switch_year'+ active_class +'" data-year="'+year+'">' + year + '</div>';
				}
			}
			years_list = years_list + '</div>';
		});
		years_list = years_list + '</div>';
		return years_list;
	},
	build_months_header: function (picker_id, current_date){
		var months_header = '';
		months_header = months_header  + '<div class="gcore-months-header">';

		months_header = months_header  + '<span class="date-nav-item date-nav-left switch_year" data-year="'+(current_date.getUTCFullYear() - 1)+'">&lsaquo;</span>';
		months_header = months_header  + '<span class="date-nav-item date-select switch_decade" data-year="'+(current_date.getUTCFullYear())+'">'+ current_date.getUTCFullYear() +'</span>';

		months_header = months_header  + '<span class="date-nav-item date-nav-right switch_year" data-year="'+(current_date.getUTCFullYear() + 1)+'">&rsaquo;</span>';
		months_header = months_header + '</div>';
		return months_header;
	},
	build_months_panel: function (picker_id, current_date){
		var shortMonths = picker_id.data('shortmonths') ? picker_id.data('shortmonths') : this.shortMonths;
		var months_list = '';
		months_list = months_list  + '<div class="gcore-months-picker">';
		var months_rows = [1,2,3,4];
		jQuery.each(months_rows, function(i, row){
			months_list = months_list  + '<div class="months-row">';
			jQuery.each(shortMonths, function(k, month){
				var active_class = '';
				if(current_date.getUTCMonth() == k){
					active_class = ' active_date';
				}
				if(k < row * (months_rows.length - 1) && k >= (row - 1) * (months_rows.length - 1)){
					months_list = months_list  + '<div class="month-item switch_month selectable_date'+ active_class +'" data-year="'+current_date.getUTCFullYear()+'" data-month="'+k+'">' + month + '</div>';
				}
			});
			months_list = months_list + '</div>';
		});
		months_list = months_list + '</div>';
		return months_list;
	},
	build_days_header: function (picker_id, current_date){
		var shortMonths = picker_id.data('shortmonths') ? picker_id.data('shortmonths') : this.shortMonths;
		var days_header = '';
		days_header = days_header  + '<div class="gcore-days-header">';
		var prev_month = new Date();
		prev_month.setUTCFullYear(current_date.getUTCFullYear(), current_date.getUTCMonth() - 1, 1);
		days_header = days_header  + '<span class="date-nav-item date-nav-left switch_month" data-year="'+prev_month.getUTCFullYear()+'" data-month="'+prev_month.getUTCMonth()+'">&lsaquo;</span>';
		days_header = days_header  + '<span class="date-nav-item date-select select_month" data-year="'+current_date.getUTCFullYear()+'" data-month="'+current_date.getUTCMonth()+'">'+ shortMonths[current_date.getUTCMonth()] + ' ' + current_date.getUTCFullYear() +'</span>';
		var next_month = new Date();
		next_month.setUTCFullYear(current_date.getUTCFullYear(), current_date.getUTCMonth() + 1, 1);
		days_header = days_header  + '<span class="date-nav-item date-nav-right switch_month" data-year="'+next_month.getUTCFullYear()+'" data-month="'+next_month.getUTCMonth()+'">&rsaquo;</span>';
		days_header = days_header + '</div>';
		return days_header;
	},
	build_days_panel: function (picker_id, current_date){
		var shortDays = picker_id.data('shortdays') ? picker_id.data('shortdays') : this.shortDays;
		var shortDaysIndexes = picker_id.data('shortdays_indexes') ? picker_id.data('shortdays_indexes') : this.shortDaysIndexes;
		var days_list = '';
		days_list = days_list  + '<div class="gcore-days-picker">';
		var days_rows = [1,2,3,4,5,6,7];
		var first_day = this.get_first_day(current_date.getUTCFullYear(), current_date.getUTCMonth());

		var month_length = this.get_month_length(current_date.getUTCFullYear(), current_date.getUTCMonth());
		var days_counter = 1;
		var next_days_counter = 1;
		var prev_days_counter = this.get_month_length(current_date.getUTCFullYear(), current_date.getUTCMonth() - 1) - first_day + 1;
		jQuery.each(days_rows, function(i, row){
			days_list = days_list  + '<div class="days-row">';
			jQuery.each(shortDaysIndexes, function(ik, k){
				//k = parseInt(k.toString().replace('d', ''));
				var day = shortDays[k];
				if(i == 0){
					days_list = days_list  + '<div class="day-title">' + day + '</div>';
				}else{
					var active_class = '';
					if(current_date.getUTCDate() == days_counter){
						active_class = ' active_date';
					}
					if(i == 1){
						if(k >= first_day || days_counter > 1){
							var this_date = new Date();
							this_date.setUTCFullYear(current_date.getUTCFullYear(), current_date.getUTCMonth(), days_counter);
							var selecting_class = ' selectable_date' + active_class;
							var date_data = ' data-time="'+this_date.valueOf()+'"';
							
							if(picker_id.data('start_date')){
								var start_date = new Date();
								var format = picker_id.data('format') ? picker_id.data('format') : this.format;
								var parsed_start_date = start_date.parse_date(picker_id.data('start_date'), format);
								start_date.setUTCFullYear(parsed_start_date.Y, parsed_start_date.m - 1, parsed_start_date.d);
								if(start_date > this_date){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							if(picker_id.data('end_date')){
								var end_date = new Date();
								var format = picker_id.data('format') ? picker_id.data('format') : this.format;
								var parsed_end_date = end_date.parse_date(picker_id.data('end_date'), format);
								end_date.setUTCFullYear(parsed_end_date.Y, parsed_end_date.m - 1, parsed_end_date.d);
								if(end_date < this_date){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							if(picker_id.data('open_days')){
								if(jQuery.inArray(this_date.getDay(), picker_id.data('open_days')) == -1){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							days_list = days_list  + '<div class="day-item'+ selecting_class +'"' + date_data + '>' + days_counter + '</div>';
							days_counter = days_counter + 1;
						}else{
							//add last month days
							days_list = days_list  + '<div class="day-item disabled_date">' + prev_days_counter + '</div>';
							prev_days_counter = prev_days_counter + 1;
						}
					}else{
						if(days_counter > month_length){
							days_list = days_list  + '<div class="day-item disabled_date">' + next_days_counter + '</div>';
							next_days_counter = next_days_counter + 1;
						}else{
							var this_date = new Date();
							this_date.setUTCFullYear(current_date.getUTCFullYear(), current_date.getUTCMonth(), days_counter);
							var selecting_class = ' selectable_date' + active_class;
							var date_data = ' data-time="'+this_date.valueOf()+'"';
							
							if(picker_id.data('start_date')){
								var start_date = new Date();
								var format = picker_id.data('format') ? picker_id.data('format') : this.format;
								var parsed_start_date = start_date.parse_date(picker_id.data('start_date'), format);
								start_date.setUTCFullYear(parsed_start_date.Y, parsed_start_date.m - 1, parsed_start_date.d);
								if(start_date > this_date){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							if(picker_id.data('end_date')){
								var end_date = new Date();
								var format = picker_id.data('format') ? picker_id.data('format') : this.format;
								var parsed_end_date = end_date.parse_date(picker_id.data('end_date'), format);
								end_date.setUTCFullYear(parsed_end_date.Y, parsed_end_date.m - 1, parsed_end_date.d);
								if(end_date < this_date){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							if(picker_id.data('open_days')){
								if(jQuery.inArray(this_date.getDay(), picker_id.data('open_days')) == -1){
									selecting_class = ' disabled_date';
									date_data = '';
								}
							}
							
							days_list = days_list  + '<div class="day-item'+ selecting_class +'"' + date_data + '>' + days_counter + '</div>';
							days_counter = days_counter + 1;
						}
					}
				}
			});
			days_list = days_list + '</div>';
		});
		days_list = days_list + '</div>';
		return days_list;
	},
	fix_number2: function(num){
		return ((num < 10) ? '0' : '') + num;
	},
	format: 'd-m-Y',
	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	//shortDays: {'d1':'Mo', 'd2':'Tu', 'd3':'We', 'd4':'Th', 'd5':'Fr', 'd6':'Sa', 'd0':'Su'},
	shortDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	shortDaysIndexes: [0, 1, 2, 3, 4, 5, 6],
	longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

(function($){
	Date.prototype.format_date = function(format_string){
		var chars = {
			'Y': this.getUTCFullYear(),
			'm': $.gdatetimepicker.fix_number2(this.getUTCMonth() + 1),
			'd': $.gdatetimepicker.fix_number2(this.getUTCDate()),
		};
		jQuery.each(chars, function(char, val){
			format_string = format_string.replace(char, val);
		});
		return format_string;
	}
		
	Date.prototype.parse_date = function(date, format_string){
		var formats = {
			'Ymd': /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
			'Y-m-d': /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
			'm-d-Y': /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(\d{4})$/,
			'm/d/Y': /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/,
			'd-m-Y': /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(\d{4})$/,
			'd.m.Y': /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/,
			'd/m/Y': /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/,
		};
		var order = {
			'Ymd': ['Y', 'm', 'd'],
			'Y-m-d': ['Y', 'm', 'd'],
			'm-d-Y': ['m', 'd', 'Y'],
			'm/d/Y': ['m', 'd', 'Y'],
			'd-m-Y': ['d', 'm', 'Y'],
			'd.m.Y': ['d', 'm', 'Y'],
			'd/m/Y': ['d', 'm', 'Y'],
		};
		if(!format_string){
			return [];
		}
		var result = {};
		if(parsed = date.match(formats[format_string])){
			jQuery.each(parsed, function(i, val){
				if(i){
					result[order[format_string][i - 1]] = val;
				}
			});
		}
		return result;
	}

	$.fn.gdatetimepicker = function(options, params){
		if(this.length > 0){
			if($.type(params) === 'undefined' && $.type(options) === 'object'){
				params = options;
			}
			
			if($.type(options) === 'undefined' || $.type(options) === 'object'){
				params = $.extend(true, {}, $.gdatetimepicker, params);
				return this.each(function(){
					if(!$(this).data('gdatetimepicker') || $.type($(this).data('gdatetimepicker')) != 'object'){
						$(this).data('gdatetimepicker', new GDatetimepicker(this, params));
					}
				});
			}
			
			if($.type(options) === 'string'){
				params = $.extend(true, {}, $.gdatetimepicker, params);
				
				var picker = $(this).data('gdatetimepicker');
				
				switch (options){
					case 'open':
						return picker.show();
					case 'hide':
						return picker.open();
					case 'destroy':
						return picker.destroy();
					case 'get':
						return picker.get();
				}
			}
		}
	}
	
	var GDatetimepicker = function(elem, params){
		this.element = elem;
		this.settings = params;
		
		this.init();
	};
	
	GDatetimepicker.prototype = {
		init: function(){
			var picker = this;
			$(picker.element).on('focus', function(event){
				var the_month = new Date();
				var parsed_date = {'Y':the_month.getUTCFullYear(), 'm':the_month.getUTCMonth() + 1, 'd':the_month.getUTCDate()};
				if($(picker.element).val()){
					var date = new Date();
					var format = $(picker.element).data('format') ? $(picker.element).data('format') : $.gdatetimepicker.format;
					var parsed_date = date.parse_date($(picker.element).val(), format);
				}
				
				if($(picker.element).data('start_view')){
					if($(picker.element).data('start_view') == 'y'){
						var start_view = $.gdatetimepicker.display_decade($(picker.element), parsed_date.Y, parsed_date.m - 1, parsed_date.d);
					}else if($(picker.element).data('start_view') == 'm'){
						var start_view = $.gdatetimepicker.display_year($(picker.element), parsed_date.Y, parsed_date.m - 1, parsed_date.d);
					}else{
						var start_view = $.gdatetimepicker.display_month($(picker.element), parsed_date.Y, parsed_date.m - 1, parsed_date.d);
					}
				}else{
					var start_view = $.gdatetimepicker.display_month($(picker.element), parsed_date.Y, parsed_date.m - 1, parsed_date.d);
				}
				picker.create(start_view);
			});
			$(picker.element).on('keypress', function(){
				return false;
			});
		},
		
		open: function(contents){
			var picker = this;
			$(picker.element).data('content', contents);
			$(picker.element).gtooltip({'tipclass':'gtooltip gdatetimepicker-panel', 'tid':'dp', 'trigger':'manual', 'closable': 1, 'on_close': 'destroy'});
			$(picker.element).gtooltip('show', {'tid':'dp'});
		},

		hide: function(){
			var picker = this;
			$(picker.element).gtooltip('destroy', {'tid':'dp'});
		},
		
		create: function(contents){
			var picker = this;
			picker.open(contents);
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.day-item.selectable_date').on('click', function(){
				var date = new Date($(this).data('time'));
				var format = $(picker.element).data('format') ? $(picker.element).data('format') : $.gdatetimepicker.format;
				$(picker.element).val(date.format_date(format));
				$(picker.element).trigger('change');
				
				if($(picker.element).data('on_date_selected')){
					var on_date_selected = $(picker.element).data('on_date_selected');
					if(on_date_selected in window){
						window[on_date_selected]($(picker.element));
					}
				}
				picker.hide();
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.date-nav-item.switch_month').on('click', function(){
				var month_data = $.gdatetimepicker.display_month($(picker.element), $(this).data('year'), $(this).data('month'));
				picker.hide();
				picker.create(month_data);
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.date-nav-item.select_month').on('click', function(){
				var year_data = $.gdatetimepicker.display_year($(picker.element), $(this).data('year'), $(this).data('month'));
				picker.hide();
				picker.create(year_data);
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.month-item.switch_month').on('click', function(){
				var month_data = $.gdatetimepicker.display_month($(picker.element), $(this).data('year'), $(this).data('month'));
				picker.hide();
				picker.create(month_data);
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.date-nav-item.switch_year').on('click', function(){
				var year_data = $.gdatetimepicker.display_year($(picker.element), $(this).data('year'));
				picker.hide();
				picker.create(year_data);
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.date-nav-item.switch_decade').on('click', function(){
				var decade_data = $.gdatetimepicker.display_decade($(picker.element), $(this).data('year'));
				picker.hide();
				picker.create(decade_data);
			});
			
			$(picker.element).gtooltip('get', {'tid':'dp'}).tip.find('.year-item.switch_year').on('click', function(){
				var year_data = $.gdatetimepicker.display_year($(picker.element), $(this).data('year'));
				picker.hide();
				picker.create(year_data);
			});
		},
		
	}

}(jQuery));