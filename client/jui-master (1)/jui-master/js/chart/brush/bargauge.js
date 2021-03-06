jui.define("chart.brush.bargauge", [ "util.math" ], function(math) {
	/**
	 * Bar Gauge Brush 객체 
	 * 
	 * <code>
	 * {
	 * 	type : "bargauge",
	 *  target : "field1",  // 생략하면 모든 series 를 target 으로 설정
	 *  cut : 5,	// gauge 사이의 거리  
	 *  align : "left"	// gauge 정렬 방식 
	 *  
	 * } 
	 * </code>
	 * 
 	 * @param {Object} brush
	 */
	var BarGaugeBrush = function(chart, brush) {
        var y = 0, x = 0;

		this.draw = function() {
			var group = chart.svg.group({
				"class" : "brush bar gauge"
			}).translate(chart.x(), chart.y());

			if (brush.split) {
				var max = chart.width();	
			} else {
				var max = chart.width();
			}

			for(var i = 0, len = chart.data().length; i < len; i++) {
                var data = chart.data(i);
                
                var g = chart.svg.group({
                    "class" : "bar"
                });
                
                g.append(chart.text({
                    x : x,
                    y : y + brush.size / 2 + brush.cut,
                    "text-anchor" : "end",
                    fill : chart.color(i, brush.colors)
                }, data[brush.title] || ""))
                
                g.append(chart.svg.rect({
                    x : x + brush.cut,
                    y : y,
                    width: max,
                    height : brush.size,
                    fill : chart.theme("gaugeBackgroundColor")
                }));
                
                var value = (data.value)  * max / 100,
                    ex = (100 - data.value)  * max / 100,
                    startX = x + brush.cut;
                
                if (brush.align == "center") {
                	startX += (max/2 - value/2);
                } else if (brush.align == "right") {
                	startX += max - value; 
                }
                
                g.append(chart.svg.rect({
                    x : startX,
                    y : y,
                    width: value,
                    height : brush.size,
                    fill : chart.color(i, brush.colors)
                }));

                if (brush.split) {
                	var textX = x + value + brush.cut * 2 + ex,
                        textAlign = "start",
                        textColor = chart.color(i, brush.colors);
                } else {
                	var textX = x + brush.cut * 2,
                        textAlign = "start",
                        textColor = "white";
                	
                	if (this.align == "center") {
                		textX = x + brush.cut + max / 2;
                		textAlign = "middle";
                	} else if (brush.align == "right") {
                		textX = x + max;
                		textAlign = "end";                		
                	}
                }
                
                g.append(chart.text({
                    x : textX,
                    y : y + brush.size / 2 + brush.cut,
                    "text-anchor" : textAlign,
                    fill : textColor
                }, brush.format ? brush.format(data.value) : data.value + "%"))

                this.addEvent(g, null, i);
                group.append(g);
                
                y += brush.size + brush.cut;
			}

            return group;
		}

        this.drawSetup = function() {
            return {
                cut: 5,
                size: 20,
                split: false,
                align: "left",
                title: "title"
            }
        }
	}

	return BarGaugeBrush;
}, "chart.brush.core");
