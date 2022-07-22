import Navbar from "./interfaces/Navbar";

function Header() {
  return (
    <>
      <div className="Header">
        <h1 className="header-title">
          <a className="refresh" href="http://localhost:3000/">
            Moohyun Kang
          </a>
        </h1>
      </div>
      <Navbar />
    </>
  );
}

export default Header;