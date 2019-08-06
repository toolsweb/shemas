import Datatable from "./classes/Datatable.js";
import HideShow from "./classes/HideShow.js";

const datatable = new Datatable();
const hideshow = new HideShow();

$("#form_title_referentiel").submit(e => {
  e.preventDefault();
  const url = "/admin/referentiels/update";
  const input = $("#form_title_referentiel")
    .find('input[name="title"]')
    .val();
  const id = $("#form_title_referentiel")
    .find('input[name="referentiel_id"]')
    .val();

  $.post(url, { title: input, referentiel_id: id }, res => {
    $("#title").html(res.title);
    hideshow.hide_show("#form_title_referentiel", "#title");
  });
});

// $.get("/admin/referentiels/show/5d3428132aaedc591d670e08", res => {
//     let result = $(res).find("#referentiel");
//   console.log(result)
// });
