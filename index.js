const axios = require("axios");

const sourceInstanceURL = "https://play.dhis2.org/40.0.1/api";
const destinationInstanceURL = "https://play.dhis2.org/2.38.4.3/api";

const sourceAuth = {
    username: "admin",
    password: "district",
};

const destinationAuth = {
    username: "admin",
    password: "district",
};
const dataStoreNameSpace = "albert-Test-version-40";

async function exportData() {
    try {
        const { data } = await axios.get(
            `${sourceInstanceURL}/dataStore/${dataStoreNameSpace}`,
            { auth: sourceAuth }
        );
        // console.log(data);
        for (const key of data) {
            // console.log(key);
            const { data } = await axios.get(
                `${sourceInstanceURL}/dataStore/${dataStoreNameSpace}/${key}`,
                { auth: sourceAuth }
            );
            console.log(data);
            try {
                await axios.post(
                    `${destinationInstanceURL}/dataStore/${dataStoreNameSpace}/${key}`,
                    data,

                    { auth: destinationAuth }
                );
            } catch (error) {
                await axios.put(
                    `${destinationInstanceURL}/dataStore/${dataStoreNameSpace}/${key}`,
                    data,
                    { auth: destinationAuth }
                );
            }
        }
        // await importData(data);
        // console.log(data);
    } catch (error) {
        console.error("Error exporting data:", error.message);
    }
}

// async function importData(data) {
//     try {
//         const response = await axios.put(
//             `${destinationInstanceURL}/dataStore/${dataStoreNameSpace}`,
//             { auth: destinationAuth },
//             data
//         );

//         console.log("Data imported successfully:", response.data);
//     } catch (error) {
//         console.error("Error importing data:", error.message);
//     }
// }

exportData();
