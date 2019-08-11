import Previews from './classes/Previews.js';
import NavBar from './classes/Navbar.js';
import Brief from './classes/Brief.js';

let previews = new Previews();
let navbar = new NavBar();
let brief = new Brief();

$('.link_register').click(e => {
  e.preventDefault();
  $('.card').hide();
  $('.register').show();
});

$('.link_login').click(e => {
    e.preventDefault();
    $('.card').hide();
    $('.login').show();
  });