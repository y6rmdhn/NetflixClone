import React from "react";

const SectionLayout = ({ children }) => {
  return (
    <section className="relative bg-black w-full">
      <div className="grid sm:grid-cols-2 justify-center items-center py-16 gap-16 text-center sm:text-left max-w-7xl mx-auto">
        {children}
      </div>
      <div className="bg-stone-700 w-full absolute top-0 left-0 h-1"></div>
    </section>
  );
};

export default SectionLayout;
