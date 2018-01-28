// $('#deleteStudent').click(function(){
//   console.log("hiiii")
//   const studentId = $(this).attr('studentId');
//   $.ajax({
//     type:'POST',
//     url:'/students/delete',
//     data:{ studentId },
//     success: function(res){
//       if(res.result === 'success'){
//         location.href = '/'
//       }     
//     }
//   });
// })
$( document ).ready(function() {

  $('#deleteStudent').click(function(){
    
    const studentId = $(this).attr('studentId');
    $.ajax({
      type:'POST',
      url:'/students/delete',
      data:{ studentId },
      success: function(res){
        if(res.result === 'success'){
          location.href = '/'
        }     
      }
    });
  })







  const changeText = function (el, text, color) {
    el.text(text).css('color', color);
  };
  console.log("hello");
  
  $('.input-password').keyup(function(){
    
    let len = this.value.length;
    const pbText = $('.signup-form .progress-bar_text');

    if (len === 0) {
      $(this).css('border-color', '#2F96EF');
      changeText(pbText, '           ', '#aaa');
    } else if (len > 0 && len <= 4) {
      $(this).css('border-color', '#FF4B47');
      changeText(pbText, 'Too weak', '#FF4B47');
    } else if (len > 4 && len <= 8) {
      $(this).css('border-color', '#F9AE35');
      changeText(pbText, 'Could be stronger', '#F9AE35');
    } else {
      $(this).css('border-color', '#2DAF7D');
      changeText(pbText, 'Strong password', '#2DAF7D');
    } 
  });
});

