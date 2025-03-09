import pizza from "/images/pizza.png";
import Right from "../components/icons/Right";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex lexend mt-5 justify-between items-center md:px-10 md:mt-10 ">
      <div className="py-8 md:py-12">
        <h1 className="text-3xl sm:text-6xl font-semibold">
          Where Every Bite <br />
          <span className="text-primary ">Delights!</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Make every moment memorable with amazing flavors
        </p>
        <div className="flex gap-4 justify-items-start text-sm">
          <Link
            to={"/menu"}
            className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-2 py-2 rounded-full w-40"
          >
            Order now
            <Right />
          </Link>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={pizza} alt={"pizza"} className=" h-72 w-72" loading="lazy" />
      </div>
    </section>
  );
};

export default Hero;
