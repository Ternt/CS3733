import {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, TextField, Typography} from "@mui/material";
import {speak} from "../components/TextToSpeech/TextToSpeech.tsx";
import LocationDropdown from "../components/LocationDropdown.tsx";
import MapCanvas from "../components/Map/MapCanvas.tsx";
import NaturalLanguageDirection, {
  directionTypes
} from "../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FLOOR_NAMES} from "../helpers/MapHelper.ts";

import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import StraightIcon from '@mui/icons-material/Straight';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ElevatorOutlinedIcon from '@mui/icons-material/ElevatorOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import Button from "@mui/material/Button";
import QRCodePopUp from "../components/QRCode/QRCodePopUp.tsx";

export function getIconFromDirectionType(t:directionTypes){
  switch(t){
    case directionTypes.STRAIGHT: return <StraightIcon/>;
    case directionTypes.LEFT: return <TurnLeftIcon/>;
    case directionTypes.RIGHT: return <TurnRightIcon/>;
    case directionTypes.START: return <MyLocationIcon/>;
    case directionTypes.END: return <PinDropOutlinedIcon/>;
    case directionTypes.HELP: return <HelpOutlineOutlinedIcon/>;
    case directionTypes.ELEVATOR: return <ElevatorOutlinedIcon/>;
    case directionTypes.STAIRS: return <StairsOutlinedIcon/>;
  }
}

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
    const [natLangPath, setNatLangPath] = useState<{ messages:{a:string, t:directionTypes}[], floor:number }[]>([]);

    useEffect(() => {
        async function setPath() {
            const res = await NaturalLanguageDirection(startLocation, endLocation, searchAlgorithm);
            if (res !== undefined){
              const m: { messages:{a:string, t:directionTypes}[], floor:number }[] = [];
              let cf = -1;
              for(const d of res){
                if(d.floor !== cf){
                  cf = d.floor;
                  m.push({
                    messages:[],
                    floor:cf,
                  });
                }
                m[m.length-1].messages.push({a:d.message, t:d.type});
              }
              setNatLangPath(m);
            }
            else
                setNatLangPath([{messages:[{a:"Select a Path",t:directionTypes.HELP}],floor:-1}]);
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
                        {natLangPath.map((d, index) => {
                          if(d.floor === -1){
                            return(
                              <Box
                                sx={{
                                  width: '100%',
                                  display:'flex',
                                  flexDirection:'row',
                                  flexWrap:'nowrap',
                                  gap: 1
                                }}
                              >
                                {getIconFromDirectionType(directionTypes.HELP)}
                                <Typography
                                  key={"dir-1in"+index}
                                >
                                  Select a start and end location
                                </Typography>
                              </Box>
                            );
                          }
                            return (
                              <Accordion
                                key={"direct"+index}
                                defaultExpanded={index===0}

                              >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography>
                                    {FLOOR_NAMES[d.floor]}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {d.messages.map((m,i)=>{
                                      return(
                                        <Box
                                          sx={{
                                            py:1,
                                            width: '100%',
                                            display:'flex',
                                            flexDirection:'row',
                                            flexWrap:'nowrap',
                                            gap: 1
                                            }}
                                        >
                                        {getIconFromDirectionType(m.t)}
                                        <Typography
                                          key={"dir"+i+"in"+index}
                                        >
                                          {m.a}
                                        </Typography>
                                        </Box>
                                        );
                                    })}
                                </AccordionDetails>
                              </Accordion>
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
