class HideShow {
  constructor() {
    const $button = $(".level").clone();
    $("#left").html($button);
    $("#right > .level").remove();
    $(".competence").click(e => {
      this.hide_show(".level", ".level_" + e.target.classList[1]);
    });
    $("#edit-title").click(e => {
      this.hide_show("#title", "#form_title_referentiel");
    });
  }

  hide_show = (hide, show) => {
    $(hide).hide();
    $(show).show();
  };
}

export default HideShow;
