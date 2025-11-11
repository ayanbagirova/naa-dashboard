import "../css/Sidebar.css";
import logo from "../assets/Frame 299.png";
import React, { useState } from "react";
import user from "../assets/Frame 307.png";
import {
  Home,
  BookOpen,
  CloudRain,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  Landmark
} from "lucide-react";


type MenuKey = "naa" | "library" | "meteorology" | "museum" | null;

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<MenuKey>("naa");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (key: MenuKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <>
    
      <button
        className="mobile-open-btn"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        ☰
      </button>

      <aside className={`panel ${mobileOpen ? "mobile-visible" : ""}`}>
        <div className="panel-inner">
          <header className="panel-header">
            <div className="brand">
              <img src={logo} alt="NAA logo" className="brand-logo" />
            </div>
            <button
              className="mobile-close"
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </header>

          <nav className="panel-nav" aria-label="Sidebar">
            <div className={`group ${openMenu === "naa" ? "open" : ""}`}>
              <button
                className="group-btn active-style"
                onClick={() => toggle("naa")}
                aria-expanded={openMenu === "naa"}
              >
                <div className="left">
                  <span className="icon-wrap">
                    <Home size={18} />
                  </span>
                  <span className="label">NAA Website</span>
                </div>
                <span className="chev">
                  {openMenu === "naa" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

            
              {openMenu === "naa" && (
                <div className="dropdown-card">
                  <button className="drop-item selected">Post</button>
                  <button className="drop-item">Media Library</button>
                  <button className="drop-item">System Settings</button>
                </div>
              )}
            </div>

          
            <div className={`group ${openMenu === "library" ? "open" : ""}`}>
              <button className="group-btn" onClick={() => toggle("library")}>
                <div className="left">
                  <span className="icon-wrap">
                    <BookOpen size={18} />
                  </span>
                  <span className="label">Library</span>
                </div>
                <span className="chev">
                  {openMenu === "library" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {openMenu === "library" && (
                <div className="dropdown-card">
                  <button className="drop-item">All Items</button>
                  <button className="drop-item">Categories</button>
                </div>
              )}
            </div>

           
            <div className={`group ${openMenu === "meteorology" ? "open" : ""}`}>
              <button className="group-btn" onClick={() => toggle("meteorology")}>
                <div className="left">
                  <span className="icon-wrap">
                    <CloudRain size={18} />
                  </span>
                  <span className="label">Meteorology</span>
                </div>
                <span className="chev">
                  {openMenu === "meteorology" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {openMenu === "meteorology" && (
                <div className="dropdown-card">
                  <button className="drop-item">Stations</button>
                  <button className="drop-item">Forecasts</button>
                </div>
              )}
            </div>

           
            <div className={`group ${openMenu === "museum" ? "open" : ""}`}>
              <button className="group-btn" onClick={() => toggle("museum")}>
                <div className="left">
                  <span className="icon-wrap">
                 <Landmark/>
                  </span>
                  <span className="label">Museum</span>
                </div>
                <span className="chev">
                  {openMenu === "museum" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {openMenu === "museum" && (
                <div className="dropdown-card">
                  <button className="drop-item">Exhibits</button>
                  <button className="drop-item">Collections</button>
                </div>
              )}
            </div>
          </nav>

          <div className="panel-footer">
            <button className="settings-btn">
              <span className="settings-left">
                <Settings size={16} />
                <span>Settings</span>
              </span>
            </button>

            <div className="user-card">
              <img src={user} alt="Khayal" className="avatar" />
              <div className="user-meta">
                <div className="name">Khayal Ahmadli</div>
                <div className="username">khahmadli</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

    
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
};

export default Sidebar;