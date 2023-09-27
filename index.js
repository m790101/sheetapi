const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


// CORS All Request
const allowCrossDomain = (req, res, next) => {
    // let allowedOrigins = ['http://localhost:8081', 'http://127.0.0.1:8081']
    // let origin = req.headers.origin
    // if (allowedOrigins.includes(origin)) {
    //   res.header('Access-Control-Allow-Origin', origin)
    // }
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, True-Client-IP')
    next()
  }


app.use(allowCrossDomain)



app.get("/", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });

    // const client = await auth.getClient();

    // Instance of Google Sheets API
//     const googleSheets = google.sheets({ version: "v4", auth: client });

//     const spreadsheetId = "1JOI3bsoUtouqjy83TKuCyYPOo9TuF5_bPV_kevu0P_I";

//     const metaData = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId,
//       });

//       //read row from spreadsheet   
//         const getRows = await googleSheets.spreadsheets.values.get({
//             auth,
//             spreadsheetId,
//             range: "Sheet1",
//         });



      res.render('index')

})

app.post("/", async (req, res) => {
    const { request, name } = req.body;
  
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1JOI3bsoUtouqjy83TKuCyYPOo9TuF5_bPV_kevu0P_I";
  
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:A",
    });
  
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[request, name]],
      },
    });
  
    res.send("Successfully submitted! Thank you!");
  });





  app.post("/add/row", async (req, res) => {
    const { request, name } = req.body;
  
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1JOI3bsoUtouqjy83TKuCyYPOo9TuF5_bPV_kevu0P_I";
  
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
  
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:A",
    });

  
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "RAW",
      resource: {
        values: [[123,12333333999]],
      },
    });
  
    res.send("Successfully submitted! Thank you!");
  });


app.listen(1337, (req, res) => console.log("running on 1337"));