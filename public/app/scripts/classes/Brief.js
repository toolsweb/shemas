class Brief {
  constructor() {
    this.initSummernote();
    this.animateBrief();
  }

  initSummernote = () => {
    let summernote = $('#summernote');
    if (summernote) {
      $('#summernote').summernote();
    }
  };

  animateBrief = () => {
    $('.post-module').hover(function() {
      $(this)
        .find('.description')
        .stop()
        .animate(
          {
            height: 'toggle',
            opacity: 'toggle'
          },
          300
        );
    });
  };
}

export default Brief;
