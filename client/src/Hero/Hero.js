import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import mobileSmal from '../assets/mobileSmal.png'
import ipad from '../assets/ipad.png'
import laptop from '../assets/laptop.png'
import tv from '../assets/tv.png'

export default function Hero() {
  const navigate = useNavigate();
  useEffect(() => {
    // if(auth==true){
    //   navigate("/dash");
    // }
  }, [])
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-[#1a1a1a] to-[#2c2c2c] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#3b3b3b]">
        <Link
          className="flex items-center justify-center text-size font-bold text-orange-300"
          href="#"
        >
          CINI MOVIES
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <span
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-[#ff9900] hidden md:block cursor-pointer"
            onClick={()=>navigate("login")}
          >
            Movies
          </span>
          <span
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-[#ff9900] hidden lg:block cursor-pointer"
            onClick={()=>navigate("login")}
          >
            TV Shows
          </span>
          <span
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-[#ff9900] hidden xl:block cursor-pointer"
            onClick={()=>navigate("login")}
          >
            Originals
          </span>
          <span
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-[#ff9900] hidden 2xl:block cursor-pointer"
            onClick={()=>navigate("login")}
          >
            Sports
          </span>
          <span
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-[#ff9900] hidden 2xl:block cursor-pointer"
            onClick={()=>navigate("login")}
          >
            Kids
          </span>
        </nav>
        <div className="ml-auto flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <span
            className="hover:text-[#ff9900] hidden sm:inline-flex mt-2 cursor-pointer"
            variant="outline"
            onClick={()=>navigate("/signup")}
          >
            Sign-Up
          </span>
          <button
            className="hover:text-[#ff9900] hidden sm:inline-flex mt-2 cursor-pointer"
            variant="outline"
            onClick={()=> navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section>
          <div className="container px-4 md:px-6 text-center absolute mt-44">
            <h1 className="text-5xl font-extralight sm:text-5xl md:text-6xl lg:text-7xl animate-pulse pt-10">
              Unlimited Movies, TV Shows, and More.
            </h1>
            <p className="max-w-[600px] mx-auto mt-4 text-lg md:text-xl">
              Watch anywhere. Cancel anytime.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="px-8 py-3 rounded-md bg-[#ff9900] text-black hover:bg-[#e68a00] focus:ring-2 focus:ring-[#ff9900] focus:outline-none">
                Get Started
              </button>
            </div>
          </div>
          <div
            className="w-full bg-contain bg-center mt-0"
            style={{
              backgroundSize: "120%",
              backgroundImage:
                "url('https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
              height: "682px",
              display: "block", // Default to block display
              ...(window.innerWidth <= 76 && { display: "none" }), // Hide for smaller devices
            }}
          ></div>
        </section>
        <section className="w-full pb-12 md:py-24 lg:pb-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold animate-pulse">
                Watch on Any Device.
              </h2>
              <p className="text-lg text-gray-400">
                Stream movies & TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <img
                alt="Device 1"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform size-20 cursor-pointer"
                src={mobileSmal}
                style={{
                  objectFit: "cover",
                }}
              />
              <img
                alt="Device 2"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform size-20 cursor-pointer"
                src={ipad}
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
              />
              <img
                alt="Device 3"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform size-20 cursor-pointer"
                src={laptop}
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
              />
              <img
                alt="Device 4"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform size-20 cursor-pointer"
                src={tv}
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#232F3E]">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <img
                alt="Title 1"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform h-[300px] w-[430px] object-contain cursor-pointer"
                src="https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <img
                alt="Title 2"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform object-contain cursor-pointer"
                src="https://wallpaperswide.com/download/xbox_one_console-wallpaper-2560x1920.jpg"
                style={{
                  width: "450px",
                  height: "300px",
                }}
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 ml-16">
              <h2 className="text-3xl font-bold animate-pulse">
                Enjoy on Your TV.
              </h2>
              <p className="text-lg text-gray-400">
                Watch on Smart TVs, Fire TV Stick, Roku, Xbox, PlayStation, and
                more.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold animate-pulse">
                Create Profiles for Kids.
              </h2>
              <p className="text-lg text-gray-400">
                Set up family profiles to give kids access to age-appropriate
                content with easy-to-use parental controls.
              </p>
            </div>
            <img
              alt="CINI Prime Kids"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
              src="https://media.gettyimages.com/id/1716777307/photo/little-boy-watching-cartoons-at-home.jpg?s=612x612&w=gi&k=20&c=v93Hksawugs1wCdq9ypYJUPzoFrS3iad3llHnGC805c="
              style={{
                objectFit: "contain",
              }}
              width="500"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#232F3E]">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#37475A] rounded-lg p-6 space-y-2 hover:bg-[#4a5b70] transition-colors cursor-pointer">
                <h3 className="text-xl font-bold">CINI Video</h3>
                <p className="text-4xl font-bold">₹99</p>
                <p className="text-gray-400">per month</p>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    Stream on 3 devices at a time
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    HD and Ultra HD available
                  </li>
                </ul>
                <br />
                <br />
                <br />
                <br />
                <button className="lg:mt-5 w-full bg-[#ff9900] text-black hover:bg-[#e68a00] focus:ring-2 focus:ring-[#ff9900] focus:outline-none rounded-xl">
                  Subscribe
                </button>
              </div>
              <div className="bg-[#37475A] rounded-lg p-6 space-y-2 hover:bg-[#4a5b70] transition-colors cursor-pointer">
                <h3 className="text-xl font-bold">CINI Prime</h3>
                <p className="text-4xl font-bold">₹149</p>
                <p className="text-gray-400">per month</p>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    CINI Video
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    Free 2-day shipping
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    Prime Music
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    Prime Reading
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ff9900]" />
                    Prime Gaming
                  </li>
                </ul>
                <button className="w-full bg-[#ff9900] text-black hover:bg-[#e68a00] focus:ring-2 focus:ring-[#ff9900] focus:outline-none rounded-xl">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold animate-pulse">
                Choose One Plan and Enjoy Everything.
              </h2>
              <p className="text-lg text-gray-400">
                CINI Prime offers a wide selection of movies, TV shows, and
                more. Stream on any device, anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-br from-[#1a1a1a] to-[#2c2c2c] py-6 px-4 md:px-6 border-t border-[#3b3b3b]">
        <div className="container flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-orange-300 font-bold">CINI Prime</h3>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <Link
              className="text-sm hover:underline hover:text-[#ff9900]"
              href="#"
            >
              Help
            </Link>
            <Link
              className="text-sm hover:underline hover:text-[#ff9900]"
              href="#"
            >
              Your Prime Membership
            </Link>
            <Link
              className="text-sm hover:underline hover:text-[#ff9900]"
              href="#"
            >
              Terms of Use
            </Link>
            <Link
              className="text-sm hover:underline hover:text-[#ff9900]"
              href="#"
            >
              Privacy Notice
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function PackagePlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16h6" />
      <path d="M19 13v6" />
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  )
}