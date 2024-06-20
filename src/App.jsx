import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fatchData() {
      const url =
        "https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "cb37fcbd97msh0a425bb86af165cp193d0cjsn587969efeec7",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    }
    fatchData();
  }, []);
  console.log(data);

  function handleFilter(e) {
    const filteredData = data.filter((item, index) => {
      if (item.bodyPart.toLowerCase().includes(e)) {
        return true;
      } else false;
    });
    setData(filteredData);
  }

  return (
    <>
      <div className="">
        <div className="px-10 py-2 bg-red-300 flex justify-between items-center">
          <h1 className="text-xl text-red-900 bg-red-200 px-4 py-1 rounded-lg ">
            ExerciseDB
          </h1>
          <input
            type="text"
            placeholder="Search Exercises..."
            className="border-2 my-2 px-2 mr-6 w-1/3"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        <h1 className="text-4xl font-bold py-12 text-center">
          Awesome Exercises You Should Know
        </h1>
        <div className="flex flex-wrap gap-4 px-8">
          {data.map((item, index) => {
            return (
              <>
                <div key={index} className="w-[30%] border-4 rounded-xl">
                  <img src={item.gifUrl} alt="" className="p-4 " />
                  <p className="flex justify-evenly gap-2 mx-2">
                    <span className="bg-green-200 rounded-lg px-2">
                      Bodypart: <strong>{item.bodyPart}</strong>
                    </span>
                    <span className="bg-green-200 rounded-lg px-2">
                      Name: <strong>{item.name}</strong>
                    </span>
                  </p>

                  <p className="px-6 pt-4">Target: {item.target}</p>
                  <p className="px-6 pt-1">
                    SecondaryMuscles: {item.secondaryMuscles}
                  </p>
                  <p className="px-6 pt-1 pb-6">Equipment: {item.equipment}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
