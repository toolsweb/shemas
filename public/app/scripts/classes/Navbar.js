class NavBar {
  constructor() {
    let openNav = document.getElementById('openNav');
    if (!openNav)
        return;
    openNav.addEventListener('click', (e) => {
        this.openNav();
    });
    document.getElementById('closeNav').addEventListener('click', (e) => {
        this.closeNav();
    });

  }

  openNav = () => {
    document.getElementById('sidenav').style.width = '150px';
    document.getElementById('main').style.marginLeft = '150px';
  };

  closeNav = () => {
    document.getElementById('sidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  };
}

export default NavBar;
