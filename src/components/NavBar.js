// components/NavBar.js
function NavBar({onJobHistoryClick}) {
return (
<div className="container-fluid">
    <nav className="navbar navbar-expand navbar-light">
        <div className="container">
            <a className="navbar-brand" href="/">
                <img src="/static/assets/logo-4x.png" alt="Resource Scanner" width="301px" height="36px" />
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={onJobHistoryClick} href="#">Job History</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
);
}

export default NavBar;

