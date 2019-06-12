$(init);
function init(){
var input1_id=0;
var input2_id=0;
var id=0;
var inp_inv=0;
var inv_inv=0;
var inv_outp=0;
var inv_cap=0;
var cap_grd=0;

function input()
{
	var input_div='<div class="input"></div>';
	var input=$(input_div).css({
		position:"absolute",
		width:"8px",
		height: "8px",
		left:"-2px",
		top:"45%",
		"background-color":"grey",
		"border-radius":"50%",
		"z-index":"5"
	});
	return input;
}

function output()
{
	var output_div='<div class="output"></div>';
	var output=$(output_div).css({
		position:"absolute",
		width:"8px",
		height: "8px",
		right:"-2px",
		top:"45%",
		"background-color":"#47cf73",
		"border-radius":"50%",
		"z-index":"5"
	});
	return output;
}

var diagram={"devices":[],"connectors":[]};
var tools=$(".drag");
tools.draggable({helper:"clone"});

var canvas=$("#drop_zone").droppable({
	drop: function(event, ui){
		var node={_id: id,position: ui.helper.position()};

		node.position.left-=$('#tools').width();
		id=id+1;
		if(ui.helper.hasClass("drag")){
			node.type=ui.helper.prevObject.attr("id");
			console.log(node.type);
		}
		else{
			id=id-1;
			return;
		}
		diagram.devices.push(node);
		renderDiagram(diagram);
	}
});



function interact()
{
	$(".output").mousedown(function(event) {
		var cur_gate = $(this).closest('.gate');
		var connector=$('#connector_canvas');
		var cur_con;

		if(!$(cur_gate).data('line',))
		{
			cur_con = $(document.createElementNS('http://www.w3.org/2000/svg','line'));
			cur_gate.data('line', cur_con);
		}
		else cur_con = cur_gate.data('line');
		connector.append(cur_con);
		var start= cur_gate.position();
		var output_position= $(this).position();
		var x1=start.left+output_position.left+($(this).width()/2);
		y1=start.top+output_position.top+($(this).height()/2);

		cur_con.attr('x1',x1).attr('y1', y1).attr('x2',x1+1).attr('y2',y1);
	});


	$(".output").draggable({
		containment: canvas,
		drag: function(event,ui){
			var _end=$(event.target).parent().position();
			var end= $(event.target).position();
			if(_end&&end)
				$(event.target).parent().data('line').attr('x2',end.left+_end.left+5).attr('y2',end.top+_end.top+2);
		},

		stop: function(event,ui){
			if(!ui.helper.closest('.gate').data('line'))
				return;
			ui.helper.css({top:"45%",right:"-2px",left:"auto"});
			ui.helper.closest('.gate').data('line').remove();
			ui.helper.closest('.gate').data('line',null);
			console.log("stopped");
		}
	});


	$(".gate").droppable({
		accept: '.output',
		drop: function(event,ui){
			var gate=ui.draggable.closest('.gate'); //the gate whose output is being dragged
			var gate_id=gate.attr('id');
			var gate_child=gate.children();
			var now_child=$(this).children();
			
			ui.draggable.css({top:"45%",right:"-2px",left:"auto"});
			gate.data('output_line',gate.data('line'));

			var x_abs=parseInt(gate.data('line').attr('x2'));
		    var y_abs=parseInt(gate.data('line').attr('y2'));
		    var this_x=parseInt($(this).css('left'));
		    var this_y=parseInt($(this).css('top'));
		    if((x_abs - this_x)< $(this).width())
		    {
		    	if($(this).data('inp'))
		    		$(this).data('inp').remove();
		    	$(this).data('inp',gate.data('line'));
		    	css_selector='#'+gate_id+" .input";
		    	x2=$(this).position().left + $(css_selector).position().left+3;
		    	y2=$(this).position().top + $(css_selector).position().top+3;
		    	gate.data('line').attr('x2', x2).attr('y2', y2);
		    	
		    	
		    }
		    else gate.data('line').remove();
		    gate.data('line', null);
		   // console.log("dropped");
		    //console.log(gate);
		    //console.log(now_child);

		    

		   if($(gate_child[0]).hasClass("inverter")){
		   console.log("dropped from inverter");
		   //document.getElementById("comments").innerHTML ="dropped from inverter";
		  }
		  if($(now_child[0]).hasClass("inverter")){
		   console.log("dropped to inverter");
		   //document.getElementById("comments").innerHTML ="dropped to inverter";
		  }

		   if($(gate_child[0]).hasClass("capacitor")){
		   console.log("dropped from capacitorr");
		  }
		  if($(now_child[0]).hasClass("capacitor")){
		   console.log("dropped to capacitor");
		  }

		  if($(gate_child[0]).hasClass("ground")){
		   console.log("dropped from ground");
		  }
		  if($(now_child[0]).hasClass("ground")){
		   console.log("dropped to ground");
		  }

		   if($(gate_child[0]).hasClass("inputsym")){
		   console.log("dropped from input");
		  }
		  if($(now_child[0]).hasClass("inputsym")){
		   console.log("dropped to input");
		  }

		  if($(gate_child[0]).hasClass("outputsym")){
		   console.log("dropped from output");
		  }
		  if($(now_child[0]).hasClass("outputsym")){
		   console.log("dropped to output");
		  }


		  if(($(gate_child[0]).hasClass("inverter"))&&($(now_child[0]).hasClass("inverter"))){
		  	inv_inv=inv_inv+1;
		  	 console.log("inv inv is",inv_inv);
		  }

		  if(($(gate_child[0]).hasClass("inputsym"))&&($(now_child[0]).hasClass("inverter"))){
		  	inp_inv=inp_inv+1;
		  	 console.log("inp inv is",inp_inv);
		  }

		  if(($(gate_child[0]).hasClass("inverter"))&&($(now_child[0]).hasClass("outputsym"))){
		  	inv_outp=inv_outp+1;
		  	 console.log("inv outp is",inv_outp);
		  }

		  if(($(gate_child[0]).hasClass("inverter"))&&($(now_child[0]).hasClass("capacitor"))){
		  	inv_cap=inv_cap+1;
		  	 console.log("inv cap is",inv_cap);
		  }

		  if(($(gate_child[0]).hasClass("capacitor"))&&($(now_child[0]).hasClass("ground"))){
		  	cap_grd=cap_grd+1;
		  	 console.log("cap grd is",cap_grd);
		  }


		 










		}
	});
}




function renderDiagram(diagram){
	canvas.empty();
	var s='<svg id="connector_canvas"></svg>';
	canvas.append(s);
	for(var d in diagram.devices)
	{
		var node=diagram.devices[d];
		//var image="images/"+node.type+".svg";
		//console.log(image);
		//html='<div><img src="'+image+'" class="img-thumbnail"></div>';
		console.log(node);
            var html = "";
            if(node.type === "ground") {
                html = '<div><img src="images/groundsym.png" class="img-thumbnail ground" style="width:70px ;height:70px;"></div>';
            }
            else if(node.type === "vSource") {
                html = "<div><img src='images/voltage.png' style='width:50px;height:50px;'></div>";
            }
            else if(node.type === "resistor") {
                html = "<img src='images/resistor.png' style='width:50px;height:50px;'>";
            }
            else if(node.type === "wire") {
                html = "<img src='images/wire.gif' style='width:50px;height:50px;'>";
            }
            else if(node.type === "capacitor") {
                html = "<div><img src='images/capacitor.png' class='img-thumbnail capacitor' style='width:90px;height:45px;'></div>";
            }
            else if(node.type === "inverter") {
                html = "<div><img src='images/inverter1.png' class='img-thumbnail inverter' style='width:120px;height:50px;'></div>";
            }
            else if(node.type === "diode") {
                html = "<img src='images/diode.png' style='width:50px;height:50px;'>";
            }
            else if(node.type === "npn") {
                html = "<img src='images/npn.png' style='width:50px;height:50px;'>";
            }
            else if(node.type === "inputsym") {
                html = "<div><img src='images/inputsym.png' class='img-thumbnail inputsym' style='width:70px;height:70px;'></div>";
            }
            if(node.type === "outputsym") {
                html = "<div><img src='images/outputsym.png' class='img-thumbnail outputsym' style='width:70px;height:70px;'></div>";
            }

		var dom=$(html).css({
			position:"absolute",
			top: node.position.top,
			left: node.position.left,
			"z-index":2,
			"max-width":"7%"
		}).draggable({
			containment:"parent",
			drag: function(event,ui){
				var lines= $(this).data('output_line');
				var inp= $(this).data('inp');
				if(lines){$(lines).attr('x1', $(this).position().left + $(this).width()).attr('y1', $(this).position().top + ($(this).height())/2);}
				if(inp){$(inp).attr('x2', $(this).position().left + 2).attr('y2', $(this).position().top+ $('.input').position().top+5);}
			},
			stop: function(event,ui){
				var id=ui.helper.attr("id");
				diagram.devices[id].position.top=ui.position.top;
				diagram.devices[id].position.left=ui.position.left;
			}
		}).attr("id", node._id).addClass('gate');
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
        $("#drop_zone").empty();
        diagram.devices=[];//clear the digram array
        gcount=0;//set all counts to 0 again
        ccount=0;
        icount=0;
        ocount=0;
        invcount=0;
         $( ".ground" ).draggable({ disabled: false });
         $( ".capacitor" ).draggable({ disabled: false });
         $( ".inputsym" ).draggable({ disabled: false });
         $( ".outputsym" ).draggable({ disabled: false });
         $( ".inverter" ).draggable({ disabled: false });
         inp_inv=0;
		 inv_inv=0;
		 inv_outp=0;
		 inv_cap=0;
		 cap_grd=0;
    });



    $( "#vSource" ).on( "drag", function( event, ui ) {
        alert("Voltage source is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( "#resistor" ).on( "drag", function( event, ui ) {
        alert("Resistor is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( "#npn" ).on( "drag", function( event, ui ) {
        alert("npn is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );

    $( "#diode" ).on( "drag", function( event, ui ) {
         alert("diode is not used in this experiment...Try Again");
        //$( ".vSource" ).draggable({ disabled: true });
    } );


    $( "#drop_zone" ).on( "drop", function( event, ui ) {

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


    $( ".simulate" ).click(function() {

        if(gcount==0){
          alert("Hint : ground is misssing");
        }
        if(icount==0){
          alert("Hint : input is misssing");
        }
        if(ocount==0){
          alert("Hint : output is misssing");
        }
        if(ccount==0){
          alert("Hint : capacitor is misssing");
        }
        if(invcount<5){
          alert("Hint : Check no. of inverters");
        }

        if((gcount==1)&& (icount==1) && (ocount==1) && (ccount==1) && (invcount==5)){
        	alert("number of components is complete now")
        	if((inp_inv==1) && (inv_inv==4) && (inv_outp==1) && (inv_cap==1) && (cap_grd==1)){
        		alert("circuit complete");
        		//window.open("mygraph.html");
        		$("#mygraph").attr('src',"mygraph1.png");

        	}
        }

    });





}