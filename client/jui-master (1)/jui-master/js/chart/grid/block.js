jui.define("chart.grid.block", [ "util.scale" ], function(UtilScale) {

	/**
	 * Block Grid 
	 * 
	 * @param {Object} orient		// grid 방향 
	 * @param {Object} grid
	 */
	var BlockGrid = function(orient, chart, grid) {

		/**
		 * top 그리기 
		 */
		this.top = function(chart, g, scale) {
			var full_height = chart.height();
			
			if (!grid.line) {
				g.append(this.axisLine(chart, {
					x2 : chart.width()
				}))
			}

			for (var i = 0; i < this.points.length; i++) {
               var domain = (grid.format) ? grid.format(this.domain[i]) : this.domain[i];

                if (domain == "") {
                    continue;
                }

				var axis = chart.svg.group({
					"transform" : "translate(" + this.points[i] + ", 0)"
				});

				axis.append(this.line(chart, {
					x1 : -this.half_band,
					y1 : 0,
					x2 : -this.half_band,
					y2 : (grid.line) ? full_height : this.bar
				}));

				axis.append(chart.text({
					x : 0,
					y : -20,
					"text-anchor" : "middle"
				}, (grid.format) ? grid.format(this.domain[i]) : this.domain[i]));

				g.append(axis);
			}

			if (!grid.full) {
				var axis = chart.svg.group({
					"transform" : "translate(" + chart.width() + ", 0)"
				});

				axis.append(this.line(chart, {
					y2 : (grid.line) ? full_height : this.bar
				}));

				g.append(axis);
			}
		}
		
		/**
		 * bottom 그리기
		 */
		this.bottom = function(chart, g, scale) {
			var full_height = chart.height();

			if (!grid.line) {
				g.append(this.axisLine(chart, {
					x2 : chart.width()
				}));
			}

			for (var i = 0, len = this.points.length; i < len; i++) {
                var domain = (grid.format) ? grid.format(this.domain[i]) : this.domain[i];

                if (domain == "") {
                    continue;
                }
                
				var axis = chart.svg.group({
					"transform" : "translate(" + this.points[i] + ", 0)"
				});
				
				axis.append(this.line(chart, {
					x1 : -this.half_band,
					y1 : 0,
					x2 : -this.half_band,
					y2 : (grid.line) ? -full_height : this.bar
				}));

				axis.append(chart.text({
					x : 0,
					y : 20,
					"text-anchor" : "middle",
					fill : chart.theme("gridFontColor")
				}, domain));

				g.append(axis);
			}

			if (!grid.full) {
				var axis = chart.svg.group({
					"transform" : "translate(" + chart.width() + ", 0)"
				})

				axis.append(this.line(chart, {
					y2 : (grid.line) ? -full_height : this.bar
				}));

				g.append(axis);
			}
		}
		
		/**
		 * left 그리기 
		 */
		this.left = function(chart, g, scale) {
			var full_width = chart.width();

			if (!grid.line) {
				g.append(this.axisLine(chart, {
					y2 : chart.height()
				}))
			}

			for (var i = 0; i < this.points.length; i++) {

				var axis = chart.svg.group({
					"transform" : "translate(0, " + (this.points[i] - this.half_band ) + ")"
				})

				axis.append(this.line(chart, {
					x2 : (grid.line) ? full_width : -this.bar
				}));

				axis.append(chart.text({
					x : -this.bar - 4,
					y : this.half_band,
					"text-anchor" : "end"
				}, (grid.format) ? grid.format(this.domain[i]) : this.domain[i]))

				g.append(axis);
			}

			if (!grid.full) {
				var axis = chart.svg.group({
					"transform" : "translate(0, " + chart.height() + ")"
				})

				axis.append(this.line(chart, {
					x2 : (grid.line) ? chart.width() : -this.bar
				}));

				g.append(axis);
			}
		}

		/**
		 * right 그리기 
		 * 
		 */
		this.right = function(chart, g) {
			if (!grid.line) {
				g.append(this.axisLine(chart, {
					y2 : chart.height()
				}))
			}

			for (var i = 0; i < this.points.length; i++) {
				var axis = chart.svg.group({
					"transform" : "translate(0, " + (this.points[i] - this.half_band) + ")"
				})

				axis.append(this.line(chart, {
					x2 : (grid.line) ? -chart.width() : this.bar
				}));

				axis.append(chart.text({
					x : this.bar + 4,
					y : this.half_band,
					"text-anchor" : "start"
				}, (grid.format) ? grid.format(this.domain[i]) : this.domain[i]));

				g.append(axis);
			}

			if (!grid.full) {
				var axis = chart.svg.group({
					"transform" : "translate(0, " + chart.height() + ")"
				});

				axis.append(this.line(chart, {
					x2 : (grid.line) ? -chart.width() : this.bar
				}));

				g.append(axis);

			}
		}

		this.drawBefore = function() {
			grid.type = grid.type || "block";
			grid = this.setBlockDomain(chart, grid);

			var width = chart.width();
			var height = chart.height();
			var max = (orient == "left" || orient == "right") ? height : width;
	
			// scale 설정 
			this.scale = UtilScale.ordinal().domain(grid.domain);
			var range = [0, max];

			if (grid.full) {
				this.scale.rangeBands(range);
			} else {
				this.scale.rangePoints(range);
			}

			this.points = this.scale.range();
			this.domain = this.scale.domain();
			this.band = this.scale.rangeBand();
			this.half_band = (grid.full) ? 0 : this.band / 2;
			this.bar = 6;
			this.reverse = grid.reverse;
		}

		this.draw = function() {
			return this.drawGrid(chart, orient, "block", grid);
		}

		this.drawSetup = function() {
			return {
				// core options
				domain: null,
				step: 10,
				min: 0,
				max: 10, // @deprecated
				reverse: false,
				key: null,
				hide: false,
				unit: 0,

				// common options
				line: false,
				format: null,

				// block options
				full: false
			}
		}
	}

	return BlockGrid;
}, "chart.grid.core");
