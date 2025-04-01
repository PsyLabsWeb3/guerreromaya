import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import iconSmall from "../../../src/assets/icons/iconGMsmall.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        zIndex: 1000,
        borderBottom: "0.2px solid rgba(255, 255, 255, 0.4)",
        height: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 1rem",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <img
            src={iconSmall}
            alt="Logo"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "2.5rem",
              maxHeight: "2.5rem",
            }}
          />
        </Link>

        {/* Hamburger Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1001,
            }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        )}

        {/* Navigation Links */}
        <div
          style={{
            display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex",
            position: isMobile ? "fixed" : "static",
            top: isMobile ? "0" : "auto",
            right: isMobile ? "0" : "auto",
            height: isMobile ? "100vh" : "auto",
            width: isMobile ? "250px" : "auto",
            backgroundColor: isMobile ? "rgba(0, 0, 0, 0.95)" : "transparent",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            padding: isMobile ? "4rem 1rem" : "0",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <NavLink to="/mini-games">Mini Games</NavLink>
          <NavLink to="/mzcal" special>
            $MZCAL
          </NavLink>
          <NavLink to="/kukulcan">Kukulcan-AI</NavLink>
          <NavLink to="/docs">Docs</NavLink>
          {isMobile && (
            <NavLink to="/barrels" special presale>
              Presale
            </NavLink>
          )}
        </div>
        {!isMobile && (
          <NavLink to="/barrels" special presale>
            Presale
          </NavLink>
        )}
      </div>
    </nav>
  );
};

// Componente auxiliar para los enlaces
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  special?: boolean;
  presale?: boolean;
}

const NavLink = ({ to, children, special, presale }: NavLinkProps) => {
  const isMobile = window.innerWidth <= 768;
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        color: special ? "#f9b064" : "#fff",
        textDecoration: "none",
        margin: isMobile ? "1rem 0" : "0 1rem",
        fontFamily: "inter",
        fontSize: presale ? "1.5rem" : "1rem",
        transition: "all 0.3s ease",
        display: "block",
        position: "relative",
        paddingBottom: "0.25rem",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = "#f9b064";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = special ? "#f9b064" : "#fff";
      }}
    >
      {children}
      {isActive && (
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#f9b064",
            transition: "width 0.3s ease",
          }}
        />
      )}
    </Link>
  );
};

export default Navigation;
