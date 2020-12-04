import('./pkg').catch(console.error);

var reset_button = document.getElementById("reset_button");
reset_button.onclick = function()
{
  var reset_flagger = document.getElementById("reset_flag");
  reset_flagger.value = (reset_flagger.value % 2) + 1;
}

var pre_button = document.getElementById("dye_button");
pre_button.onclick = function()
{
  var vis_mode = document.getElementById("visualization_mode");
  vis_mode.value = 0;
}

var vel_button = document.getElementById("vel_button");
vel_button.onclick = function()
{
  var vis_mode = document.getElementById("visualization_mode");
  vis_mode.value = 1;
}

var pre_button = document.getElementById("pre_button");
pre_button.onclick = function()
{
  var vis_mode = document.getElementById("visualization_mode");
  vis_mode.value = 2;
}