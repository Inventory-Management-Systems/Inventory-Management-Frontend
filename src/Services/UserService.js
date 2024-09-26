import { myAxios } from "./helper";

// This function retrieves all employees from the database.
export const getAllEmployeeService = () => {
    // Make a GET request to the /user/getAllEmployees endpoint.
    return myAxios.get('/user/getAllEmployees').then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Something went wrong");
        }
    });
};

// This function updates an employee in the database.
export const updateEmployeeService = (employee) => {
    // Make a PUT request to the /user/updateEmployee endpoint.
    return myAxios.put('/user/updateEmployee', employee, {
        // Validate the status code of the response.
        validateStatus: function (status) {
            return status === 200 || status === 400;
        },
    })
        // Handle the success case.
        .then((response) => {
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Employee updated successfully.',
                };
            } else if (response.status === 400) {
                return {
                    success: false,
                    message: response.data,
                };
            } else {
                throw new Error('Something went wrong.');
            }
        })

        // Handle the error case.
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Something went wrong.',
            };
        });
};

// This function adds an employee to the database.
export const addEmployeeService = (employee) => {
    // Make a POST request to the /user/addEmployee endpoint.
    return myAxios.post('/user/addEmployee', employee, {
        // Validate the status code of the response.
        validateStatus: function (status) {
            return status === 200 || status === 400;
        },
    })
        // Handle the success case.
        .then((response) => {
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Employee added successfully.',
                };
            } else if (response.status === 400) {
                return {
                    success: false,
                    message: response.data,
                };
            } else {
                throw new Error('Something went wrong.');
            }
        })
        // Handle the error case.
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Something went wrong.',
            };
        });
};

// This function deletes an employee from the database.
export const deleteEmployeeService = (employee) => {
    // Make a DELETE request to the /user/deleteEmployee endpoint.
    return myAxios.delete('/user/deleteEmployee', { data: employee }).then((response) => {
        return response.data;
    });
};

// This function retrieves the count of all employees from the database.
export const getEmployeesCount = () => {
    // Make a GET request to the /user/getEmployeesCount endpoint.
    return myAxios.get('/user/getEmployeesCount')
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

// This function retrieves the count of all admins from the database.
export const getAdminCount = () => {
    // Make a GET request to the /user/getAdminCount endpoint.
    return myAxios.get('/user/getAdminCount')
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};