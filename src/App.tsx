import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID, TOKEN} from "./globals";
import {Grade, item} from "./types/api_types";
import {GradeTable} from "./components/GradeTable";

function App() {
    // You will need to use more of these!
    const [curClassName, setCurClassName] = useState<string>("");
    const [grades, setGrades] = useState<Grade[]>([])
    const [weights, setWeights] = useState([])
    const [curShipperID, setCurShipperID] = useState<string>("")
    const [shipperList, setShipperList] = useState<string[]>([])
    const [itemDataList, setItemDataList] = useState<item[]>([])

    /**
     * This is JUST an example of how you might fetch some data(with a different API).
     * As you might notice, this does not show up in your console right now.
     * This is because the function isn't called by anything!
     *
     * You will need to lookup how to fetch data from an API using React.js
     * Something you might want to look at is the useEffect hook.
     *
     * The useEffect hook will be useful for populating the data in the dropdown box.
     * You will want to make sure that the effect is only called once at component mount.
     *
     * You will also need to explore the use of async/await.
     *
     */
    const fetchItemsData = async (id: string) => {
        const res = await fetch("https://kx473b4cs0.execute-api.us-east-1.amazonaws.com/Prod/items" + "?id=" + id, {
            method: "GET",
            headers: {
                "authorizationToken": TOKEN
            }

        })
        const json = await res.json();
        console.log(json)
        return json
    }

    const fetchShipperInfo = async () => {
        const res = await fetch(BASE_API_URL + "/shippers", {
            method: "GET",
            headers: {
                "authorizationToken": TOKEN,
            }
        })
        const json = await res.json();
        console.log(json);
        return json
    }

    const fetchSomeData = async () => {
        const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
            method: "GET",
        });
        const json = await res.json();
        console.log(json);
    };

    useEffect(() => {
        fetchShipperInfo().then(r => {
            console.log(r)
            setShipperList(r.data)
        })
    }, [])

    const handleSelectChange = async (event: SelectChangeEvent) => {
        console.log("Selected shipper: ", event.target)
        const shipperId = event.target.value  // get selected class ID
        const res = await fetchItemsData(shipperId)
        setItemDataList(res)
        // setCurShipperID(shipperId);
    }

    // useEffect(() => {
    //     fetchItemsData(curShipperID).then(r => {
    //         console.log(r)
    //         setItemDataList(r)
    //     })
    // }, [curShipperID])


    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <Grid container spacing={2} style={{padding: "1rem"}}>
                <Grid xs={12} container alignItems="center" justifyContent="center">
                    <Typography variant="h2" gutterBottom>
                        Spark Assessment
                    </Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography variant="h4" gutterBottom>
                        Select a shipper according to ID
                    </Typography>
                    <div style={{width: "100%"}}>
                        <Select
                            fullWidth={true}
                            label="Class"
                            onChange={handleSelectChange}
                        >
                            {/* You'll need to place some code here to generate the list of items in the selection */}
                            {shipperList.map((ele) => {
                                return (
                                    <MenuItem
                                        value={ele}
                                    >
                                        {ele}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </Grid>
                <Grid xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        Final Grades
                    </Typography>
                    <div>
                        <GradeTable
                            items={itemDataList}
                            grades={grades}
                            className={curClassName}
                            weights={weights}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
