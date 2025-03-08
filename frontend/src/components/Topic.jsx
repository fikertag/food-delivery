const Topic = ({ Mainhedder, subhedder }) => {
  return (
    <>
      <h3 className=" uppercase text-gray-500 font-semibold leading-4 text-xl">
        {subhedder}
      </h3>
      <h2 className=" text-primary font-bold text-3xl sm:text-4xl ">
        {Mainhedder}
      </h2>
    </>
  );
};

export default Topic;
