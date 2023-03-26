import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect, useState } from 'react'
import Picker from '@emoji-mart/react'

const EmojiPicker = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState()
    const [isShowPicker, setIsShowPicker] = useState(false)

    useEffect(() => {
        setSelectedEmoji(props.icon)
    }, [props.icon])

    const showPicker = () => {
        setIsShowPicker(!isShowPicker)
    }

    const selectEmoji = (e) => {
        const emojiCode = e.unified.split("-")
        let codesArray = []
        emojiCode.forEach((el) => codesArray.push("0x" + el))
        const emoji = String.fromCodePoint(...codesArray)
        console.log(emoji)
        setIsShowPicker(false)
        props.onChange(emoji)
    }

    return (
        <Box sx={{ paddingLeft: "14px" }}>
            <Typography
                variant='h4'
                sx={{ cursor: "pointer" }}
                onClick={showPicker}
            >
                {selectedEmoji}
            </Typography>
            <Box
                sx={{
                    display: isShowPicker ? "block" : "none",
                    position: "absolute",
                    zIndex: "100"
                }}
            >
                <Picker onEmojiSelect={selectEmoji} />
            </Box>
        </Box>
    )
}

export default EmojiPicker