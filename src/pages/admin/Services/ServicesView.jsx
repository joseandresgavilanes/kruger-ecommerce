import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../helpers/products/getAllProducts";
import { postProduct } from "../../../helpers/products/postProduct";
import { getAllCategories } from "../../../helpers/categories/getAllCategories";
import { deleteProduct } from "../../../helpers/products/deleteProduct";
import { putProduct } from "../../../helpers/products/putProduct";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import '../AdminMainPage.css';
import Loading from "../../../components/Loading";

let emptyProduct = {
  name: "",
  description: "",
  stock: "",
  price: "",
  category: null,
  status:null,
  brand:"",
  processor:''
};

export const ServicesView = () => {

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, serCategories] = useState();
  const [check, setCheked] = useState()

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const createProduct = async (product) => {
    const responsePostProduct = await Promise.resolve(postProduct(product));
    return responsePostProduct;
  };

  const updateProduct = async (product) => {
    const responsePutProduct = await Promise.resolve(putProduct(product));
    return responsePutProduct;
  };

  const removeProduct = async (productId) => {
    const responseDeleteProduct = await Promise.resolve(deleteProduct(productId));
    return responseDeleteProduct;
  };

  const getCategories = async () => {
    const responseCategories = await Promise.resolve(getAllCategories());
    serCategories(responseCategories.filter(category=>category.name==='Servicio'));
    setIsLoading(false);
  };

  const getProducts = async () => {
    const responseProducts = await Promise.resolve(getAllProducts());
    setProducts(responseProducts.filter(product=>product.type==='SERVICE'));
    setIsLoading(false);
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const responsePutProduct = updateProduct(_product);
        if (responsePutProduct) {
          const index = findIndexById(product.id);
          _products[index] = _product;
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Servicio actualizado",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo actualizar el producto",
            life: 3000,
          });
        }
      } else {
        _product.images = null;
        _product.type = "SERVICE"
        const responsePostProduct = await createProduct(_product);
        if (responsePostProduct) {
          _product.id = responsePostProduct.id;
          _products.push(_product);
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Producto creado",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo crear el producto",
            life: 3000,
          });
        }
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const onCategoryChange = (e) => {
    setSelectedCategory(e.value);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProductView = () => {
    const responseDeleteProduct = removeProduct(product.id);
    if (responseDeleteProduct) {
      let _products = products.filter((val) => val.id !== product.id);
      setProducts(_products);
      setDeleteProductDialog(false);
      setProduct(emptyProduct);
      toast.current.show({
        severity: "success",
        summary: "Eliminado!",
        detail: "Servicio eliminado",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Algo salio mal!",
        detail: "No se pudo eliminar el producto",
        life: 3000,
      });
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Añadir"
          icon="pi pi-plus"
          className="p-button-success mr-2 p_btn_add"
          onClick={openNew}
        />
        {/* <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        /> */}
      </React.Fragment>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
          title="Editar el servicio"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
          title="Eliminar el servicio"
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Administrar Servicios</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProductView}
      />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <>
    {
      isLoading ? (
      <Loading />
    ) : (
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
  
        <div className="card">
          <Toolbar className="mb-4" right={leftToolbarTemplate}></Toolbar>
  
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectProducts(e.value)}
            dataKey="id"
            paginator
            rows={8}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} - {last} de {totalRecords} productos"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "1rem" }}
              exportable={false}
            ></Column> */}
            <Column
              field="id"
              header="Id"
              sortable
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="name"
              header="Nombre"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="status"
              header="Destacado"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="price"
              header="Precio"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "1px" }}
            ></Column>
            <Column
              field="stock"
              header="Stock"
              sortable
              style={{ minWidth: "0.5rem" }}
            ></Column>
            <Column
              field="salesCounter"
              header="Total vendidos"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="category.name"
              header="Categoria"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="reviews.length"
              header="Reseñas"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              header="Acciones"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
  
        <Dialog
          visible={productDialog}
          style={{ width: "450px" }}
          header="Información de la product"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !product.name })}
            />
            {submitted && !product.name && (
              <small className="p-error">El nombre es obligatorio.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="stock">Stock</label>
            <InputText
              id="stock"
              value={product.stock}
              onChange={(e) => onInputChange(e, "stock")}
              className={classNames({
                "p-invalid": submitted && !product.stock,
              })}
            />
            {submitted && !product.stock && (
              <small className="p-error">El Stock es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="price">Precio</label>
            <InputText
              id="price"
              value={product.price}
              onChange={(e) => onInputChange(e, "price")}
              className={classNames({
                "p-invalid": submitted && !product.price,
              })}
            />
            {submitted && !product.price && (
              <small className="p-error">El Precio es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="brand">Cantidad(GB)</label>
            <InputText
              id="brand"
              value={product.brand}
              onChange={(e) => onInputChange(e, "brand")}
              className={classNames({
                "p-invalid": submitted && !product.brand,
              })}
            />
            {submitted && !product.brand && (
              <small className="p-error">La marca es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="processor">Redes sociales</label>
            <InputText
              id="processor"
              value={product.processor}
              onChange={(e) => onInputChange(e, "processor")}
              className={classNames({
                "p-invalid": submitted && !product.processor,
              })}
            />
            {submitted && !product.processor && (
              <small className="p-error">El Procesador es obligatorio.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Tiempo</label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !product.description,
              })}
            />
            {submitted && !product.description && (
              <small className="p-error">La descripción es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="category">Categoria</label>
            <Dropdown
              value={product.category}
              required
              options={categories}
              onChange={(e) => onInputChange(e, "category")}
              optionLabel="name"
              placeholder="Selecciona la categoría"
            />
            {submitted && !product.category && (
              <small className="p-error">La categoria es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label  htmlFor="status">POPULAR</label>
            <Checkbox   
              type="checkbox"
              onChange={(e) => {
                  product.status === true?
                  product.status = false
                  :
                  product.status = true
                  setCheked(!product.status)
                }} 
              checked={product.status}>
            </Checkbox  >
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Estas seguro que quiere eliminar: <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Estas seguro que deseas eliminar los productos seleccionadas?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    )
    }
    </>
  )
}
