import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUserPhoto from "../../../assets/defaultUserPhoto.jpg";
import camera from "../../../assets/camera.png";
import "./Profile.scss";
import ConvertImageToBase64 from "./ConvertImageToBase64";
import { updatePersonalInfo } from "../../../helpers/users/updatePersonalInfo";
import { setCurrentUser } from "../../../store/user/userSlice";
import { updateUserUbication } from "../../../helpers/users/updateUserUbication";
import { changePassword } from "../../../helpers/users/changePassword";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Loading from "../../../components/Loading"

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.users.currentUser);
  const [todayDate, setTodayDate] = useState("");
//cada vez que se haga alguna operacion del base de datos se pone este state como true para mostrar loading
const [isProccessing,setIsProccessing]=useState(false);

  const ubicationForm = useRef(null);
  const personalform = useRef(null);
  //lista de las direcciones del usuario
  const [userDirections, setUserDirections] = useState([]);
  //la cuidad que se va selecionando del dropdown
  const [city, setCity] = useState();

  const photoRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState();

  const toast = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    //setting the today's date
    setTodaysDate();

    //set resumen of user directions if exists
    if (user && user.addresses) {
      setResumenofAddresses();
    }
    //setting the default profile photo in case there is no photo selected
    if (photoRef.current) {
      setUserPhoto();
    }
  }, [user]);

  function setUserPhoto() {
    if (user && user.imageUrl) {
      setProfilePhoto(user.imageUrl);
    } else {
      photoRef.current.src = defaultUserPhoto;
    }
  }

  function setTodaysDate() {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
  }

  /**
   * este metodo va a crear una lista de objetos que carga el resumen de las ubicaciones
   * para mostrarlos ene l dropDown
   */
  function setResumenofAddresses() {
    let i = -1;
    const resumen = user.addresses.map((it) => {
      i = i + 1;
      return {
        id: i,
        name: it.province + " " + it.city + " " + it.address,
      };
    });
    resumen.push({
      id: -1200,
      name: "[+] Agrega una nueva direcion",
    });
    setUserDirections(resumen);

    if (resumen.length >0) {
      setCity(resumen[resumen.length-1]);
      
    }
  }


  function validarNombre(nombre) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(nombre);
  }
  function validarNumber (number){
    const regex=/^\+?[0-9]+$/;
    return regex.test(number);
  }

  async function handleSubmitUbication(e) {
    e.preventDefault();
    setIsProccessing(true);
    const address = {
      province: e.target[0].value,
      city: e.target[1].value,
      street: e.target[2].value,
      address: e.target[3].value,
      isMatriz: e.target[4].checked,
      status: "CREATED",
    };
    let updatedUser = structuredClone(user);
    //si este direcion es matriz entonces el resto de direcciones no pueden ser matriz
    if (address.isMatriz) {
      updatedUser.addresses.forEach((it) => (it.isMatriz = false));
    }
    //si el id del item selecionado del DropDown es menos que 0
    //entonces es agregar nueva direcion
    if (city.id < 0) {
      //si es el primer direccion entonces sera matriz
      if (updatedUser.addresses.length == 0) {
        address.isMatriz = true;
      }
      updatedUser.addresses.push(address);
    } else {
      //si el usuario esta trtando de marcar el address como no matriz y no hay otro matriz
      //no se le debe premitr hacer el cambio
      if (
        !address.isMatriz &&
        !userHasAnotherMatriz(
          updatedUser.addresses,
          updatedUser.addresses[city.id]
        )
      ) {
        address.isMatriz = true;
        showWarning(
          "warn",
          "Porfavor marcar otra direccion como matriz!",
          "",
          3000
        );
        setIsProccessing(false);
        return;
      }
      updatedUser.addresses[city.id] = address;
    }

    //send the user with updated ubication
    const resp = await updateUserUbication(updatedUser);
    //set the addresses array that come from the server to make sure that all addresses have ids
    updatedUser.addresses = resp.addresses;
    updateLocalStorage(updatedUser, resp);
  }

  function userHasAnotherMatriz(addresses, address) {
    return addresses.find((it) => {
      console.log(
        "the matriz is ",
        it.isMatriz,
        !JSON.stringify(it) == JSON.stringify(address)
      );
      return it.isMatriz && JSON.stringify(it) != JSON.stringify(address);
    });
  }

  function validarPasswords(oPass,nPass){
    if(oPass.trim()=="" || nPass.trim()==""){
      showWarning("warn","Porfavor llenar todos los campos!","",1500);
      return false;
    }

    if (oPass.length < 6 || nPass.length < 6) {
      showWarning("warn","¡Por favor, las contraseñas deben ser iguales o tener al menos 6 caracteres!","",1500);
      return false;
    }
    if(oPass===nPass){
      showWarning("warn","Las contraseñas no pueden ser iguales!")
      return false;
    }
   
    return true;
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setIsProccessing(true);
    const changeCredentialsRequest = {
      email: e.target[0].value,
      oldPassword: e.target[1].value,
      newPassword: e.target[2].value,
    };
    const valid=validarPasswords(changeCredentialsRequest.oldPassword,changeCredentialsRequest.newPassword);
    if(!valid){
      setIsProccessing(false);
      return;
    }
    
    //send the request to the server endpoint
    const resp = await changePassword(changeCredentialsRequest, user.id);
    document.getElementById("formPersonal").reset();
    if (resp != null) {
      setIsProccessing(false);
      showWarning("success", "Los cambios se han guardados", "", 3000);
    } else {
      setIsProccessing(false);
      showWarning(
        "warn",
        "Porfavor asegurate de los datos ingresados",
        "",
        3000
      );
    }
  }

  const updateLocalStorage = (updatedUser, resp) => {
    setIsProccessing(false);
    if (resp != null) {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      dispatch(setCurrentUser(updatedUser));
      document.getElementById("formPersonal").reset();
      setCity(null);
      //show success message
      showWarning("success", "Los cambios se han guardados", "", 3000);
    } else {
      s;
      //show failed message
      showWarning("warn", "No se pudo proccessar la actualizacion", "", 3000);
    }
  };

  const showWarning = (warningType, summary, details = "", miliSeconds) => {
    toast.current.show({
      severity: warningType,
      summary: summary,
      detail: details,
      life: miliSeconds,
    });
  };

  async function handleUpdatePersonalInfo(e) {
    e.preventDefault();
    setIsProccessing(true);
    let updatedUser = structuredClone(user);
    updatedUser.firstName = personalform.current[0].value
      ? personalform.current[0].value
      : user.firstName;
    updatedUser.lastName = personalform.current[1].value
      ? personalform.current[1].value
      : user.lastName;
    updatedUser.phoneNumber = personalform.current[2].value
      ? personalform.current[2].value
      : user.phoneNumber;
    updatedUser.birthDate = personalform.current[3].value
      ? personalform.current[3].value
      : user.birthDate;
    updatedUser.imageUrl = profilePhoto ? profilePhoto : user.photoUrl;

    if(!validarNombre(updatedUser.firstName) || !validarNombre(updatedUser.lastName)){
      setIsProccessing(false);
      showWarning("warn","Porfavor ingresar nombres validos!");
      return;
    }if(updatedUser.phoneNumber &&!validarNumber(updatedUser.phoneNumber)){
      setIsProccessing(false);
      showWarning("warn","Porfavor ingresar un numero de telefono valido!");
      return;
    }


    const resp = await updatePersonalInfo(updatedUser);
    console.log("updatedUser", updatedUser);
    console.log("resp", resp);
    updateLocalStorage(updatedUser, resp);

    document.getElementById("formPersonal").reset();

  
  }

  function onResult(imageFile) {
    setProfilePhoto(imageFile.base64);
  }

  function handlePhotoPick(e) {
    ConvertImageToBase64(e.target.files[0], onResult);
  }
  function onUbiacitonSelected(e) {
    setCity(e.target.value);
    console.log(e.value.id);
    if (e.value.id >= 0) {
      let selectedItem = user.addresses[e.value.id];
      //fill the form inputs with selected address info
      ubicationForm.current[0].value = selectedItem.province;
      ubicationForm.current[1].value = selectedItem.city;
      ubicationForm.current[2].value = selectedItem.street;
      ubicationForm.current[3].value = selectedItem.address;
      ubicationForm.current[4].checked = selectedItem.isMatriz;
    } else {
      //caso que el usuario quiere agregar una nueva direccion
      document.getElementById("formPersonal").reset();
      
     
    }
  }

  function handleDeleteUbication() {
    if (user.addresses[city.id].isMatriz) {
      showWarning(
        "warn",
        "Este es tu direccion matriz, porfavor marca otro direcion como matriz o agrega una direccion matriz",
        "",
        5000
      );
    } else {
      confirmDialog({
        message: "Estas seguro de eliminar la ubicacion?",
        header: "Confirma la eliminacion de la ubicacion",
        icon: "pi pi-exclamation-triangle",
        accept,
        reject,
      });
    }
  }
  const accept = async () => {
    setIsProccessing(true);
    const updatedUser = structuredClone(user);
    updatedUser.addresses.splice(city.id, 1);

    const resp = await updateUserUbication(updatedUser);

    updateLocalStorage(updatedUser, resp);
  };
  const reject = () => { };
  return (
  
    <div>
    <Toast ref={toast} />
    <ConfirmDialog />
    {isProccessing && <Loading/>}
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      <TabPanel header="Personal">
      
        <div className="personalProfile">
          <h6>Datos Personales</h6>
         
          <div className="card">
          <div className="profileImageCont">
            <img
              className="profilePhoto"
              ref={photoRef}
              src={
                profilePhoto
                  ? profilePhoto.startsWith("http")
                    ? profilePhoto
                    : `data:image/jpeg;base64,${profilePhoto}`
                  : defaultUserPhoto
              }
              alt="user image"
              onClick={() => {
                document.getElementById("file-picker").click();
              }}
            />

            <input
              id="file-picker"
              accept="image/png, image/jpeg"
              className="invisible-file-picker"
              type="file"
              onChange={handlePhotoPick}
            />
          </div>
          <form
            ref={personalform}
            id="formPersonal"
            onSubmit={handleUpdatePersonalInfo}
          >
            Nombre
            <input type="text" placeholder={user?.firstName} />
            <br />
            Apellido
            <input type="text" placeholder={user?.lastName} />
            <br />
            Número de teléfono
            <input
              type="text"
              placeholder={
                user?.phoneNumber
                  ? user.phoneNumber
                  : "Type your phone number"
              }
            />
            <br />
            Fecha de nacimiento
            <input
              type="date"
              id="start"
              name="trip-start"
              className="sign_input"
              min="1940-01-01"
              max={todayDate}
            />
            <br />
            <input className="submit" type="submit" value="Actualizar" />
          </form>
          </div>
          
        </div>

      </TabPanel>
      <TabPanel header="Ubicación">
        <div className="personalProfile">
        {isProccessing && <Loading/>}
          <h6 className="ubication-title">Actualizar ubicacion</h6>
              <div className="ubication-card-cont">
          {userDirections && (
            <Dropdown
              value={city}
              options={userDirections}
              onChange={(e) => {
                onUbiacitonSelected(e);
              }}
              optionLabel="name"
              placeholder="Elige ubicacion"
            />
          )}

          <br />
          <form
            onSubmit={handleSubmitUbication}
            id="formPersonal"
            ref={ubicationForm}
          >
            Provincia:
            <input type="text" placeholder="Provincia" required />
            <br /> 
            Cuidad:
            <input type="text" placeholder="Ciudad" required />
            <br /> 
            Calle:
            <input type="text" placeholder="Calle" required />
            <br />  
            Dirección detallada:
            <input type="text" placeholder="Dirección detallada" required />
            <br /> 
            <br /> 
            <div className="matriz-div">
              <p>Establecer como direccion de envío:</p>
              <input type="checkbox" />
            
            </div>
            <br/>

            <input
              className="submit"
              type="submit"
              value="Actualizar direccion"
            />
          </form>
          {city?.id >= 0 && (
            <button
              className="delete-direccion-btn"
              onClick={handleDeleteUbication}
            >
              Eliminar direccion
            </button>
          )}
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Seguridad">
        <div className="personalProfile">
          <h6>Cambiar contraseña</h6>
          <br />
          <form onSubmit={handleChangePassword} id="formPersonal">
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="Actual contraseña" />
            <br />
            <input type="password" placeholder="Contraseña nueva" />
            <br />
            <input type="submit" className="submit" value="Cambiar contraseña" />
          </form>
        </div>
      </TabPanel>
    </TabView>
  </div>
);
};

export default Profile;
