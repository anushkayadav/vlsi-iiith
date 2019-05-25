$(init);
function init() {

	var diagram = [];
	var canvas = $(".canvas");
	$(".componentButton").draggable({
                helper: "clone"
            });
	canvas.droppable({
                drop: function(event, ui) {
                	//alert("tool dropped");
                	var node = {
                        _id: (new Date).getTime(),
                        position: ui.helper.position()
                    };

                    if(ui.helper.hasClass("ground")){
                        node.type = "ground";

                    } else if(ui.helper.hasClass("vSource")){
                        node.type = "voltage-source";

                    } else if(ui.helper.hasClass("resistor")){
                        node.type = "resistor";

                    } else if(ui.helper.hasClass("wire")){
                        node.type = "wire";

                    } else if(ui.helper.hasClass("capacitor")){
                        node.type = "capacitor";

                    } else if(ui.helper.hasClass("inverter")){
                        node.type = "inverter";

                    } else if(ui.helper.hasClass("diode")){
                        node.type = "diode";

                    } else if(ui.helper.hasClass("npn")){
                        node.type = "npn";

                    } else if(ui.helper.hasClass("input")){
                        node.type = "input";

                    } else if(ui.helper.hasClass("output")){
                        node.type = "output";

                    } else {
                        return;
                    }

                    diagram.push(node);
                    renderDiagram(diagram);
                    //console.log(diagram);
                }
            });
	function renderDiagram(diagram) {
		//console.log(diagram);
		canvas.empty();
		for(var d in diagram){
			var node = diagram[d];
			console.log(node);
			var html = "";
            if(node.type === "ground") {
            	html = "<img src='images/ground.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "voltage-source") {
            html = "<img src='images/voltage.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "resistor") {
           html = "<img src='images/resistor.png' style='width:50px;height:50px;'>";
            
             } else if(node.type === "wire") {
            html = "<img src='images/wire.gif' style='width:50px;height:50px;'>";
            
            } else if(node.type === "capacitor") {
            html = "<img src='images/capacitor.png' style='width:50px;height:50px;'>";
        	
        	} else if(node.type === "inverter") {
            html = "<img src='images/inverter.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "diode") {
            html = "<img src='images/diode.png' style='width:50px;height:50px;'>";
             
             } else if(node.type === "npn") {
           html = "<img src='images/npn.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "input") {
            html = "<img src='images/input.gif' style='width:50px;height:50px;'>";
        	
        	} else if(node.type === "output") {
            html = "<img src='images/output.gif' style='width:50px;height:50px;'>";
        }
        var dom = $(html).css({
                        "position": "absolute",
                        "top": node.position.top,
                        "left": node.position.left
                    }).draggable({
                        stop: function(event, ui) {
                            console.log(ui);
                            var id = ui.helper.attr("id");
                            for(var i in diagram) {
                                if(diagram[i]._id == id) {
                                    diagram[i].position.top = ui.position.top;
                                    diagram[i].position.left = ui.position.left;
                                }
                            }
                        }
                    }).attr("id", node._id);
                    canvas.append(dom);
                }
        

		}
		

		$( ".button" ).click(function() {
			$(".canvas").empty();
			diagram=[];
		});
	}




