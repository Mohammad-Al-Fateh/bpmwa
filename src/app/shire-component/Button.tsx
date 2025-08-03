/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function Button({ PropsIcon, name }: any) {
  return (
    <button className="bg-cyan-950 flex justify-center items-center gap-2 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
      <PropsIcon size={18} />
      {name}
    </button>
  );
}
