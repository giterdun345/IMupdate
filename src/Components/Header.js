const Header = () => {
  return (
    <header
      id="main-header"
      data-height-onload="96"
      data-height-loaded="true"
      data-fixed-height-onload="96"
      style={{top: "0px"}}
    >
      <div className="container clearfix et_menu_container">
        <div className="logo_container">
          <span className="logo_helper"></span>
          <a href="https://illustrativemathematics.org/">
            <img
              src="https://illustrativemathematics.org/wp-content/uploads/2020/10/IM-logo-tag-rgb.svg"
              width="282"
              height="80"
              alt="Illustrative Mathematics K–12 Math"
              id="logo"
              data-height-percentage="90"
              data-actual-width="300"
              data-actual-height="85.9792"
            />
          </a>
        </div>
    
      </div>
    </header>
  );
};

export default Header;
