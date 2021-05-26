import {style} from 'typestyle';

export const busRow = style({
    display: "flex",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
})

export const busHeader = style({
    display: "flex",
    borderBottom: "1px solid rgba(255,255,255,0.7)",
    $nest: {
        "&>div":{
            $nest: {
                "&>p":{
                    fontWeight: 800
                }
            }
        }
    }
})