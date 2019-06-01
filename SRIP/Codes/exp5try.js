$(init);
function init() {


  function input(){
    var input_div='<div class="input"></div>';
    var input=$(input_div).css({
              "position":"absolute",
              "width":"8px",
              "height":"8px",
              "left":"-2px",
              "top":"38%",
              "background-color":"#47cf73",
              "border-radius":"50%",
              "z-index":"5",
            });

    return input;
  }
    

  function output(){

    var output_div='<div class="output"></div>';
    var output=$(output_div).css({
              "position":"absolute",
              "width":"8px",
              "height":"8px",
              "right":"-2px",
              "top":"38%",
              "background-color":"#47cf73",
              "border-radius":"50%",
              "z-index":"5",
            });

    return output;
  }

    



    

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
            	html = '<div><img src="images/ground.png" style="width:30px ;height:60px;"></div>';
            
            } else if(node.type === "voltage-source") {
            html = "<div><img src='images/voltage.png' style='width:50px;height:50px;'></div>";
            
            } else if(node.type === "resistor") {
           html = "<img src='images/resistor.png' style='width:50px;height:50px;'>";
            
             } else if(node.type === "wire") {
            html = "<img src='images/wire.gif' style='width:50px;height:50px;'>";
            
            } else if(node.type === "capacitor") {
            html = "<div ><img src='images/capacitor.png' style='width:90px;height:45px;'></div>";
        	
        	} else if(node.type === "inverter") {
            html = "<div><img src='images/inverter.png' style='width:100px;height:40px;'></div>";
            
            } else if(node.type === "diode") {
            html = "<img src='images/diode.png' style='width:50px;height:50px;'>";
             
             } else if(node.type === "npn") {
           html = "<img src='images/npn.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "input") {
            html = "<div><img src='images/input.gif' style='width:50px;height:50px;'></div>";
        	
        	} else if(node.type === "output") {
            html = "<div><img src='images/output.gif' style='width:50px;height:50px;'></div>";
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
                    dom.append(input()).append(output());
                    canvas.append(dom);
                }
        

		}
		

        var gcount=0;//count no. of times ground dropped
        var ccount=0;//count no. of time capacitor dropped
        var icount=0;//count no. of inputs dropped
        var ocount=0;//count no. of outputs dropped



		$( ".button" ).click(function() {
			$(".canvas").empty();
			diagram=[];//clear the digram array
             gcount=0;//set all counts to 0 again
             ccount=0;
             icount=0;
             ocount=0;

		});

        //$( ".vSource" ).click(function() {
            //$( ".vSource" ).draggable({ disabled: true });
           // alert("Voltage source is not used in this experiment...Try Again");
       // });

       /*document.addEventListener("drop", function(event) {
        event.preventDefault()
        if(event.target.hasClass==='vSource'){
            $( ".vSource" ).draggable({ disabled: true });
            alert("Voltage source is not used in this experiment...Try Again");
            
        }
    })*/

    $( ".vSource" ).on( "drag", function( event, ui ) {
        alert("Voltage source is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( ".resistor" ).on( "drag", function( event, ui ) {
        alert("Resistor is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( ".npn" ).on( "drag", function( event, ui ) {
        alert("npn is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( ".diode" ).on( "drag", function( event, ui ) {
        alert("diode is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );


    

    $( ".canvas" ).on( "drop", function( event, ui ) {
        
        if(ui.helper.hasClass("ground")){
            alert("ground dropped");
            gcount=gcount+1;
            if(gcount>1){
                alert("Can have maximum one ground !");
            }
        }

        if(ui.helper.hasClass("capacitor")){
            alert("capacitor dropped");
            ccount=ccount+1;
            if(ccount>1){
                alert("Can have maximum one capacitor!");
            }
        }

        if(ui.helper.hasClass("input")){
            alert("input dropped");
            icount=icount+1;
            if(icount>1){
                alert("Can have maximum one input !");
            }
        }

        if(ui.helper.hasClass("output")){
            alert("output dropped");
            ocount=ocount+1;
            if(ocount>1){
                alert("Can have maximum one output !");
            }
        }
    } );








	}






/* var input_div='<div class="input"></div>';
            var input1=$(input_div).css({
              "position":"absolute",
              "width":"8px",
              "height":"8px",
              "left":"-2px",
              "top":"22%",
              "background-color":"#47cf73",
              "border-radius":"50%",
              "z-index":"5",
            });

             var output_div='<div class="output"></div>';
            var output=$(output_div).css({
              "position":"absolute",
              "width":"8px",
              "height":"8px",
              "right":"-2px",
              "top":"45%",
              "background-color":"#47cf73",
              "border-radius":"50%",
              "z-index":"5",
            });*/