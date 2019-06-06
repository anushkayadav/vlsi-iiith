


$(init);

function init(){


  function input(){
    var input_div='<div class=" connect input"></div>';
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

    var output_div='<div class="connect output"></div>';
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

                    } else if(ui.helper.hasClass("inputsym")){
                        node.type = "inputsym";

                    } else if(ui.helper.hasClass("outputsym")){
                        node.type = "outputsym";

                    } else {
                        return;
                    }

                    diagram.push(node);
                    renderDiagram(diagram);
                    //console.log(diagram);




                }
            });

  function interact()
{
  $(".output").mousedown(function(event) {
    var cur_ui_item = $(this).closest('.ui-item');
    var connector=$('#connector_canvas');
    var cur_con;

    if(!$(cur_ui_item).data('output_lines'))
      $(cur_ui_item).data('output_lines', []);

    if(!$(cur_ui_item).data('line',))
    {
      cur_con = $(document.createElementNS('http://www.w3.org/2000/svg','line'));
      cur_ui_item.data('line', cur_con);
    }
    else cur_con = cur_ui_item.data('line');

    connector.append(cur_con);
    var start= cur_ui_item.position();
    cur_con.attr('x1', start.left).attr('y1', start.top+1).attr('x2',start.left+1).attr('y2',start.top+1);
  });

  $(".output").draggable({
    containment: canvas,
    drag: function(event,ui){
      var _end=$(event.target).parent().position();
      var end= $(event.target).position();
      if(_end&&end)
        $(event.target).parent().data('line').attr('x2',end.left+_end.left+5).attr('y2',end.top+_end.top+2);
    },

    // stop: function(event,ui){
    //  if(!ui.helper.closest('.gate').data('line'))
    //    return;
    //  ui.helper.css({
    //    top:-1,
    //    left:-2
    //  });
    //  ui.helper.closest('.gate').data('line').remove();
    //  ui.helper.closest('.gate').data('line',null);
    //  console.log("stopped");
    // }
  });

  $(".ui-item").droppable({
    accept: '.output',
    drop: function(event,ui){
            var item = ui.draggable.closest('.ui-item');
            $(this).data('connected-item',item);
            ui.draggable.css({top:-2,left:-2});
            item.data('lines').push(item.data('line'));
    
            if($(this).data('connected-lines')){
                $(this).data('connected-lines').push(item.data('line'));
        
                var y2_ = parseInt(item.data('line').attr('y2'));
                item.data('line').attr('y2',y2_+$(this).data('connected-lines').length*5);
            }
            else $(this).data('connected-lines',[item.data('line')]);
            item.data('line',null);
            console.log('dropped');
        }
    
  });
}


	function renderDiagram(diagram) {
		//console.log(diagram);
		canvas.empty();
    var s='<svg id="connector_canvas"></svg>';
    canvas.append(s);
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
            html = "<div class ='ui-item' ><img src='images/capacitor.png' style='width:90px;height:45px;'></div>";
        	
        	} else if(node.type === "inverter") {
            html = "<div class ='ui-item'><img src='images/inverter.png' style='width:100px;height:40px;'></div>";
            
            } else if(node.type === "diode") {
            html = "<img src='images/diode.png' style='width:50px;height:50px;'>";
             
             } else if(node.type === "npn") {
           html = "<img src='images/npn.png' style='width:50px;height:50px;'>";
            
            } else if(node.type === "inputsym") {
            html = "<div><img src='images/input.gif' style='width:50px;height:50px;'></div>";
        	
        	} else if(node.type === "outputsym") {
            html = "<div><img src='images/output.gif' style='width:50px;height:50px;'></div>";
        }

       

        var dom = $(html).css({
                        "position": "absolute",
                        "top": node.position.top,
                        "left": node.position.left,
                        "z-index":2,
                        "max-width":"7%"
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
                    }).attr("id", node._id).addClass('ui-item');;
                    dom.append(input()).append(output());

                    canvas.append(dom);

                }
                interact();
  }
		

   var gcount=0;//count no. of times ground dropped
   var ccount=0;//count no. of time capacitor dropped
   var icount=0;//count no. of inputs dropped
   var ocount=0;//count no. of outputs dropped
   var invcount=0;//inverter dropped



	$( ".button" ).click(function() {
    $(".canvas").empty();
    diagram=[];//clear the digram array
    gcount=0;//set all counts to 0 again
    ccount=0;
    icount=0;
    ocount=0;
    invcount=0;
  });


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
            if(gcount>=1){
                alert("Can have maximum one ground !");
                $( ".ground" ).draggable({ disabled: true });
            }
        }

        if(ui.helper.hasClass("capacitor")){
            alert("capacitor dropped");
            ccount=ccount+1;
            if(ccount>=1){
                alert("Can have maximum one capacitor!");
                $( ".capacitor" ).draggable({ disabled: true });
            }
        }

        if(ui.helper.hasClass("inputsym")){
            alert("input dropped");
            icount=icount+1;
            if(icount>=1){
                alert("Can have maximum one input !");
                $( ".inputsym" ).draggable({ disabled: true });
            }
        }

        if(ui.helper.hasClass("outputsym")){
            alert("output dropped");
            ocount=ocount+1;
            if(ocount>=1){
                alert("Can have maximum one output !");
                $( ".outputsym" ).draggable({ disabled: true });
            }
        }

         if(ui.helper.hasClass("inverter")){
            
            invcount=invcount+1;
            if(invcount>=5){
                alert("Maximum 5 inverters allowed !");
                $( ".inverter" ).draggable({ disabled: true });
            }
        }
    } );


      $( ".btn" ).click(function() {

        if(gcount==0){
          alert("ground is misssing");
        }
        if(icount==0){
          alert("input is misssing");
        }
        if(ocount==0){
          alert("output is misssing");
        }
        if(ccount==0){
          alert("capacitor is misssing");
        }
        if(invcount<5){
          alert("circuit not complete yet!");
        }
        });


  



   

}


