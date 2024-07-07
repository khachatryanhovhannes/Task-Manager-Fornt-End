import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import lightStyles from "./indexLight.module.css";
import darkStyles from "./indexDark.module.css";
import { ColorMode } from "../../../models";
import { useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
interface IPaginationProps {
  pageCount: number;
  activePage: number;
  handlePageChange: (arg: number) => void;
}

function Pagination({
  pageCount,
  activePage,
  handlePageChange,
}: IPaginationProps) {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const [styles, setStyles] = useState(lightStyles);
  useEffect(() => {
    if (colorMode === ColorMode.dark) {
      setStyles(darkStyles);
    } else {
      setStyles(lightStyles);
    }
  }, [colorMode]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    handlePageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      containerClassName={styles["pagination-container"]}
      pageClassName={styles["pagination-item"]}
      activeClassName={styles["selected"]}
      disabledClassName={styles["disabled"]}
      breakClassName={styles["break"]}
      previousClassName={styles["pagination-item"]}
      nextClassName={styles["pagination-item"]}
      breakLabel="..."
      nextLabel={`${t("TASKS.NEXT")}>`}
      forcePage={activePage - 1}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={`<${t("TASKS.PREVIOUS")}`}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
