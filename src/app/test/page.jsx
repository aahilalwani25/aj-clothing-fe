"use client";
import { useEffect, useState } from "react";

const Weather = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [lists, setLists] = useState(null);
  const [paginatedLists,setPaginatedLists]= useState(null);
  const paginationPerPage = 3;
  const [start, setStart] = useState(0);
  const [listLength, setListLength] = useState(0);

  const findValue = async () => {
    console.log(searchValue);
    const res = await fetch(
      `https://superheroapi.com/api.php/9f25481165cc07bbec9146c8084f521d/search/${searchValue}`
    );
    const data = await res.json();
    setLists(data?.results);
    setListLength(lists?.length);
    setPaginatedLists(data?.results);
    console.log(data);
  };

  useEffect(() => {
    if (searchValue) {
      findValue();
    }
  }, [searchValue]);

  useEffect(()=>{
    setPaginatedLists(lists);
  },[start])


  return (
    <div className="flex flex-col text-black">
      <input
        className="border"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {paginatedLists?.splice(start,3).map((list) => (
        <div>{list?.name}</div>
      ))}
      <button onClick={(e)=>{
        e.preventDefault();
        setStart(s=>(s+2));
      }}>Next</button>
    </div>
  );
};

export default Weather;
