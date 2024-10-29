import React, { useMemo } from "react";
import "../Style/item.css";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPowerOff, FaTrashAlt, FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  getAllItemsService,
  addItemService,
  deleteItemService,
  updateItemService,
} from "../Services/ItemService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

  const handleClick = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemService(item)
          .then((response) => {
            if (response) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the item.", "error");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setModal2(true);
  };

  const handleUpdateClickModal = (item) => {
    var isValid = true;

    //to check name must not be empty
    if (item.name.trim() === "") {
      displayError("Name must not be empty");
      isValid = false;
    }

    //to check category must not be empty
    if (item.category.trim() === "") {
      displayError("Category must not be empty");
      isValid = false;
    }

    //to check serial number must not be empty
    if (item.serialNumber.trim() === "") {
      displayError("Serial Number must not be empty");
      isValid = false;
    }

    //to check bill number must not be empty
    if (item.billNumber.trim() === "") {
      displayError("Bill Number must not be empty");
      isValid = false;
    }

    //to check warranty must not be empty
    if (item.warranty.trim() === "") {
      displayError("Warranty must not be empty");
      isValid = false;
    }

    if (isValid) {
      updateItemService(item)
        .then((response) => {
          if (response.success) {
            setModal2(false);
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    document.title = "IMS || Manage Items";

    //if role is employee then redirect to employee_dashboard page
    if (user && user.role === "employee") {
      toast.warn("You can't access Manage Items page");
      navigate("/user/employee_dashboard");
    }

    getAllItemsService()
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, [navigate, user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    const item = {
      name: event.target.name.value,
      billNumber: event.target.billNumber.value,
      warranty: event.target.warranty.value,
      category: event.target.category.value,
      serialNumber: event.target.serialNumber.value,
      dateOfPurchase: new Date(event.target.dateOfPurchase.value),
    };

    var isValid = true;

    if (item.name.trim() === "") {
      displayError("Name must not be empty");
      isValid = false;
    }

    if (item.category.trim() === "") {
      displayError("Category must not be empty");
      isValid = false;
    }

    if (item.serialNumber.trim() === "") {
      displayError("Serial Number must not be empty");
      isValid = false;
    }

    if (item.billNumber.trim() === "") {
      displayError("Bill Number must not be empty");
      isValid = false;
    }

    if (item.warranty.trim() === "") {
      displayError("Warranty must not be empty");
      isValid = false;
    }

    if (isValid) {
      addItemService(item)
        .then((response) => {
          if (response.success) {
            toast.success("Item Added Successfully");
            setModal(false);
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    }
  };

  function displayError(errorMessage) {
    toast.error(errorMessage);
  }

  return (
    <div>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal_header">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleAddItem}>
            <div>
              <div className="row popup_form">
                <div className="col-md-6 flex-grow-1">
                  <div className="mb-3">
                    <label htmlFor="name" className="bold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter item name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="billNumber" className="bold">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      name="billNumber"
                      id="billNumber"
                      placeholder="Enter item bill number"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="warranty" className="bold">
                      Warranty
                    </label>
                    <input
                      type="text"
                      id="warranty"
                      name="warranty"
                      placeholder="Enter item warranty"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 flex-grow-1">
                  <div className="mb-3">
                    <label htmlFor="category" className="bold">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Enter item category"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serialNumber" className="bold">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      id="serialNumber"
                      placeholder="Enter item serial number"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="dateOfPurchase" className="bold">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      id="dateOfPurchase"
                      name="dateOfPurchase"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary mt-4 register_btn">
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={modal2} onHide={() => setModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal_header">Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div>
              <div className="row popup_form">
                <div className="col-md-6 flex-grow-1">
                  <div className="mb-3">
                    <label htmlFor="name" className="bold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter item name"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.name : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="billNumber" className="bold">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      name="billNumber"
                      id="billNumber"
                      placeholder="Enter item bill number"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.billNumber : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="warranty" className="bold">
                      Warranty
                    </label>
                    <input
                      type="text"
                      id="warranty"
                      name="warranty"
                      placeholder="Enter item warranty"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.warranty : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 flex-grow-1">
                  <div className="mb-3">
                    <label htmlFor="category" className="bold">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Enter item category"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.category : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serialNumber" className="bold">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      id="serialNumber"
                      placeholder="Enter item serial number"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.serialNumber : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="dateOfPurchase" className="bold">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      id="dateOfPurchase"
                      name="dateOfPurchase"
                      className="form-control"
                      required
                      value={selectedItem ? selectedItem.dateOfPurchase : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary mt-4 register_btn"
                    onClick={(event) => {
                      event.preventDefault();
                      handleUpdateClickModal(selectedItem);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="bg-info item_div_box p-5">
        <input
          type="button"
          id="logout"
          className="btn logout text-white"
          value={user.fname}
        />
        <FaPowerOff
          className="logout_icon text-white"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        />
      </div>
      <div className="bg-white item_div_box2 shadow-lg mb-5 px-4">
        <div className="row py-3">
          <div className="col-md-6 heading_div">
            <span className="item_heading fw-bold">Items</span>
          </div>
          <div className="col-md-6 pt-2 text-end btn_div">
            <button
              className="btn btn-primary p-2"
              onClick={() => setModal(true)}
            >
              Add Item
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table text-dark table-margin">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Serial Number</th>
                <th>Bill Number</th>
                <th>Date of Purchase</th>
                <th>Warranty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.billNumber}</td>
                  <td>{item.dateOfPurchase}</td>
                  <td>{item.warranty}</td>
                  <td>
                    <span>
                      <FaPen onClick={(event) => handleUpdateClick(item)} />
                      <FaTrashAlt
                        className="actions text-danger"
                        onClick={() => handleClick(item)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Items;
