import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-slate-300 dark:border-slate-600 mt-auto">
        <div className="flex flex-col md:flex-row justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>© 2023 BlogSpace by DevUI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    // <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
    //   <div className="relative z-10 mx-auto max-w-7xl px-4">
    //     <div className="-m-6 flex flex-wrap">
    //       <div className="w-full p-6 md:w-1/2 lg:w-5/12">
    //         <div className="flex h-full flex-col justify-between pt-15">
    //           <div className="mb-4 inline-flex justify-center">
    //             <Link>BlogSpace</Link>
    //           </div>
    //           <div>
    //             <p className="text-sm text-gray-600">
    //               &copy; Copyright 2023. All Rights Reserved by DevUI.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Company
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Features
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Pricing
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Affiliate Program
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Press Kit
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Support
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Account
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Help
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Contact Us
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Customer Support
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className="w-full p-6 md:w-1/2 lg:w-3/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Legals
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Terms &amp; Conditions
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Privacy Policy
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Licensing
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default Footer