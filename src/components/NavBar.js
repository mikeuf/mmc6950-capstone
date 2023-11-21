// components/NavBar.js
function NavBar() {
  return (
	  <div className="container-fluid">
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
	  <img src="/static/assets/logo-4x.png" alt="Resource Scanner" width="200px" />
          {/*
          Resource Scanner
          <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="Resource Scanner" width="30" height="24" />
          */}
        </a>
      </div>
    </nav>
      </div>
  );
}

export default NavBar;

