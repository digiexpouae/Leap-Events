"use client";
import { useEffect, useRef } from "react";
import { forwardRef } from "react";
const Video = forwardRef((props, videoRef) => {

    return (
        <div className="w-full h-screen">
            <video
                ref={videoRef}
                src="/assets/leap.mp4"
                poster="/assets/leapposter.JPG"
                className="h-full w-full object-cover"
                // autoPlay
                muted
                loop
                playsInline
            />
        </div>
    );
})

export default Video;