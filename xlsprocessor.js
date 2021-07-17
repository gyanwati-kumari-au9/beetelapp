// https://stackoverflow.com/questions/30859901/parse-xlsx-with-node-and-create-json
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bcrypt = require("bcrypt");
const Users = require("./models/user-model");

const Branch = require('./models/branch-model');
const User = require('./models/user-model');

const XLSX = require('xlsx');

const workbook = XLSX.readFile(__dirname + '/BeetleNut_Data.xlsx'); // read xls file
const firstSheet = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheet];

// connect to mongodb
mongoose.connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to mongodb");
    }
);

const emptyBranch = async () => {
    await Branch.remove({})
}

const parseExecelFile = () => {
    const headers = {};
    const data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;
    
        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }
    
        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    return data;
}

const createBranch = async (data) => {
    if (!data['Insitution Name']) return;
    const pincodes = data['Pincode covered'] && data['Pincode covered'].toString().split(',');
    pincodes.map(pc => {
        const newVal = pc.trim();
        if (newVal.length === 6) {
            return newVal;
        }
    });
    console.log("=========CREATING BRANCH====>", pincodes);
    await new Branch({
        insitutionName: data['Insitution Name'],
        branchName: data['Branch Name'],
        address: data['Address'],
        city: data['City'],
        contactNumber: data['Contact Number'],
        branchIncharge: data['Branch Incharge'],
        pinCode: []
    }).save();
}

const createDefaultLogin = async (data) => {
    if (!data['Insitution Name']) return;
    console.log("=========CREATING DEFAULT LOGIN====>");
    let email = data['Branch Name'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    email.toLowerCase();
    email= email.split(' ').join('_');
    email=`${email}@beetelapp.com`;
    const password='branchUser';
    // Checking Duplicate Email
    const emailExist = await Users.findOne({ email: email });
    if (emailExist) {
        console.log("Branch login already exists");
        return;
    };

    // Hashing Password
    const salt = await bcrypt.genSalt(8);
    const hashpwd = await bcrypt.hash(password, salt);

    const user = await new Users({
        username: email,
        email: email,
        password: hashpwd,
        role: "Branch",
        status: "Auto",
    }).save();
    console.log("Branch user created", email, password);
}

const process = async () => {
    const branches =  parseExecelFile();
    await emptyBranch();
    branches.forEach(async (branch) => {
        await createBranch(branch);
        await createDefaultLogin(branch);
    })
}


process();