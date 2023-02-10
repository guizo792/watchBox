import { ReactComponent as ArrowUp } from "../../../assets/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/arrow-down.svg";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Download } from "../../../assets/download.svg";

const VideoInfos = ({ video }) => {
  return (
    // <div className="video-infos-container flex flex-col gap-y-5 py-3 px-5">
    //   <div className="title font-bold text-xl	">Cooking chinese food</div>
    //   <div className="other-infos flex gap-5 items-center justify-around basis-1 flex-wrap">
    //     <div className="channel flex gap-5 flex-nowrap items-center">
    //       <div className="channel-img">
    //         <img
    //           src="./images/channel1.jpeg"
    //           alt="channel"
    //           className="w-14 h-14 rounded-full border-[3px] border-pink-700 border-solid"
    //         />
    //       </div>
    //       <div className="flex flex-col justify-around">
    //         <div className="channel-name font-medium text-[16px]">
    //           Asian Food
    //         </div>
    //         <div className="channel-subscribers text-[16px]">32.3K subs</div>
    //       </div>
    //     </div>
    //     <div className="subscribe-btn">
    //       <button
    //         type="button"
    //         class=" focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 f rounded-lg px-3 py-1 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900 text-[20px]"
    //       >
    //         Subscribe
    //       </button>
    //     </div>
    //     <div className="like-dislike flex gap-2 flex-nowrap	">
    //       <button
    //         title="Like"
    //         className="like flex flex-nowrap items-center gap-2"
    //       >
    //         <ArrowUp className="w-8 h-8" />
    //         <span className="text-[20px]">34k</span>
    //       </button>
    //       <button
    //         title="Dislike"
    //         className="dislike flex flex-nowrap items-center gap-2 "
    //       >
    //         <ArrowDown className="w-8 h-8" />{" "}
    //         <span className="text-[20px]">1k</span>
    //       </button>
    //     </div>
    //     <button title="Share" className="share-btn">
    //       <Share className="w-8 h-8" />
    //     </button>

    //     <button title="Download" className="download-btn">
    //       <Download className="w-8 h-8" />
    //     </button>
    //   </div>
    //   <div className="p-3 border-solid border-black border-[1px] rounded flex flex-col gap-2">
    //     <div className="text-md text-gray-600 font-medium">
    //       43,760 views Sep 7, 2021
    //     </div>
    //     <div className="text-black-900">
    //       Learn how to find cool chinese food in china. Comments are welcomed
    //       bla bla bla, well this is a brief description for this video
    //     </div>
    //     <div className="tags flex gap-4 flex-wrap">
    //       <span className="bg-gray-800 text-pink-500 font-medium px-2 rounded">
    //         food
    //       </span>
    //       <span className="bg-gray-800 text-pink-500 font-medium px-2 rounded">
    //         chinese
    //       </span>
    //       <span className="bg-gray-800 text-pink-500 font-medium px-2 rounded">
    //         delicious food
    //       </span>
    //       <span className="bg-gray-800 text-pink-500 font-medium px-2 rounded">
    //         travel world{" "}
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div class="flex md:order-2">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default VideoInfos;
