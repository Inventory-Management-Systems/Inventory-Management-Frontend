import { myAxios } from "./helper";

// This function signs up a user by making a POST request to the '/register'.
export const signUpService = (user) => {
    return myAxios.post('/register', user, {
        validateStatus: function (status) {
            console.log(status);
            return status === 200 || status === 400;
        },
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'User registered successfully.',
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
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Something went wrong.',
            };
        });
};

// This function logs in a user by making a POST request to the '/login' endpoint with the provided user data.
export const loginService = (user) => {
    return myAxios.post('/login', user, {
        validateStatus: function (status) {
            console.log(status);
            return status === 200 || status === 400;
        },
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Login successful.',
                    user: response.data,
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
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Something went wrong.',
            };
        });
};
