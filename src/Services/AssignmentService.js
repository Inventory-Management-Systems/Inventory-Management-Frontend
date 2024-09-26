import { myAxios } from "./helper";

// This function retrieves the names of items assigned to an employee with the given userId.
export const getEmployeeAssignItemNames = (userId) => {
  return myAxios.get(`/assignment/getEmployeeAssignItemNames/${userId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// This function retrieves the items assigned to an employee with the given userId.
export const getEmployeeAssignItems = (userId) => {
  return myAxios.get(`/assignment/getEmployeeAssignItems/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// This function retrieves the items which are not assigned to an employee with the given userId.
export const getEmployeeUnassignItems = (userId) => {
  return myAxios.get(`/assignment/getEmployeeUnassignItems/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// This function retrieves the count of items assigned to an employee with the given userId.
export const getEmployeeAssignItemCount = (userId) => {
  return myAxios.get(`/assignment/getEmployeeAssignItemCount/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// This function assigns the given itemList to an employee with the given userId.
export const assignItemToEmployee = (userId, itemList) => {
  return myAxios.post(`/assignment/assignItemsToEmployee/${userId}`, itemList)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// This function unassigns the given itemList from an employee with the given userId.
export const unassignItemToEmployee = (userId, itemList) => {
  return myAxios.post(`/assignment/unassignItemsFromEmployee/${userId}`, itemList)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// This function retrieves the employees and their assigned items.
export const getEmployeesAndItems = () => {
  return myAxios.get('/assignment/getEmployeesAndItems')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};