// ################### Modify HTML DOM Elements ###################
$(document).ready(function(){
  // Toggle button to show tools
  $("#showTools").click(function() {
    $(".toolLegend").toggle();
    $("#showTools").toggle();
    $("#hideTools").toggle();
  });

  $("#hideTools").click(function() {
    $(".toolLegend").toggle();
    $("#showTools").toggle();
    $("#hideTools").toggle();
  });

  // Show the modal with map information
  $("#infoanchor").click(function(e) {
      e.preventDefault();
      $(".modal").modal("show");  
      return false;  
  });

  // Delays showing the sidebar
  setTimeout(function(){ sidebar.show(); }, 500);

  // // Gradient color on legend bars
  // d3.selectAll(".bar-legend")
  //     .style("background-color", function(d,i){
  //         var color = d3.scale.linear()
  //                       .domain([0, 0.7])
  //                       .range(["#E40066", "#457B9D"]);
  //         // console.log(color(i/10));
  //         return color(i/10);
  //     });
});

