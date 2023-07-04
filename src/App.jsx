import {useState, useEffect} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css";
import {HiOutlineArrowSmRight, HiOutlineArrowSmLeft} from "react-icons/hi";

export default function App() {
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const data = response.data;

      const slice = data.slice(offset, offset + perPage);
      const postData = slice.map((data) => (
        <div key={data.id} className="data">
          <p>{data.title}</p>
          <img src={data.thumbnailUrl} alt="" width={40} height={40} />
        </div>
      ));

      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
    } catch (erorr) {
      console.log("Failed to fetch the data");
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className="app">
      {data}
      <ReactPaginate
        previousLabel={
          <span style={{alignItems: "center", justifyItems: "center",display:'flex'}}>
            <HiOutlineArrowSmLeft />
            <i>Prev</i>
          </span>
          
        }
        nextLabel={
          <span style={{alignItems: "center", justifyItems: "center",display:'flex'}}>
            <i>Next</i>
            <HiOutlineArrowSmRight />
          </span>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages_pagination"}
        activeClassName={"active"}
        className="paginator"
      />
    </div>
  );
}
