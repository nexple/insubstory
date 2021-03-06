jui.define("chart.widget.legend", [ "util.base" ], function(_) {

    var LegendWidget = function(chart, widget) {
        
        /**
         * brush 에서 생성되는 legend 아이콘 리턴 
         * 
         * @param {object} chart
         * @param {object} brush
         */
		this.getLegendIcon = function(brush) {
			var arr = [],
                data = brush.target;
			
			if (widget.key != null) {
				data = chart.data();
			}
			
			var count = data.length;
			
			for(var i = 0; i < count; i++) {
				
				if (widget.key != null) {
					var text = chart.series(widget.key).text || data[i][widget.key];
				} else {
					var target = brush.target[i],
                        text = chart.series(target).text || target;
				}

				var rect = chart.svg.getTextRect(text),
                    width = Math.min(rect.width, rect.height),
                    height = width;
								 
				var group = chart.svg.group({
					"class" : "legend icon"
				});
				
				group.append(chart.svg.rect({
					x: 0, 
					y : 0, 
					width: width, 
					height : height,
					fill : chart.color(i, brush.colors)
				}));
				
 				group.append(chart.text({
					x : width + 4,
					y : 11,
                    "font-family" : chart.theme("fontFamily"),
                    "font-size" : chart.theme("legendFontSize"),
                    "fill" : chart.theme("legendFontColor"),
					"text-anchor" : "start"
				}, text)) 
				
				arr.push({
					icon : group,
					width : width + 4 + rect.width + 10,
					height : height + 4
				});
			}
			
			return arr;
		}        
        

        this.draw = function() {
            var group = chart.svg.group({
                "class" : "widget legend"
            });
            
            var x = 0, y = 0,
                total_width = 0, total_height = 0,
                max_width = 0, max_height = 0;
            
            for(var i = 0; i < widget.brush.length; i++) {
                var index = widget.brush[i],
                    brush = chart.brush(index);
                var arr = this.getLegendIcon(brush);

                for(var k = 0; k < arr.length; k++) {
                    group.append(arr[k].icon);
                    arr[k].icon.translate(x, y);

                    if (widget.position == "bottom" || widget.position == "top") {
                        x += arr[k].width;
                        total_width += arr[k].width;
                        
                        if (max_height < arr[k].height) {
                            max_height = arr[k].height;
                        }
                    } else {
                        y += arr[k].height;
                        total_height += arr[k].height;
                        
                        if (max_width < arr[k].width) {
                            max_width = arr[k].width;
                        }
                    }
                }                   
            }
            
            // legend 위치  선정
            if (widget.position == "bottom" || widget.position == "top") {
                var y = (widget.position == "bottom") ? chart.y2() + chart.padding("bottom") - max_height : chart.y() - chart.padding("top");
                
                if (widget.align == "start") {
                    x = chart.x();
                } else if (widget.align == "center") {
                    x = chart.x() + (chart.width() / 2- total_width / 2);
                } else if (widget.align == "end") {
                    x = chart.x2() - total_width;
                }
            } else {
                var x = (widget.position == "left") ? chart.x() - chart.padding("left") : chart.x2() + chart.padding("right") - max_width;
                
                if (widget.align == "start") {
                    y = chart.y();
                } else if (widget.align == "center") {
                    y = chart.y() + (chart.height() / 2 - total_height / 2);
                } else if (widget.align == "end") {
                    y = chart.y2() - total_height;
                }
            } 
            
            group.translate(Math.floor(x), Math.floor(y));

            return group;
        }

        this.drawSetup = function() {
            return {
                brush: [ 0 ],
                position: "bottom",
                align: "center", // or left, right
                key: null
            }
        }
    }

    return LegendWidget;
}, "chart.widget.core");