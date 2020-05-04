/// <reference path="typings/jquery.d.ts" />

class Navigation {
	navItem;
	categoryItem;
	constructor() {
		this.navItem = $('.side-navigation li');
		this.categoryItem = $('.category-navigation li');
		this.activeItem(this.navItem);
		this.activeItem(this.categoryItem);
	}
	
	activeItem(elem) {
		elem.click((event) => {
			event.preventDefault();
			elem.removeClass("active");
			$(event.currentTarget).addClass("active");
			
			var url = $('a', $(event.currentTarget)).attr("data-url");
			this.fireAjax(url);
		});
	}

	fireAjax(url) {
		var main = $('.wrapper');

		$.ajax({
			url: url,
			type: "GET",
			beforeSend: () => {
				this.startLoader();
			},
			success: () => {
				setTimeout(()=> {
					this.destroyLoader();
				}, 5000);
			}
		})
	}

	startLoader() {
		$('.wrapper').addClass("loading").append('<div class="loader"></div>');
	}

	destroyLoader() {	
		$('.wrapper').removeClass("loading");
		$('.spinner').remove();
	}
}
class Tabs {
	tab;
	constructor() {
		this.tab = $('.card .tabs li');
		this.changeTab();
	}
	
	changeTab() {
		this.tab.click((event) => {
			var tab = $(event.currentTarget);
			var tabId = tab.attr("data-tab");
			tab.addClass("active");
			tab.siblings().removeClass("active");
			
			$('.card .content[data-content='+tabId+']').siblings().removeClass("visible");
			$('.card .content[data-content='+tabId+']').addClass("visible");
		});
	}
}
class Collapse {
	constructor() {
		this.collapse();
	}
	collapse() {
		$('.hidden-content').slideUp("fast");
		$('.show-more').click((event) => {
			var target = $(event.currentTarget),	 
				 less = target.attr("data-less"),
				 more = target.attr("data-more");
			
			if (target.hasClass("active")) {
				target.removeClass("active")
				$('span', target).text(more);
				$('.fa', target).removeClass().addClass("fa fa-chevron-down");
				target.prev('.hidden-content').slideUp(250);
			} else {
				target.addClass("active");
				$('span', target).text(less);
				$('.fa', target).removeClass().addClass("fa fa-chevron-up");
				target.prev('.hidden-content').slideDown(250);
			}
		});
	}
}
class Graphs {
	graph: JQuery;
	constructor() {
		this.graph = $('.graph');
		this.setGraphValue();
	}

	setGraphValue() {
		this.graph.each((i, element)=> {
			var graph: JQuery = $(element),
				// margin to correct the card graphs when there is a 100% value
				margin: number = graph.parents('.experience-graphs').length ? 0 : 13,
				bar: JQuery = $('.bar', graph),
				barText: string = graph.attr("data-text"),
				value: JQuery = $('.value', graph),
				parentHeight: number = graph.parent().innerHeight() - margin,
				barValue: number = parseInt(graph.attr("data-value")),
				barHeight: number = parentHeight * (barValue / 100);

			bar.text(barText);
			value.css({
				height: barHeight + "px"
			});
			bar.css({
				bottom: (barHeight - 1) + "px"
			});
		});
	}
}
class LineChart {
	constructor () {}
	
	initChart() {
		var ctx = $("#lineChart");
		var myLineChart = new Chart(ctx, {
			 type: 'line',
			 data: data,
			 options: options
		});
	}
}

new Navigation();
new Tabs();
new Collapse();
new Graphs();
new LineChart();