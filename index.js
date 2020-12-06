import('./pkg').catch(console.error);

$(document).ready(function()
{
  $("#reset_button").click(function()
  {
    $("#reset_flag").val(function(_i, oldVal)
    {
      return (oldVal % 2) + 1;
    });
  });

  $("#figure_select").val(0);
  $("#visualization_mode").val(0);

  $("#dye_button").click(function()
  {
    $("#visualization_mode").val(0);
    $(this).addClass("is-primary is-hovered");
    $("#vel_button").removeClass("is-primary is-hovered");
    $("#pre_button").removeClass("is-primary is-hovered");
  });

  $("#vel_button").click(function()
  {
    $("#visualization_mode").val(1);
    $(this).addClass("is-primary is-hovered");
    $("#dye_button").removeClass("is-primary is-hovered");
    $("#pre_button").removeClass("is-primary is-hovered");
  });

  $("#pre_button").click(function()
  {
    $("#visualization_mode").val(2);
    $(this).addClass("is-primary is-hovered");
    $("#dye_button").removeClass("is-primary is-hovered");
    $("#vel_button").removeClass("is-primary is-hovered");
  });

  $("#square_button").click(function()
  {
    $("#figure_select").val(0);
    $(this).addClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#circle_button").click(function()
  {
    $("#figure_select").val(1);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#triangle_button").click(function()
  {
    $("#figure_select").val(2);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#nothing_button").click(function()
  {
    $("#figure_select").val(4);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#squares_button").click(function()
  {
    $("#figure_select").val(5);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#circles_button").click(function()
  {
    $("#figure_select").val(6);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#triangles_button").click(function()
  {
    $("#figure_select").val(7);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#mixed_1_button").click(function()
  {
    $("#figure_select").val(8);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#mixed_2_button").click(function()
  {
    $("#figure_select").val(9);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#mixed_3_button").click(function()
  {
    $("#figure_select").val(10);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#mixed_4_button").click(function()
  {
    $("#figure_select").val(11);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_5_button").removeClass("is-primary is-hovered");
  });

  $("#mixed_5_button").click(function()
  {
    $("#figure_select").val(12);
    $(this).addClass("is-primary is-hovered");
    $("#square_button").removeClass("is-primary is-hovered");
    $("#circle_button").removeClass("is-primary is-hovered");
    $("#triangle_button").removeClass("is-primary is-hovered");
    $("#nothing_button").removeClass("is-primary is-hovered");
    $("#squares_button").removeClass("is-primary is-hovered");
    $("#circles_button").removeClass("is-primary is-hovered");
    $("#triangles_button").removeClass("is-primary is-hovered");
    $("#mixed_1_button").removeClass("is-primary is-hovered");
    $("#mixed_2_button").removeClass("is-primary is-hovered");
    $("#mixed_3_button").removeClass("is-primary is-hovered");
    $("#mixed_4_button").removeClass("is-primary is-hovered");
  });

});



var influx_slider = document.getElementById("influx_slider");
influx_slider.value = 0;
influx_slider.oninput = function()
{
  var data = document.getElementById("influx_data");
  data.innerHTML = influx_slider.value + "°";
}

var jacobi_slider = document.getElementById("jacobi_slider");
jacobi_slider.value = 20;
jacobi_slider.oninput = function()
{
  var data = document.getElementById("jacobi_data");
  data.innerHTML = jacobi_slider.value;
}

var viscosity_slider = document.getElementById("viscosity_slider");
viscosity_slider.value = -6;
viscosity_slider.oninput = function()
{
  var data = document.getElementById("viscosity_data");
  data.innerHTML = "1e" + viscosity_slider.value;
}

var vorticity_slider = document.getElementById("vorticity_slider");
vorticity_slider.value = 10;
vorticity_slider.oninput = function()
{
  var data = document.getElementById("vorticity_data");
  data.innerHTML = vorticity_slider.value;
}

var obstacle_slider = document.getElementById("obstacle_slider");
obstacle_slider.value = 32;
obstacle_slider.oninput = function()
{
  var data = document.getElementById("obstacle_data");
  data.innerHTML = obstacle_slider.value;
}

var magnitude_slider = document.getElementById("magnitude_slider");
magnitude_slider.value = 1;
magnitude_slider.oninput = function()
{
  var data = document.getElementById("magnitude_data");
  data.innerHTML = magnitude_slider.value;
}
