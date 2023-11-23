import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-white text-white pt-8 bg-opacity-5">
      <div className="container mx-auto flex flex-col items-center grid grid-cols-3 grid-rows-1">
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">Services</h2>
          <ul className="space-x-4">
            <li className="glow-text">Blockchain Development</li>
            <li className="glow-text">Web Development</li>
            <li className="glow-text">Business Solutions</li>
          </ul>
        </div>
        <div className="p-10">
          <h2 className="text-3xl text-orange-500 font-bold mt-6 mb-4">
            Products
          </h2>
          <ul className="space-x-4">
            <li>
              <a
                href="https://blogchaindaily.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-text text-xl"
              >
                Blog-Chain Daily
              </a>
            </li>
          </ul>
          <br></br>
          <p>
            Join me on a journey through the latest trends, news, and expert
            analysis in the ever-evolving blockchain and cryptocurrency space.
          </p>
        </div>
        <div className="p-10">
          <h2 className="text-3xl text-orange-500 font-bold mt-6 mb-4">
            Connect with Me
          </h2>
          <p>
            If you're looking for a passionate developer who can bring your
            ideas to life, feel free to reach out. Let's collaborate and create
            something amazing!
          </p>
          <br></br>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/nikil-sri-shen/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="inline-block w-6 h-6" />
            </a>
            <a
              href="mailto:nikilsrishen@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMail className="inline-block w-6 h-6" />
            </a>
            <a
              href="https://github.com/nikil-sri-shen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white text-xl text-black p-0">
        <p>©️ Nikil Sri Shen 2023 💖.</p>
        <img src="/bmc.png" className="h-6 w-20" alt="Buy Me a Coffee"></img>
      </div>
    </footer>
  );
};

export default Footer;
