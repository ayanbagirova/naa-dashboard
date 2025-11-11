import { useState } from "react";
import "../css/PostFilterBar.css";
import { Search } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: {
    type: string;
    status: string;
    search: string;
  }) => void;
}

export default function PostFilterBar({ onFilterChange }: FilterBarProps) {
  const [type, setType] = useState("All Posts");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");

  const handleTypeChange = (newType: string) => {
    setType(newType);
    onFilterChange({ type: newType, status, search });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange({ type, status: newStatus, search });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onFilterChange({ type, status, search: val });
  };

  return (
    <div className="filterbar-container">
      <div className="dropdown-group">
        {/* Post Type Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">
            {type} <span className="arrow">▾</span>
          </button>
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleTypeChange("All Posts")}
            >
              All Posts
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleTypeChange("News")}
            >
              News
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleTypeChange("Announcement")}
            >
              Announcements
            </div>
          </div>
        </div>

       
        <div className="dropdown">
          <button className="dropdown-btn">
            {status} <span className="arrow">▾</span>
          </button>
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleStatusChange("All Status")}
            >
              All Status
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleStatusChange("Published")}
            >
              <span className="dot green"></span> Active
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleStatusChange("Inactive")}
            >
              <span className="dot red"></span> Inactive
            </div>
          </div>
        </div>
      </div>

    
      <div className="search-box">
        <span className="search-icon"><Search/></span>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}