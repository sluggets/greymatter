document.addEventListener("DOMContentLoaded", function() {



});

function textCounter(field, cnt, maxLimit)
{
  var cntField = document.getElementById(cnt);
  if (field.value.length > maxLimit)
  {
    field.value = field.value.substring(0, maxlimit);
  }
  else
  {
    cnt.field.value = maxlimit - field.value.length;
  }
}
