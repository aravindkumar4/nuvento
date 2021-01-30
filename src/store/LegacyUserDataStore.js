var TFADataModel = {};


export const SetTFADataModel = (LegacyUserData) => {
    if (LegacyUserData) {
        TFADataModel['LegacyUserData'] = LegacyUserData;
    }

    return TFADataModel;
}


export const GetTFADataModel = () => TFADataModel;

export const ResetTFADataModel = () => {
    TFADataModel = {};
};


