jui.define("chart.grid.rule", [ "util.scale" ], function(UtilScale) {

	/**
	 *
	 * @param {Object} orient
	 * @param {Object} grid
	 */
	var RuleGrid = function(orient, chart, grid) {

		this.top = function(chart, g) {
			var height = chart.height(),
				half_height = height/2;

			g.append(this.axisLine(chart, {
				y1 : this.center ? half_height : 0,
				y2 : this.center ? half_height : 0,
				x2 : chart.width()
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var isZero = (ticks[i] == 0);

				var axis = chart.svg.group().translate(values[i], (this.center) ? half_height : 0)

				axis.append(this.line(chart, {
				  y1 : (this.center) ? -bar : 0,
					y2 : bar,
					stroke : chart.theme("gridAxisBorderColor"),
					"stroke-width" : chart.theme("gridBorderWidth")
				}));

				if (!isZero || (isZero && !this.hideZero)) {
					axis.append(chart.text({
						x : 0,
						y : bar + bar + 4,
						"text-anchor" : "middle",
						fill : chart.theme("gridFontColor")
					}, (grid.format) ? grid.format(ticks[i]) : ticks[i] + ""));
				}

				g.append(axis);
			}
		}

		this.bottom = function(chart, g) {
			var height = chart.height(),
				half_height = height/2;
		  
			g.append(this.axisLine(chart, {
				y1 : this.center ? -half_height : 0,
				y2 : this.center ? -half_height : 0,
				x2 : chart.width()
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var isZero = (ticks[i] == 0);
				var axis = chart.svg.group().translate(values[i], (this.center) ? -half_height : 0);

				axis.append(this.line(chart, {
				  y1 : (this.center) ? -bar : 0,
					y2 : (this.center) ? bar : -bar,
					stroke : chart.theme("gridAxisBorderColor"),
					"stroke-width" : chart.theme("gridBorderWidth")
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(chart.text({
						x : 0,
						y : -bar * 2,
						"text-anchor" : "middle",
						fill : chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
					}, (grid.format) ? grid.format(ticks[i]) : ticks[i] + ""))
				}

				g.append(axis);
			}
		}

		this.left = function(chart, g) {
			var width = chart.width(),
				height = chart.height(),
				half_width = width/2;

			g.append(this.axisLine(chart, {
				x1 : this.center ? half_width : 0,
				x2 : this.center ? half_width : 0,
				y2 : height
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var isZero = (ticks[i] == 0);
				var axis = chart.svg.group().translate((this.center) ? half_width : 0, values[i])

				axis.append(this.line(chart, {
					x1 : (this.center) ? -bar : 0,
					x2 : bar,
					stroke : chart.theme("gridAxisBorderColor"),
					"stroke-width" : chart.theme("gridBorderWidth")					
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(chart.text({
					  x : bar/2 + 4,
					  y : bar-2,
					  fill : chart.theme("gridFontColor")
					}, (grid.format) ? grid.format(ticks[i]) : ticks[i] + ""));
				}

				g.append(axis);
			}
		}

		this.right = function(chart, g) {
			var width = chart.width(),
				half_width = width/2;

			g.append(this.axisLine(chart, {
				x1 : this.center ? -half_width : 0,
				x2 : this.center ? -half_width : 0,
				y2 : chart.height()
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var isZero = (ticks[i] == 0);
				var axis = chart.svg.group().translate((this.center) ? -half_width : 0, values[i]);

				axis.append(this.line(chart, {
					x1 : (this.center) ? -bar : 0,
					x2 : (this.center) ? bar : -bar,
					stroke : chart.theme("gridAxisBorderColor"),
					"stroke-width" : chart.theme("gridBorderWidth")
				}));

				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(chart.text({
						x : -bar - 4,
						y : bar-2,
						"text-anchor" : "end",
						fill : chart.theme("gridFontColor")
					}, (grid.format) ? grid.format(ticks[i]) : ticks[i] + ""));
				}

				g.append(axis);
			}
		}

		this.drawBefore = function() {
			grid = this.setRangeDomain(chart, grid);

			var width = chart.width(), height = chart.height();

			if (orient == "left" || orient == "right") {
				this.scale = UtilScale.linear().domain(grid.domain).range([height, 0]);
			} else {
				this.scale = UtilScale.linear().domain(grid.domain).range([0, width]);
			}

			this.step = grid.step;
			this.nice = grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);
			this.bar = 6;
			this.hideZero = grid.hideZero;
			this.center = grid.center;
			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}
		}

		this.draw = function() {
			return this.drawGrid(chart, orient, "rule", grid);
		}

		this.drawSetup = function() {
			return {
				// core options
				domain: null,
				step: 10,
				min: 0,
				max: 0,
				reverse: false,
				key: null,
				hide: false,
				unit: 0,

				// common options
				line: false,
				format: null,

				// rule options
				hideZero: false,
				hideText: false,
				nice: false,
				center: false
			}
		}
	}

	return RuleGrid;
}, "chart.grid.core");
