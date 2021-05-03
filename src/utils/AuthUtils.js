  
// Author : Hari Venkatesh P 
// This functions are used for authorization


const base64 = require('base64url');


const dotenv = require("dotenv");
dotenv.config();

function setTokens(token){
    sessionStorage.setItem("token",token)
}

function getToken(){
    return sessionStorage.getItem('token')
}

function retrievePayloadFromToken(){
    const token = sessionStorage.getItem('token')
    if(token){
        const jwtParts = token.split('.');
        const payloadInBase64UrlFormat = jwtParts[1];
        const decodedPayload = base64.decode(payloadInBase64UrlFormat);
        return JSON.parse(decodedPayload)
    }
}

function isValidToken(payloadFromToken){
    if(payloadFromToken.secret === process.env.REACT_APP_API_SECRET){
        return true;
    }else{
        return false;
    }
}

function isTokenPresent(){
    const payloadFromToken = retrievePayloadFromToken()
    if(payloadFromToken && isValidToken(payloadFromToken)){
        return true
    }else{
        return false
    }
}

function getLoggedInUserId(){
    const payloadFromToken = retrievePayloadFromToken()
    if(payloadFromToken._id){
        return payloadFromToken.id
    }
}

module.exports = {
    setTokens,
    getLoggedInUserId,
    isTokenPresent,
    getToken,
}