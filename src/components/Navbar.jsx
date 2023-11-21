import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <div className="p-3 top-0 left-0 right-0 z-100 backdrop-blur-md bg-opacity-30 navbar">
      <ul className="flex">
        <li className="mr-20 glow-text text-3xl">
          <a href="/">
            DecWiki.<span className="text-sm">org</span>
          </a>
        </li>
        <li className="mr-10 glow-text text-xl flex">
          <a href="/registration" className="flex">
            <FaUser size={24} className="mr-2" />
            User Registration
          </a>
        </li>
        <li className="mr-10 glow-text text-xl flex">
          <a href="/publish" className="flex">
            <IoMdCreate size={24} className="mr-2" />
            Publish Article
          </a>
        </li>
        <li className="mr-6 glow-text text-xl flex">
          <a href="/search" className="flex">
            <FaSearch size={24} className="mr-2" />
            Search Article
          </a>
        </li>
        <div className="flex ml-auto">
          <li className="mr-6 glow-text">
            <a
              href="https://www.linkedin.com/in/nikil-sri-shen/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="inline-block w-6 h-6" />
            </a>
          </li>
          <li className="mr-6 glow-text">
            <a
              href="mailto:nikilsrishen@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMail className="inline-block w-6 h-6" />
            </a>
          </li>
          <li className="mr-6 glow-text">
            <a
              href="https://github.com/nikil-sri-shen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block w-6 h-6" />
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
