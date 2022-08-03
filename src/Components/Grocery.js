import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Grocery.css"; 
import Swal from "sweetalert2";

export default function Grocery() { 
  const [groceryList, setGroceryList] = useState([]); 
  const [name, setName] = useState("");
  const [supermarket, setSupermarket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [done, setDone] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("/groceries/").then((response) => {
      setGroceryList(response.data);
    });
  }, []);

  const deleteGrocery = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47d11d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios.delete("/groceries/" + id).then((response) => { 
          setGroceryList(response.data);
        });
      }
    });
  };

  const deleteAllGrocery = () => {
    Swal.fire({
      title: "Do you want to delete all Groceries?",
      showDenyButton: true, 
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#47d11d",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Delete all success", "", "success");
        axios.delete("/groceries/").then((response) => { 
          setGroceryList(response.data);
        });
      } else if (result.isDenied) {
        Swal.fire("Delete canceled", "", "info");
      }
    });
  };  
  
  const newEditGrocery = async (...args) => { 
    const { value: formValues } = await Swal.fire({
      title: "Grocery",
      html:
        `<input id="swal-input1" placeholder="grocery name" class="swal2-input" placeholder="grocery name"
      value="${args[0]?.name!=undefined?args[0].name:""}" 
      onchange = ${function (e) {
        setName(e.target.value);
      }}/>` +
        `<input  
          value="${args[0]?.image!=undefined?args[0]?.image:""}"
          placeholder="grocery image"
          class="swal2-input"
          id="swal-input2" 
          onchange =${function (e) {
            setImage(e.target.value);
          }}/>` +
        `<input 
          type="number"
          id="swal-input3" 
          class="swal2-input"
          placeholder="grocery quantity"
          min=1
          value="${args[0]?.quantity!=undefined?args[0]?.quantity:""}"
          onchange = ${function (e) {
            setQuantity(e.target.value);
          }}/>` +
        `<br></br> 
        <label for="Supermarket">Supermarket:</label> <br>
        <select
          id="swal-input4" 
          name="Supermarket" 
          size=4
          class="swal2-select" 
          value="${args[0]?.supermarket}"
          ${(onchange = (e) => setSupermarket(e.target.value))}>
          <option value="Farm" ${
            args[0]?.supermarket == "Farm" ? "selected" : ""
          }>Farm</option>
          <option value="Panda" ${
            args[0]?.supermarket == "Panda" ? "selected" : ""
          } >Panda</option>
          <option value="Al-Raya" ${
            args[0]?.supermarket == "Al-Raya" ? "selected" : ""
          } >Al-Raya</option>
          <option value="Aldanube" ${
            args[0]?.supermarket == "Aldanube" ? "selected" : ""
          } >Aldanube</option>
          <option value="Bin dawood" ${
            args[0]?.supermarket == "Bin dawood" ? "selected" : ""
          } >Bin dawood</option>
          <option value="Lolo" ${
            args[0]?.supermarket == "Lolo" ? "selected" : ""
          } >Lolo</option>
        </select>
        <br></br>Done? <br></br>
        <input 
          type="radio"
          id="yes"
          name="Done"
          value=${true}
          ${args[0]?.done === true ? "checked" : <></>}
          onchange =${
            done != undefined
              ? function (e) {
                  setDone(!done);
                }
              : function (e) {
                  setDone(e.target.value);
                }
          }
        />
        <label for="yes">Yes</label> 
        <input 
          type="radio"
          id="notYet"
          name="Done"
          value=${false}
          ${args[0]?.done === false ? "checked" : <></>}
          onchange =${
            done != undefined
              ? function (e) {
                  setDone(!done);
                }
              : function (e) {
                  setDone(e.target.value);
                }
          }
        />
        <label for="notYet">not yet</label>`,
      focusConfirm: false,

      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementsByName("Done").item(0).checked,
        ];
      },
    });
    if (formValues) { 
      if(args.length==0){ 
      axios
        .post("/groceries/", {
          name: formValues[0],
          supermarket: formValues[3],
          quantity: formValues[2],
          done: formValues[4],
          image: formValues[1],
        })
        .then((response) => { 
          setGroceryList(response.data);
        });
      }
      else{
        axios
        .put("/groceries/" + args[0]._id, {
          name: formValues[0],
          supermarket: formValues[3],
          quantity: formValues[2],
          done: formValues[4],
          image: formValues[1],
        })
        .then((response) => {
          setGroceryList(response.data);
        });
      }
      
    } 
  };

  return ( 
      <div className="cardsGrocery" > 
        <h1>
          What we should buy this week <span>&#127857;&#127846;&#127865;</span>{" "}
        </h1> 
        <h1>
          <i
            className="fa fa-plus"
            aria-hidden="true"
            onClick={() => { 
              newEditGrocery();
            }}
          >
            {" "}
            Add new grocery
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {groceryList.length == 0 ? (
            <></>
          ) : (
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => deleteAllGrocery()}
            >
              Delete all groceries
            </i>
          )}
        </h1>
        <div 
         id= "notesInside"
         >
          {groceryList.map((grocery) => {
            return (
              <>
                <div className="note">
                  <span>
                    {" "}
                    <i
                      className="fa fa-pencil fa-pencil"
                      aria-hidden="true"
                      onClick={() => newEditGrocery(grocery)}
                    ></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => deleteGrocery(grocery._id)}
                    ></i>
                  </span>

                  {grocery.image ? (
                    <img src={grocery.image} alt="grocery image" />
                  ) : (
                    <></>
                  )}

                  <div className="container">
                    {grocery.done ? (
                      <h3>
                        <strike>name: {grocery.name} </strike>
                      </h3>
                    ) : (
                      <h3>
                        <b>name: {grocery.name} </b>
                      </h3>
                    )}
                    <h3>
                      <b>Supermarket: {grocery.supermarket} </b>
                    </h3>
                    <h3>quantity: {grocery.quantity}</h3>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>  
  );
}
