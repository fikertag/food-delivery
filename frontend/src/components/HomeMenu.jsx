import salad1 from "/images/sallad1-.png";
import salad2 from "/images/sallad2-.png";
import MenuItems from "./MenuItems";
import Topic from "./Topic";

const HomeMenu = () => {
  return (
    <section className="mt-10 ">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <img src={salad1} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[150px] right-0 -z-10">
          <img src={salad2} width={107} height={195} alt={"sallad"} />
        </div>
      </div>
      <div className="text-center mb-10">
        <Topic Mainhedder="Don’t Miss Out" subhedder="Your Cart Awaits" />
      </div>
      <div className="grid grid-cols-1 min-[650px]:grid-cols-2 min-[950px]:grid-cols-3 gap-4 justify-center mx-auto w-full">
        <MenuItems />
      </div>
    </section>
  );
};

export default HomeMenu;
