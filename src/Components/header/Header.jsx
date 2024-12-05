import React from "react";

const Header = () => {
  return (
    <div className="bg-[#fff]">
      <div className="sub-navbar flex justify-between w-[90vw] mx-auto h-[10vh] items-center text-[#FE0000]">
      <div class="text-2xl">
        Portfolio<span>.</span>
      </div>
      <div>
        <ul className="flex space-x-24 text-lg">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Skills</a>
          </li>
          <li>
            <a href="">Experience</a>
          </li>
          <li>
            <a href="">Projects</a>
          </li>
        </ul>
      </div>
   
        <a href="" className="bg-[#FE0000] text-white p-2 rounded-xl text-lg w-[100px] text-center">Contact</a>
      
      </div>
    </div>
  );
};

export default Header;