import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalScroll = ({ items, renderItem, itemClass = "" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center w-full">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft className="text-gray-400" size={36} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollBehavior: "smooth", overflow: "hidden" }}
      >
        {items.map((item, idx) => (
          <div key={idx} className={itemClass}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight className="text-gray-400" size={36} />
      </button>
    </div>
  );
};

export default HorizontalScroll; 