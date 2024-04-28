import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from "@mui/material";
import NaturalLanguageDirection, {
  directionTypes
} from "../../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import Link from "@mui/material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {FLOOR_NAMES} from "../../helpers/MapHelper.ts";
import * as React from "react";

import {getIconFromDirectionType} from "../GetIconFromDirectionType.tsx";
import {speak} from "../../components/TextToSpeech/TextToSpeech.tsx";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "@mui/material/Button";
import MapCanvas from "../../components/Map/MapCanvas.tsx";

export default function PhoneDirectionsPage(){
  const [natLangPath, setNatLangPath] = useState<{
    messages: { a: string, t: directionTypes }[],
    floor: number
  }[]>([]);    const [searchParams] = useSearchParams();
    const startLocation = searchParams.get('startLocation');
    const endLocation = searchParams.get('endLocation');
    const algo = searchParams.get('algo') || 'astar';


    useEffect(() => {
        async function setPath() {
            console.log(startLocation, endLocation);
            if(startLocation === null || endLocation === null) return;
          const res = await NaturalLanguageDirection(startLocation, endLocation, algo);
          if (res !== undefined) {
            const m: { messages: { a: string, t: directionTypes }[], floor: number }[] = [];
            let cf = -1;
            for (const d of res) {
              if (d.floor !== cf) {
                cf = d.floor;
                m.push({
                  messages: [],
                  floor: cf,
                });
              }
              m[m.length - 1].messages.push({a: d.message, t: d.type});
            }
            setNatLangPath(m);
          } else
            setNatLangPath([{messages: [{a: "Select a Path", t: directionTypes.HELP}], floor: -1}]);
        }

        setPath();
    }, [startLocation, endLocation, algo]);

    const [TTS,setTTS] = useState<boolean | null>(null);

    if(startLocation === null || startLocation === '' || endLocation === null || endLocation === ''){
      return (
        <>
          <Typography variant={"h4"}>Oops! That path can't be found...</Typography>
          <Link href={"/map"}>Back to map</Link>
        </>
      );
    }

    const TTSPath = `${natLangPath.reduce<string[]>((acc, obj) => {
        const messageStrings = obj.messages.map((message) => {
            return` ${message.a}`;
        });
        return acc.concat(messageStrings);
    }, []).concat('end').join('\n')}`;

    return (
      <Box sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '0 0 23px 23px',
        overflowY: 'scroll',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        gap: '.1rem',
        borderTop: ' 1px solid black',
        pb: '5rem',
      }}>
        <Box
          sx={{
            aspectRatio:'1/1',
            width:'100vw',
            objectFit:'cover',
            overflow:'clip'
          }}
        >
          <MapCanvas
            defaultFloor={2}
            pathfinding={algo}
            startLocation={startLocation}
            endLocation={endLocation}
            mobile
          />
        </Box>
        <Box
          sx={{
            width:'100vw',
            zIndex:10,
            bgcolor:'white',
          }}
        >
          <Typography variant={"h3"} sx={{textAlign:'center'}}>Directions</Typography>
          {natLangPath.map((d, index) => {
            if (d.floor === -1) {
              return (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: 1
                  }}
                >
                  {getIconFromDirectionType(directionTypes.HELP)}
                  <Typography
                    key={"dir-1in" + index}
                  >
                    Select a start and end location
                  </Typography>
                </Box>
              );
            }
            return (
              <Accordion
                key={"direct" + index}
                defaultExpanded={index === 0}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>
                    {FLOOR_NAMES[d.floor]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {d.messages.map((m, i) => {
                    return (
                      <Box
                        sx={{
                          py: 1,
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          gap: 1
                        }}
                      >
                        {getIconFromDirectionType(m.t)}
                        <Typography
                          key={"dir" + i + "in" + index}
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
        <Typography variant={"h3"} sx={{textAlign:'center'}}>Directions</Typography>
        {natLangPath.map((d, index) => {
          if (d.floor === -1) {
            return (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  gap: 1
                }}
              >
                {getIconFromDirectionType(directionTypes.HELP)}
                <Typography
                  key={"dir-1in" + index}
                >
                  Select a start and end location
                </Typography>
              </Box>
            );
          }
          return (
            <Accordion
              key={"direct" + index}
              defaultExpanded={index === 0}

            >
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                  {FLOOR_NAMES[d.floor]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {d.messages.map((m, i) => {
                  return (
                    <Box
                      sx={{
                        py: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        gap: 1
                      }}
                    >
                      {getIconFromDirectionType(m.t)}
                      <Typography
                        key={"dir" + i + "in" + index}
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
          <Box sx={{
              display:'flex',
              justifyContent: 'center',
              my: '3%',
          }}>
              <Button
                  onClick={() => {
                      console.log(TTSPath);
                      if(TTS == null){
                          speak(TTSPath);
                          setTTS(true);
                      }

                      else if(TTS){
                          speak(TTSPath).pauseSpeech();
                          setTTS(false);
                      }

                      else if(!TTS){
                          speak(TTSPath).resumeSpeech();
                          setTTS(true);
                      }
                  }}
                  sx={{
                      backgroundColor: '#012d5a',
                      color: 'white',
                      height: '100%',
                      width: '20vw',
                      display: 'flex',
                      alignItems: 'center',
                      "&:hover": {
                          background: "#1a426a",
                      },
                  }}
              >
                  {TTS ? <PauseIcon/> : <PlayArrowIcon/>}

                  <Box sx={{display: 'flex', justifyContent: 'center', flex: 1}}>
                      TTS
                  </Box>
              </Button>
          </Box>
      </Box>
    );
};
