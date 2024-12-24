import Car from "../assets/ferrari.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Background from "../assets/background.svg";
import Car2 from "../assets/wing.png";
import Car3 from "../assets/frontwingdoors.png";
import BottomBar from "../components/BottomBar";
import Stats from "../components/Stats";

const Home = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const containerRef = useRef(null);
  const lastDivRef = useRef(null);
  const contactDivRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const baseScale =
    dimensions.width > 768 ? (dimensions.width / 1440) * 0.85 : 0.75;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1], // Two-point range for immediate transition
    [1, 0.1] // Dramatic scale reduction
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  const observeElement = (ref: any, setVisibility: any) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibility(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [ref, setVisibility]);
  };

  // Observing elements
  observeElement(lastDivRef, setIsVisible);
  observeElement(contactDivRef, setContactVisible);
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, hasAnimated]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 200, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0, delay: 0 }}
      className="relative bg-black rounded-3xl my-6 px-6 py-4 overflow-hidden a"
    >
      {/* Exclusive text */}
      <div className="flex justify-center">
        <motion.h1
          initial={{ y: -200, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0, delay: 0.1 }}
          style={{
            fontSize:
              dimensions.width > 768
                ? (dimensions.width / 1440) * 336
                : undefined,
          }}
          className="font-anton text-transparent bg-gradient-to-t from-black to-red-500 bg-clip-text flex z-10 text-[5rem] md:text-[21rem] leading-none text-center drop-shadow-[4px_4px_10px_rgba(0,0,0,0.75)]"
        >
          FERRARI
        </motion.h1>
      </div>
      <img
        src={Background}
        className="w-full absolute -top-16 -left-8 md:-left-24 -scale-x-150 -rotate-[15deg]"
      />
      {/* Stats and car image */}
      <div className="flex md:flex-row flex-col-reverse justify-center jus -mt-8 md:-mt-28 relative z-10">
        <motion.img
          style={{
            scale: imageScale,
          }}
          initial={{ y: 200, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: baseScale }}
          transition={{ duration: 0, delay: 0.1 }}
          className="md:w-2/3 a transform"
          src={Car}
          alt="Car"
        />
        <div className="" id="lastdiv" ref={lastDivRef}></div>
      </div>

      <div>
        <div className="flex justify-center md:mt-36 lg:mt-44" id="lastdiv" ref={lastDivRef}>
          <motion.h1
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={hasAnimated ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize:
                window.innerWidth > 768
                  ? (window.innerWidth / 1440) * 336
                  : undefined,
            }}
            className="font-anton text-transparent bg-gradient-to-t from-black to-red-500 bg-clip-text flex z-10 text-[5rem] md:text-[21rem] leading-none text-center"
          >
            LAFERRARI
          </motion.h1>
        </div>

        {/* Stats and car image */}
        <div className="flex md:flex-row flex-col-reverse justify-center -mt-8 md:-mt-28 relative z-10">
          <motion.img
            initial={{ y: 200, opacity: 0, scale: 0.5 }}
            animate={hasAnimated ? { y: 0, opacity: 1, scale: 0.75 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-2/3 transform"
            src={Car3}
            alt="Car"
          />
        </div>

        {/* Info section */}
        <div className="hidden md:block">
          <BottomBar />
        </div>

        <div id="2" className="flex-col justify-center md:mt-36 lg:mt-44" ref={contactDivRef}>
          <motion.h1
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={contactVisible ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize:
                dimensions.width > 768
                  ? (dimensions.width / 1440) * 336
                  : undefined,
            }}
            className="font-anton text-transparent bg-gradient-to-t from-black to-red-500 bg-clip-text flex z-10 text-[5rem] md:text-[21rem] leading-none text-center"
          >
            CONTACT
          </motion.h1>
          <div className="flex md:flex-row flex-col-reverse justify-center -mt-8 md:-mt-28 relative z-10">
            <div className="md:w-1/3 md:mt-28 md:pl-10">
              <Stats />
            </div>
            <motion.img
              style={{
                scale:
                  dimensions.width > 768 ? dimensions.width / 1440 : undefined,
              }}
              initial={{ x: 1000, opacity: 0 }}
              animate={contactVisible ? { x: -65, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-2/3 transform mb-10"
              src={Car2}
              alt="Car2"
            />
          </div>
          <img
            src={Background}
            className="w-full absolute top-1/4 -left-8 md:-left-52 -scale-x-150 -rotate-[305deg]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
