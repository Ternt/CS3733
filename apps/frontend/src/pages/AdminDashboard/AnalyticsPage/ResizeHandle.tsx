import Box from "@mui/material/Box";
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle() {
    return (
        <PanelResizeHandle>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#FF0000',
                    width: '100%',
                    height: '100%',
                    padding: 0
            }}>
                <DragHandleIcon sx={{display: 'flex', flexShrink: 1, alignItems: 'center'}}/>
                {/*<svg viewBox="0 0 24 24">*/}
                {/*    <path*/}
                {/*        fill="currentColor"*/}
                {/*        d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"*/}
                {/*    />*/}
                {/*</svg>*/}
            </Box>
        </PanelResizeHandle>
    );
}
