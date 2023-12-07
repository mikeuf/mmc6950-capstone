function NavBar({onJobHistoryClick, onDestinationsClick}) {
return (
<div className="container-fluid bg-light">
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">
                <img src="/static/assets/logo-4x.png" alt="Resource Scanner" width="200px" height="24px" />
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" onClick={onDestinationsClick} href="#">Destinations</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={onJobHistoryClick} href="#">Job History</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
);
}

export default NavBar;

