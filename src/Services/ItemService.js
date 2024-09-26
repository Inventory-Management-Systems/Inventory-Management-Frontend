import { myAxios } from "./helper";

// This function retrieves all items from the database.
export const getAllItemsService = () => {
    // Make a GET request to the /item/getAllItems endpoint.
    return myAxios.get('/item/getAllItems').then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Something went wrong");
        }
    });
};

// This function adds an item to the database.
export const addItemService = (item) => {
    // Make a POST request to the /item/addItem endpoint.
    return myAxios.post('/item/addItem', item, {
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
                    message: 'Item added successfully.',
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

// This function deletes an item from the database.
export const deleteItemService = (item) => {
    // Make a DELETE request to the /item/deleteItem endpoint.
    return myAxios.delete('/item/deleteItem', { data: item }).then((response) => {
        return response.data;
    });
};

// This function updates an item in the database.
export const updateItemService = (item) => {
    // Make a PUT request to the /item/updateItem endpoint.
    return myAxios.put('/item/updateItem', item, {
        validateStatus: function (status) {
            // Validate the status code of the response.
            return status === 200 || status === 400;
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Item updated successfully.',
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

// This function retrieves the count of all the items from the database.
export const getItemCount = () => {
    // Make a GET request to the /item/getItemCount endpoint.
    return myAxios.get('/item/getItemCount')
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};