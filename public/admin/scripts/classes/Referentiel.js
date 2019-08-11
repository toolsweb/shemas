import HideShow from "./HideShow.js";

class Referentiel {
  constructor() {
      this.submitReferentiel();
  }

  submitReferentiel = () => {
    $('#form_title_referentiel').submit(e => {
      e.preventDefault();
      const url = '/admin/referentiels/update';
      const input = $('#form_title_referentiel')
        .find('input[name="title"]')
        .val();
      const id = $('#form_title_referentiel')
        .find('input[name="referentiel_id"]')
        .val();

      $.post(url, { title: input, referentiel_id: id }, res => {
        $('#title').html(res.title);
        HideShow.hide_show('#form_title_referentiel', '#title');
      });
    });
  };

  reloadReferentiel = () => {
    // $.get("/admin/referentiels/show/5d3428132aaedc591d670e08", res => {
    //     let result = $(res).find("#referentiel");
    //   console.log(result)
    // });
  };
}

export default Referentiel;
