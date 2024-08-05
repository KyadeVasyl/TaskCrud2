import { Route, Routes } from "react-router-dom";
import { PRODUCT_CREATE_PAGE_PATH, ProductCreatePage } from "../product-create";
import { PRODUCT_ITEM_PAGE_PATH, ProductItemPage } from "../product-update";
import { PRODUCT_LIST_PAGE_PATH, ProductListPage } from "../product-list";
import { Alert, ALERT_PAGE_PATH } from "../../common/alert";

const Page: React.FC = () => {
  return (
    <Routes>
      <Route path={ALERT_PAGE_PATH} element={<Alert />} />
      <Route path={PRODUCT_CREATE_PAGE_PATH} element={<ProductCreatePage />} />
      <Route path={PRODUCT_LIST_PAGE_PATH} element={<ProductListPage />} />
      <Route path={PRODUCT_ITEM_PAGE_PATH} element={<ProductItemPage />} />
    </Routes>
  );
};

export default Page;
