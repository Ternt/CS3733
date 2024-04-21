import {useEffect, useState} from "react";
import {speak} from "../components/TextToSpeech/TextToSpeech.tsx";
import {Grid, Box, Typography, TextField} from "@mui/material";
import LocationDropdown from "../components/LocationDropdown.tsx";
import MapCanvas from "../components/Map/MapCanvas.tsx";
import NaturalLanguageDirection from "../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import MenuItem from "@mui/material/MenuItem";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import Button from "@mui/material/Button";
import QRCodePopUp from "../components/QRCode/QRCodePopUp.tsx";

export default function MapPage() {
    useEffect(() => {
        document.title = "Map";
    });

    const algos = [
      {title: 'A-Star', api: 'astar', helper: 'The quickest route'},
      {title: 'Breadth First Search', api: 'bfs', helper: 'A decent route'},
      {title: 'Depth First Search', api: 'dfs', helper: 'The scenic route'},
      {title: 'Dijkstra\'s', api: 'dijkstra', helper: 'A very fast route'},
    ];
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [searchAlgorithm, setSearchAlgorithm] = useState(0);
    const [natLangPath, setNatLangPath] = useState<string[]>([]);

    useEffect(() => {
        async function setPath() {
            const res = await NaturalLanguageDirection(startLocation, endLocation, searchAlgorithm);
            if (res !== undefined)
                setNatLangPath(res);
            else
                setNatLangPath(["Select a Path"]);
        }

        setPath();
    }, [startLocation, endLocation, searchAlgorithm]);

    const NaturalLangPath:string = natLangPath.join(";\n");

    const qrCodeProps = {
        startNode: startLocation,
        endNode: endLocation,
        algo: searchAlgorithm,

    };


    return (
        <Grid
            container
            direction="row"
            justifyContent="stretch"
            alignItems="stretch"
            height='90vh'
            overflow='hidden'
        >
            <Grid
                item
                xs={3}
            >
                <Box
                  sx={{
                    width: '95%',
                    height: 'calc(90vh - 2.5%)',
                    borderRadius: '2rem',
                    boxShadow: 5,
                    p:2,
                    m:'2.5%',
                    display:'flex',
                    flexDirection:'column',
                    gap:1.5,
                }}
                >
                    <Typography
                        variant="h6"
                        component="h1"
                        align="center"
                    >
                        NAVIGATION MENU
                    </Typography>
                    <Box
                      sx={{
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'nowrap',
                        alignItems:'center',
                        gap:'.25rem'
                      }}
                    >
                      <MyLocationIcon/>
                      <LocationDropdown
                          onChange={(v: string) => {
                              setStartLocation(v);
                          }}
                          value={startLocation}
                          filterTypes={["HALL"]}
                          label={"Start "}
                      />
                    </Box>
                    <Button
                      onClick={()=>{
                        const s = startLocation;
                        const e = endLocation;
                        setStartLocation(e);
                        setEndLocation(s);
                      }}
                      sx={{
                        borderRadius:'100px',
                        height:'2rem',
                      }}
                    >
                      <SwapVertIcon/>
                    </Button>
                  <Box
                    sx={{
                      display:'flex',
                      flexDirection:'row',
                      flexWrap:'nowrap',
                      alignItems:'center',
                      gap:'.25rem'
                    }}
                  >
                    <PinDropOutlinedIcon/>
                    <LocationDropdown
                        onChange={(v: string) => {
                            setEndLocation(v);
                        }}
                        value={endLocation}
                        filterTypes={["HALL"]}
                        label={"End "}
                    />
                  </Box>
                  <Box
                    sx={{
                      display:'flex',
                      flexDirection:'row',
                      flexWrap:'nowrap',
                      alignItems:'center',
                      gap:'.25rem'
                    }}
                  >
                    <RouteOutlinedIcon />
                    <TextField
                        select
                        onChange={(e) => {
                            setSearchAlgorithm(parseInt(e.target.value));
                        }}
                        sx={{
                            width: '100%'
                        }}
                        value={searchAlgorithm}
                        label={"Algorithm "}
                        //helperText={algos[searchAlgorithm].helper}
                    >
                        {
                            algos.map((a, i) => <MenuItem key={a.api} value={i}>{a.title}</MenuItem>)
                        }
                    </TextField>
                  </Box>
                    <Box sx={{
                        height: '100%',
                      width: '100%',
                      backgroundColor: 'white',
                      borderRadius: '0 0 23px 23px',
                      overflowY: 'scroll',
                      display:'flex',
                      flexWrap:'nowrap',
                      flexDirection:'column',
                      gap:'.1rem',
                      borderTop:' 1px solid black',
                      pb:'5rem',
                    }}>

                        {natLangPath.map((d: string, index) => {
                            return (
                                <Typography
                                    key={index}
                                    variant={"subtitle2"}
                                >
                                    {index + 1}. {d}
                                </Typography>
                            );
                        })}
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px'
                    }}>
                        <Button onClick={() => speak(NaturalLangPath)} sx={{
                            backgroundColor: '#012d5a',
                            color: 'white',
                            height: '100%',
                            width: '50%',
                            display: 'flex',
                            alignSelf: 'center',

                            "&:hover": {
                                background: "#1a426a",
                            },
                        }}>
                            Text To Speech
                        </Button>
                        <QRCodePopUp {...qrCodeProps}/>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={9}>
                <MapCanvas
                    defaultFloor={2}
                    pathfinding={algos[searchAlgorithm].api}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    onDeselectEndLocation={() => {
                        setEndLocation("");
                    }}
                />
            </Grid>
        </Grid>
    );
}
