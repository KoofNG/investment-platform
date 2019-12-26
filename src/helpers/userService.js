import ClientService from '../helpers/clientService';

export default{

    registerUser(userModel) {
        return ClientService.post('rest-auth/registration/', userModel);
    },

    loginUser(userData) {
        return ClientService.post('rest-auth/login/', userData);
    },

    logOut() {
        return ClientService.post('rest-auth/logout/', {});
    }


}