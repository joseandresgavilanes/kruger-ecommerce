import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import '../AdminMainPage.css';
import { getAllUsers } from "../../../helpers/users/getAllUsers";
import Loading from "../../../components/Loading";

let emptyUser = {
  name: "",
  description: "",
  stock: "",
  price: "",
  category: null,
};

export const CustomersView = () => {

  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [selectedUsers, setSelectUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, serCategories] = useState();

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const removeUser = async (userId) => {
    // const responseDeleteUser = await Promise.resolve(deleteUser(userId));
    // return responseDeleteUser;
  };


  const getUsers = async () => {
    const responseUsers = await Promise.resolve(getAllUsers());
    setUsers(responseUsers.filter(user=>user.role==='CUSTOMER'));
    setIsLoading(false);
  };

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };


  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUserView = () => {
    const responseDeleteUser = removeUser(user.id);
    if (responseDeleteUser) {
      let _users = users.filter((val) => val.id !== user.id);
      setUsers(_users);
      setDeleteUserDialog(false);
      setUser(emptyUser);
      toast.current.show({
        severity: "success",
        summary: "Eliminado!",
        detail: "Usuario eliminado",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Algo salio mal!",
        detail: "No se pudo eliminar el cliente",
        life: 3000,
      });
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };

  const deleteSelectedUsers = () => {
    let _users = users.filter((val) => !selectedUsers.includes(val));
    setUsers(_users);
    setDeleteUsersDialog(false);
    setSelectUsers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Users Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedUsers || !selectedUsers.length}
        /> */}
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {

      return (
        <img
          src={rowData.imageUrl?(rowData.imageUrl.startsWith("http")? rowData.imageUrl :`data:image/jpeg;base64,${rowData.imageUrl}`):'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={rowData.imageUrl}
          className="product-image"
        />
      );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Administrar Clientes</h5>
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
  const userDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const deleteUserDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteUserView}
      />
    </>
  );
  const deleteUsersDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedUsers}
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
            value={users}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectUsers(e.value)}
            dataKey="id"
            paginator
            rows={8}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} - {last} de {totalRecords} clientes"
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
              field="image"
              header="Image"
              body={imageBodyTemplate}
            ></Column>
            <Column
              field="verified"
              header="Verificado"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="firstName"
              header="Nombre"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="lastName"
              header="Apellido"
              sortable
              style={{ minWidth: "0.5rem" }}
            ></Column>
            <Column
              field="cellPhone"
              header="Teléfono"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="birthDate"
              header="Nacimiento"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="role"
              header="Rol"
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
          visible={userDialog}
          style={{ width: "450px" }}
          header="Información de la user"
          modal
          className="p-fluid"
          footer={userDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="userName">User name</label>
            <InputText
              id="userName"
              value={user.name}
              onChange={(e) => onInputChange(e, "userName")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !user.userName })}
            />
            {submitted && !user.name && (
              <small className="p-error">El User name es obligatorio.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="stock">Stock</label>
            <InputText
              id="stock"
              value={user.stock}
              onChange={(e) => onInputChange(e, "stock")}
              className={classNames({
                "p-invalid": submitted && !user.stock,
              })}
            />
            {submitted && !user.stock && (
              <small className="p-error">El Stock es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="photoUrl">Foto</label>
            <InputTextarea
              id="photoUrl"
              value={user.photoUrl}
              onChange={(e) => onInputChange(e, "photoUrl")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !user.photoUrl,
              })}
            />
            {submitted && !user.photoUrl && (
              <small className="p-error">La Foto es obligatoria es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Descripción</label>
            <InputTextarea
              id="description"
              value={user.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !user.description,
              })}
            />
            {submitted && !user.description && (
              <small className="p-error">La descripción es obligatoria.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="category">Categoria</label>
            <Dropdown
              value={user.category}
              required
              options={categories}
              onChange={(e) => onInputChange(e, "category")}
              optionLabel="name"
              placeholder="Selecciona la categoría"
            />
            {submitted && !user.category && (
              <small className="p-error">La categoria es obligatoria.</small>
            )}
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteUserDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteUserDialogFooter}
          onHide={hideDeleteUserDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {user && (
              <span>
                Estas seguro que quiere eliminar: <b>{user.firstName} {user.lastName}</b>?
              </span>
            )}
          </div>
        </Dialog>
  
        <Dialog
          visible={deleteUsersDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteUsersDialogFooter}
          onHide={hideDeleteUsersDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {user && (
              <span>
                Estas seguro que deseas eliminar los clientes seleccionadas?
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
