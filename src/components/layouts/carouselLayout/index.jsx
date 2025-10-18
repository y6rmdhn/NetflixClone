import React, { useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CarouselLayout = ({ children }) => {
  const ref = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollstate = () => {
    const el = ref.current;
    setIsAtStart(el.scrollLeft == 0);
    setIsAtEnd(el.scrollLeft + el.offsetWidth >= el.scrollWidth);
  };

  const scroll = (offset) => {
    const el = ref.current;
    el.scrollLeft += offset;
    updateScrollstate();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute left-0 w-full h-full px-2">
        {!isAtStart ? (
          <button
            onClick={() => scroll(-500)}
            className="z-20 text-white h-80 w-10"
          >
            <GoChevronLeft size={40} />
          </button>
        ) : (
          <div className="h-56 w-10 mt-5"></div>
        )}
        {!isAtEnd && (
          <button
            onClick={() => scroll(500)}
            className="z-20 text-white h-80 w-10"
          >
            <GoChevronRight size={40} />
          </button>
        )}
      </div>
      <div
        ref={ref}
        onScroll={updateScrollstate}
        className="carousel relative scroll-smooth space-x-2"
      >
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {!isAtStart && (
          <div className="absolute w-20 left-0 top-0 bottom-0 bg-gradient-to-r from-[#1D232A] to-transparent z-10"></div>
        )}
        {!isAtEnd && (
          <div className="absolute w-20 right-0 top-0 bottom-0 bg-gradient-to-l from-[#1D232A] to-transparent z-10"></div>
        )}
      </div>
    </div>
  );
};

export default CarouselLayout;
