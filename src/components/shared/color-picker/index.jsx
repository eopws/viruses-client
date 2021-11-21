import React, { useEffect, useRef } from 'react'

import "./color-picker.scss"

const ColorPicker = ({width, height, setColor}) => {
    const colorCanvas   = useRef(null)
    const stretchColor  = useRef(null)
    const pickerCtx     = useRef(null)
    const stretchCtx    = useRef(null)
    const pickerCircle  = useRef({ x: 10, y: 10, width: 7, height: 7 })
    const stretchCircle = useRef({ x: 10, y: 15, width: 7, height: 7 })

    const stretchColorHeight = 30

    const isMouseDownOnPicker  = useRef(false)
    const isMouseDownOnStretch = useRef(false)

    useEffect(() => {
        buildPicker()
        buildStretchColor()
    })

    useEffect(() => {
        if (colorCanvas.current) {
            colorCanvas.current.width  = width
            colorCanvas.current.height = height
        }

        if (stretchColor.current) {
            stretchColor.current.width  = width
            stretchColor.current.height = stretchColorHeight
        }
    }, [width, height])

    useEffect(() => {
        if (colorCanvas.current) {
            pickerCtx.current  = colorCanvas.current.getContext('2d')
        }

        if (stretchColor.current) {
            stretchCtx.current = stretchColor.current.getContext('2d')
        }
    }, [colorCanvas, stretchColor])

    const onPickerMouseDown = (e) => {
        let currentX = e.clientX - colorCanvas.current.offsetLeft;
        let currentY = e.clientY - colorCanvas.current.offsetTop;

        if(currentY > pickerCircle.current.y && currentY < pickerCircle.current.y + pickerCircle.current.width && currentX > pickerCircle.current.x && currentX < pickerCircle.current.x + pickerCircle.current.width) {
            isMouseDownOnPicker.current = true
        } else {
            isMouseDownOnPicker.current = true
            pickerCircle.current.x = currentX
            pickerCircle.current.y = currentY
        }
    }

    const onPickerMouseMove = (e) => {
        if (isMouseDownOnPicker.current && pickerCtx.current) {
            let currentX = e.clientX - colorCanvas.current.getBoundingClientRect().left
            let currentY = e.clientY - colorCanvas.current.getBoundingClientRect().top

            pickerCircle.current.x = currentX
            pickerCircle.current.y = currentY

            setColor(getPickedColor(pickerCtx.current, pickerCircle.current))

            buildPicker()
            buildStretchColor()
        }
    }

    const onPickerMouseUp = () => {
        isMouseDownOnPicker.current = false;
    }

    const onStretchMouseDown = (e) => {
        let currentX = e.clientX - stretchColor.current.offsetLeft;

        if (currentX > stretchCircle.current.x && currentX < stretchCircle.current.x + stretchCircle.current.width) {
            isMouseDownOnStretch.current = true
        } else {
            isMouseDownOnStretch.current = true
            stretchCircle.current.x = currentX
        }
    }

    const onStretchMouseMove = (e) => {
        if (isMouseDownOnStretch.current) {
            let currentX = e.clientX - stretchColor.current.getBoundingClientRect().left;

            stretchCircle.current.x = currentX;

            setColor(getPickedColor(stretchCtx.current, stretchCircle.current));

            buildStretchColor();
        }
    }

    const onStretchMouseUp = () => {
        isMouseDownOnStretch.current = false;
    }

    useEffect(() => {
        if (colorCanvas.current) {
            colorCanvas.current.addEventListener("mousedown", onPickerMouseDown);
            colorCanvas.current.addEventListener("mousemove", onPickerMouseMove);
            document.addEventListener("mouseup", onPickerMouseUp);
        }

        if (stretchColor.current) {
            stretchColor.current.addEventListener("mousedown", onStretchMouseDown);
            stretchColor.current.addEventListener("mousemove", onStretchMouseMove);
            document.addEventListener("mouseup", onStretchMouseUp);
        }
    }, [colorCanvas, stretchColor])

    return (
        <div className="color-picker-container">
            <canvas
                ref={colorCanvas}
                className="color-picker"
            ></canvas>
            <canvas
                ref={stretchColor}
                className="stretch-color"
            ></canvas>
        </div>
    )

    function buildPicker() {
        if (!pickerCtx.current) {
            return
        }

        // alias
        const ctx = pickerCtx.current

        //Create a Gradient Color (colors change on the width)
        let gradient = ctx.createLinearGradient(0, 0, width, 0);

        //Add Color Stops to the Gradient (from 0 to 1)
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");

        //Add color picker colors (red, green, blue, yellow...)
        //Render the Color Gradient from the 0's position to the full width and height
        ctx.fillStyle = gradient; ///, set it's style to be the color gradient
        ctx.fillRect(0, 0, width, height); ///< render it

        //Apply black and white (on the height dimension instead of the width)
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        //We have two colors so 0, 0.5 and 1 needs to be used.
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        //set style and render it.
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        //Circle
        ctx.beginPath();
        //Arc renders a circle depending on the position, radius and arc
        ctx.arc(pickerCircle.current.x, pickerCircle.current.y, pickerCircle.current.width, 0, Math.PI * 2);
        //Render it in black but not fill (only stroke)
        ctx.strokeStyle = "black";
        //Render the circle stroke and close the rendering path
        ctx.stroke();
        ctx.closePath();
    }

    function buildStretchColor() {
        if (!stretchCtx.current || !pickerCtx.current) {
            return
        }

        const ctx = stretchCtx.current

        const gradient = ctx.createLinearGradient(0, 0, width, stretchColorHeight);

        let gradientTo = 'rgba(';

        const currentColor = getPickedColor(pickerCtx.current, pickerCircle.current)

        gradientTo += currentColor.r + ', ';
        gradientTo += currentColor.g + ', ';
        gradientTo += currentColor.b + ')';

        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(1, gradientTo);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, stretchColorHeight);

        //Circle
        ctx.beginPath();
        //Arc renders a circle depending on the position, radius and arc
        ctx.arc(stretchCircle.current.x, stretchColorHeight / 2, stretchCircle.current.width, 0, Math.PI * 2);
        //Render it in black but not fill (only stroke)
        ctx.strokeStyle = "black";
        //Render the circle stroke and close the rendering path
        ctx.stroke();
        ctx.closePath();
    }

    function getPickedColor(ctx, circle) {
        try {
            let imageData = ctx.getImageData(circle.x, circle.y, 1, 1)
            return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] }
        } catch (e) {
            return { r: 0, g: 0, b: 0 }
        }
    }
}

export default ColorPicker
