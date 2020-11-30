import('./pkg').catch(console.error);

var reset = function()
{
  var reset_flagger = document.getElementById("reset_flag");
  reset_flagger.value = (reset_flagger.value % 2) + 1;
}

var reset_button = document.getElementById("reset_button");
reset_button.onclick = reset;
