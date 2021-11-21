import React, { useEffect, useState } from "react"

import { setPlayerAvatar } from "@api/ipc-api"
import "./file-uploader.scss"

const FileUploader = ({fileName, mimeType}) => {
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (file) {
            setPlayerAvatar(file.path)
        }
    }, [file])

    return (
        <>
            <label className="file-uploader-label">
                upload
                <input
                    className="file-uploader"
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept={mimeType}
                />
            </label>
        </>
    )
}

export default FileUploader
