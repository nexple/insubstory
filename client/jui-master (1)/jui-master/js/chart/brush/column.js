jui.define("chart.brush.column", [], function() {

	/**
	 * Column Brush 
	 * 
	 * {
	 * 	type : "column",
	 *  target : ["field"],
	 *  outerPadding : 2,
	 *  innerPadding : 1, 	
	 * 
	 * } 
	 * 
 	 * @param {Object} brush
	 */
	var ColumnBrush = function(chart, brush) {
		var g, zeroY, count, width, columnWidth, half_width;
		var outerPadding, innerPadding;

		this.drawBefore = function() {
			g = chart.svg.group().translate(chart.x(), chart.y());

            outerPadding = brush.outerPadding;
            innerPadding = brush.innerPadding;

			zeroY = brush.y(0);
			count = chart.data().length;

			width = brush.x.rangeBand();
			half_width = (width - outerPadding * 2);
			columnWidth = (width - outerPadding * 2 - (brush.target.length - 1) * innerPadding) / brush.target.length;
		}

		this.draw = function() {
			for (var i = 0; i < count; i++) {
				var startX = brush.x(i) - half_width / 2;

				for (var j = 0; j < brush.target.length; j++) {
					var startY = brush.y(chart.data(i)[brush.target[j]]),
                        r = null;

					if (startY <= zeroY) {
						r = chart.svg.rect({
							x : startX,
							y : startY,
							width : columnWidth,
							height : Math.abs(zeroY - startY),
							fill : chart.color(j, brush.colors)
						});
					} else {
						r = chart.svg.rect({
							x : startX,
							y : zeroY,
							width : columnWidth,
							height : Math.abs(zeroY - startY),
							fill : chart.color(j, brush.colors)
						});
					}

                    this.addEvent(r, j, i);
                    g.append(r);

					startX += columnWidth + innerPadding;
				}
			}

            return g;
		}

        this.drawSetup = function() {
            return {
                outerPadding: 2,
                innerPadding: 1
            }
        }
	}

	return ColumnBrush;
}, "chart.brush.core");
