import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPages, totalProducts }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onchangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  }

  return (
    <Pagination count={numberOfPages}
      page={paramValue}
      defaultPage={1}
      siblingCount={0}
      boundaryCount={2}
      shape="rounded"
      onChange={onchangeHandler}
    />
  );
}

export default Paginations;