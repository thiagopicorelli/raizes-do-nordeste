"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "./_db/cookie";
import { redirect } from 'next/navigation'

export default function Home() {

  useEffect(() => {
    // Check if you are logged in
    redirect("/home");
    let session = getCookie("session");
    if (session.trim().length === 0) {
      redirect("/login");
    } else {
      redirect("/home");
    }

  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    </div>
  );
}
