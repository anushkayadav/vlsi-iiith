!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);





$(init);
function init() {


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
            html = "<div class ='ui-item' ><img src='images/capacitor.png' style='width:90px;height:45px;'></div>";
        	
        	} else if(node.type === "inverter") {
            html = "<div class ='ui-item'><img src='images/inverter.png' style='width:100px;height:40px;'></div>";
            
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

        if(ui.helper.hasClass("input")){
            alert("input dropped");
            icount=icount+1;
            if(icount>=1){
                alert("Can have maximum one input !");
                $( ".input" ).draggable({ disabled: true });
            }
        }

        if(ui.helper.hasClass("output")){
            alert("output dropped");
            ocount=ocount+1;
            if(ocount>=1){
                alert("Can have maximum one output !");
                $( ".output" ).draggable({ disabled: true });
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

































    $('.ui-item').draggable({
  containment: ".canvas",
  drag: function( event, ui ) {
           var lines = $(this).data('lines');
           var con_item =$(this).data('connected-item');
           var con_lines = $(this).data('connected-lines');
  
           if(lines) {
             lines.forEach(function(line,id){
                $(line).attr('x1',$(this).position().left).attr('y1',$(this).position().top+1);  
             }.bind(this));
           }
    
           if(con_lines){
               con_lines.forEach(function(con_line,id){
                  $(con_line).attr('x2',$(this).position().left+5)
                        .attr('y2',$(this).position().top+(parseInt($(this).css('height'))/2)+(id*5));
               }.bind(this));
              
           }
           
     }
});

$('.ui-item').droppable({
  accept: '.connect',
  drop: function(event,ui){
     var item = ui.draggable.closest('.ui-item');
     $(this).data('connected-item',item);
     ui.draggable.css({top:-2,left:-2});
     item.data('lines').push(item.data('line'));
    
     if($(this).data('connected-lines')){
        $(this).data('connected-lines').push(item.data('line'));
        
         var y2_ = parseInt(item.data('line').attr('y2'));
         item.data('line').attr('y2',y2_+$(this).data('connected-lines').length*5);
        
     }else $(this).data('connected-lines',[item.data('line')]);
    
     item.data('line',null);
    console.log('dropped');
  }
});


    $('.connect').draggable({
     containment: ".canvas",
     drag: function( event, ui ) {
       var _end = $(event.target).parent().position();
       var end = $(event.target).position();
       if(_end&&end)  
       $(event.target).parent().data('line')
                                .attr('x2',end.left+_end.left+5).attr('y2',end.top+_end.top+2);
      },
     stop: function(event,ui) {
        if(!ui.helper.closest('.ui-item').data('line')) return;
        ui.helper.css({top:-2,left:-2});
        ui.helper.closest('.ui-item').data('line').remove();
        ui.helper.closest('.ui-item').data('line',null);
        console.log('stopped');
      }
});


$('.connect').on('mousedown',function(e){
    var cur_ui_item = $(this).closest('.ui-item');
    var connector = $('#connector_canvas');
    var cur_con;
  
  if(!$(cur_ui_item).data('lines')) $(cur_ui_item).data('lines',[]);
  
  if(!$(cur_ui_item).data('line')){
         cur_con = $(document.createElementNS('http://www.w3.org/2000/svg','line'));
         cur_ui_item.data('line',cur_con);
    } else cur_con = cur_ui_item.data('line');
  
    connector.append(cur_con);
    var start = cur_ui_item.position();
     cur_con.attr('x1',start.left).attr('y1',start.top+1);
     cur_con.attr('x2',start.left+1).attr('y2',start.top+1);
});









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