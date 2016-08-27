$(function(){
  plan.back();
})
var plan = {
  back: function(){
    $('.btn-back').off('click').on('click' , function(){
        location.href = "mMicrosoft.html#add";
    })
  }
}
