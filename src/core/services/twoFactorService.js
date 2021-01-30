// import ApiHelper from '../common/apiHelper';
import { BrowserDeviceId , OSVerion, OS} from '../common/common';
import SessionAccessor from '../common/sessionAccessor';
import RequestHelper from "../../common/RequestHelper";
import { TwoFactorAuthentication } from "../../core/URLConfig";
import {SetTFADataModel,GetTFADataModel} from "../../store/LegacyUserDataStore"
const Agency = 'Agency';
import {AgencyAPIUrl } from '../Config'

export const CheckisLegacyUser = async (UserName, callback) => {
        const url =AgencyAPIUrl+TwoFactorAuthentication.IsLegacyUserCheck+UserName;
        //const url=TwoFactorAuthentication.IsLegacyUserCheck+UserName;     
        RequestHelper.GET1(
          url,        
          (res) => {
            if (res && res.status == 200) {                      
              if (res.data.data.isLegacyUser) 
              {               
                callback(res.data);
                SetTFADataModel(res.data.data);    
              } else 
              {
                callback(res.data);                
              }
    
            } else {
                callback(res.data);
            }
          }
        );
}

export const getTwoFactorAuthenticationDetail = async (userId, callback) => {
    
const LegacyUserData=GetTFADataModel();
    const params={
        "customAttributes": {
          "ip": "string",
          "client": "string",
          "version": "string",
          "deviceId": "string",
          "os": "string"
        },
        "userId": LegacyUserData.LegacyUserData.userID,
        "authenticationType": 0,
        "token": "string",
        "type": 0
      }
 
    new RequestHelper.POST(TwoFactorAuthentication.GetUserTwoFactorAuthentication,Agency,
        params ,(resp) => {
            
            if (resp) {
                callback(resp.data);
            }else{
                callback(resp.data);
            }
        }).catch((error) => {
            callback(error);
        });
}


export const createAuthenticationCode = (req, authenticationType, callback) => {

const LegacyUserData=GetTFADataModel();
    const params={
        "customAttributes": {
          "ip": "string",
          "client": "string",
          "version": "string",
          "deviceId": "string",
          "os": "string"
        },
        "userId": LegacyUserData.LegacyUserData.userID,
        "authenticationType": Number(authenticationType),
        "token": "string",
        "type": 0
      }
 
    new RequestHelper.POST(TwoFactorAuthentication.CreateUserTwoFactorAuthenticationToken,Agency,
        params ,resp => {
            
            if (resp && resp.data.status.code == 200) {
                
                callback(resp.data);
            }else{
                
                callback(resp.data);
            }
        }).catch((error) => {
            
            callback(error);
        });
    // new ApiHelper().postNoAsync(
    //     TwoFactorAuthentication.CreateUserTwoFactorAuthenticationToken, 
    //     {
    //         userId: parseInt(req), 
    //         authenticationType: parseInt(authenticationType),
    //         client: 'Web',
    //         CustomAttributes:{DeviceId: SessionAccessor.BrowserDeviceID}
    //     }, serviceURLType).then(resp => {
    //         if (resp && resp.data.status.code == 200) {
    //             callback(resp.data);
    //         }else{
    //             callback(resp);
    //         }
    //     }).catch(error => {
    //         callback(error);
    //     });
}

export const verifyActivationCode = (authenticationType, token,  callback) => {

    
    const LegacyUserData=GetTFADataModel();
    const params={
        "customAttributes": {
          "ip": "string",
          "client": "string",
          "version": "string",
          "deviceId": "string",
          "os": "string"
        },
        "userId": LegacyUserData.LegacyUserData.userID,
        "authenticationType": Number(authenticationType),
        "token": token,
        "type": 0
      }
 
    new RequestHelper.POST(TwoFactorAuthentication.VerifyUserTwoFactorAuthenticationToken,Agency,
        params ,resp => {
            
            if (resp && resp.data.status.code == 200) {
               
                callback(resp.data);
            }else{
             
                callback(resp.data);
            }
        }).catch((error) => {
          
            callback(error);
        });


    // new ApiHelper().postNoAsync(
    //     TwoFactorAuthentication.VerifyUserTwoFactorAuthenticationToken, 
    //     {
    //         userId: parseInt(req), 
    //         authenticationType: parseInt(authenticationType),
    //         client: 'Web',
    //         token: token,
    //         Os: OS,
    //         version: OSVerion,
    //         CustomAttributes:{DeviceId: SessionAccessor.BrowserDeviceID}
    //     }, serviceURLType).then(resp => {
    //         if (resp && resp.data.status.code == 200) {
    //             callback(resp.data);
    //         }else{
    //             callback(resp);
    //         }
    //     }).catch(error => {
    //         callback(error);
    //     });
}

export const resentUserTwoFactorAuthenticationToken = (req, authenticationType,  callback) => {


  
const LegacyUserData=GetTFADataModel();
    const params={
        "customAttributes": {
          "ip": "string",
          "client": "string",
          "version": "string",
          "deviceId": "string",
          "os": "string"
        },
        "userId": LegacyUserData.LegacyUserData.userID,
        "authenticationType": Number(authenticationType),
        "token": "string",
        "type": 0
      }
 
    new RequestHelper.POST(TwoFactorAuthentication.ResentUserTwoFactorAuthenticationToken,Agency,
        params ,resp => {
            
            if (resp && resp.data.status.code == 200) {
                
                callback(resp.data);
            }else{
                
                callback(resp.data);
            }
        }).catch((error) => {
            
            callback(error);
        });
    // new ApiHelper().postNoAsync(
    //     TwoFactorAuthentication.ResentUserTwoFactorAuthenticationToken, { 
    //         userId: parseInt(req),
    //         authenticationType: parseInt(authenticationType),
    //         CustomAttributes:{DeviceId: SessionAccessor.BrowserDeviceID}
    //     }, serviceURLType).then(resp => {
    //         if (resp && resp.data.status.code == 200) {
    //             callback(resp.data);
    //         }
    //     }).catch(error => {
    //         callback(error);
    //     });
}


