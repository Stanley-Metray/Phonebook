import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Stanley-Metray:ZUMp3Iiv0cCSztIT@cluster0.iz9fxen.mongodb.net/Phonebook?retryWrites=true&w=majority",).then(() => {
    // console.log("Connected...");
}).catch((err) => {
    return err;
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    gender: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    confirmPassword: {
        type: String
    },

    contacts: [{
        firstName: {
            type: String,
            default: "Unknown"
        },

        lastName: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: ""
        },

        company: {
            type: String,
            default: "Unknown"
        },

        department: {
            type: String,
            default: "Unknown"
        },

        title: {
            type: String,
            default: "Unknown"
        },

        phone: {
            type: String,
            default: "Unknown"
        },

        mobile: {
            type: String,
            default: "Unknown"
        },

        address: {
            type: String,
            default: "Unknown"
        },

        website: {
            type: String,
            default: "Unknown"
        },

        birthday: {
            type: String,
            default: "Unknown"
        },

        relationship: {
            type: String,
            default: "Unknown"
        },

        date: {
            type: Date,
            default: Date.now()
        }
    }],

    date: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = new mongoose.model("User", UserSchema);

const verifyUser = async (email) => {
    try {
        let result = await UserModel.find({ email: email });
        if (result.length == 0)
            return false;
        else
            return true;
    } catch (error) {
        return error;
    }
}

const verifyEmailAndPassword = async (email, password) => {
    try {
        let result = await UserModel.find({ email: email });

        if (result.length == 0)
            return false;
        else {
            if (result[0].password == password)
                return result[0].firstName
            else
                return false;
        };
    } catch (error) {
        return error;
    }
}


const getUser = async (email) => {
    try {
        const result = await UserModel.findOne({ email: email });
        return result;
    } catch (error) {
        return error;
    }
}

const getContact = async (firstName) => {
    try {
        const result = await UserModel.find({ firstName: firstName });
        return result;
    } catch (error) {
        return error;
    }
}

const getContactLike = async (firstName, contactName) => {
    try {
        const result = await UserModel.find({ firstName: firstName });
        let arr1 = result[0].contacts;
        let arr2 = new Array();
        for (let index in arr1) {
            if (arr1[index].firstName.toLowerCase().includes(contactName.toLowerCase()) && contactName != "") {
                arr2.push(arr1[index]);
            }
        }
        return arr2;
    } catch (error) {
        return error;
    }
}

const updateContact = async (contact, username) => {
    try {
        const result = await UserModel.find({ firstName: username });
        let arr = result[0].contacts;
        for (let index in arr) {
            if (arr[index].firstName == contact.firstName) {
                arr[index] = contact;
                modifyContact(arr, username);
                break;
            }
        }

    } catch (error) {
        return error;
    }
}

const modifyContact = async (contacts, firstName) => {
    try {
        const result = await UserModel.updateOne({ firstName: firstName }, {
            $set: {
                contacts: contacts
            }
        });
    } catch (error) {
        return error;
    }
}

const deleteContact = async (username, contactName) => {
    try {
        const result = await UserModel.find({ firstName: username });
        let arr1 = result[0].contacts;
        let arr2 = new Array();

        for (let index in arr1) {
            if (arr1[index].firstName != contactName) {
                arr2.push(arr1[index]);
            }
        }

        const result2 = await UserModel.updateOne({ firstName: username }, {
            $set: {
                "contacts": arr2
            }
        });
    } catch (error) {
        return error;
    }
}

export { UserModel, verifyUser, verifyEmailAndPassword, getUser, getContact, updateContact, deleteContact, getContactLike };