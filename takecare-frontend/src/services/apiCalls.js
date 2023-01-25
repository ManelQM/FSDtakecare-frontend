import axios from 'axios'; 

const API_URL = 'http://localhost:3001';

let returnedMessage = ""; 

export let loginUser = async (values) => {
    try {
        await axios.post(`${API_URL}/auth/login`, {
            "email": values.email,
            "password": values.password,
            
        }).then(response => {
            
            returnedMessage = response.data;
        })
        return returnedMessage
        
        
    }
    catch(error) {
        returnedMessage = "Ivalid Email or Password"
        return returnedMessage
    }
};


export let registerUser = async (values) => {

    try {
        await axios.post(`${API_URL}/users/register`, {
            "email": values.email,
            "password": values.password,
            "nickname": values.nickname,
            "name": values.name,
            "surname": values.surname,
            
        }).then(response => {
            returnedMessage = response.data.message
        })
        return returnedMessage
     }
    catch (error) {
        returnedMessage = "This email has been registered already."
        return returnedMessage
     }
};

export let publicationsReq = async () => {
    try {   
    const res = await axios.get(`${API_URL}/publications/allpublications`,{ 
        params: {
            select: "title,nickname,text"
        }
    });
      return res.data;
    } catch (error) {
        errorMessage = "Cant get the publications";
        return errorMesage
    }
    
};

export let newPublication = async (newPublicationData) => {

    try {
        console.log("hola",newPublicationData);
        const createPublication = await axios.post(`${API_URL}/publications/newpublication`,
         newPublicationData
         )
                
        return createPublication
    }
    catch (error) {
        returnedMessage = "Cant create the publication"
        return returnedMessage
     }
};

export const getProfile = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let res = await axios.get(`${API_URL}users/profile`, config);
      let data = res.data.user;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  export const makeContract = async () => {

    try {
        const response = await axios.post(`${API_URL}contracts/newcontract`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  