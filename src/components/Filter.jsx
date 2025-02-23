import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortBy") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`);
    setCategory(selectedCategory);
  }

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = (prevOrder === "asc") ? "desc" : "asc";
      params.set("sortBy", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    })
  }

  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname });
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input type="text" placeholder="Search products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>

      <div className="flex lg:flex-row flex-col gap-4 items-center">
        <FormControl variant="outlined" size="small"
          className="text-slate-800 border-slate-700">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select labelId="category-select-label" value={category}
            onChange={handleCategoryChange} label="Category"
            className="min-w-[120px] text-slate-800 border-slate-700">
            <MenuItem value="all">All</MenuItem>
            {
              categories.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <Tooltip title="Sorted by price: asc">
          <Button variant="contained" color="primary" onClick={toggleSortOrder} className="flex items-center gap-2 h-10">
            Sort by
            {
              sortOrder === "asc" ? (<FiArrowUp size={20} />) : (<FiArrowDown size={20} />)
            }
          </Button>
        </Tooltip>
        <button onClick={handleClearFilters}
          className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer">
          <FiRefreshCcw className="font-semibold" />
          <span className="font-semibold">Clear filter</span>
        </button>
      </div>
    </div>
  )
}

export default Filter;