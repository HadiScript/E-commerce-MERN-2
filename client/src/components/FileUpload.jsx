import { Avatar, Badge } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import Resizer from "react-image-file-resizer";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";






const FileUpload = ({ values, setValues, setUploading }) => {

    const [im, setIm] = useState('')
    const user = useSelector(s => s.user)
    const [sizeOk, setSizeOk] = useState(false);
    const [isShow, setisShow] = useState(false);
    const [isShow2, setisShow2] = useState(true);

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if (files) {
            setUploading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {

                        axios
                            .post(
                                `${process.env.REACT_APP_API}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("IMAGE UPLOAD RES DATA", res);
                                setUploading(false);
                                allUploadedFiles.push(res.data);

                                setValues({ ...values, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                setUploading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                                toast.error(`${err.message}`)
                                setSizeOk(true);
                                setisShow(true);
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleRemove = public_id => {
        setUploading(true)
        axios.put(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : ''
            }
        })
            .then(res => {
                setUploading(false)
                const { images } = values;
                let filteredImages = images.filter(x => x.public_id !== public_id);
                setValues({ ...values, images: filteredImages })
            })
            .catch(err => {
                setUploading(false);
                console.log(err);

            })
    }



    return (
        <>
            <div className="row py-3">
                {sizeOk && isShow && <Alert onClose={() => setisShow(false)} dismissible> Image size is to large  </Alert>}
                {
                    values.images && values.images.map(x => <Badge style={{ cursor: 'pointer' }} count="X" key={x.public_id} onClick={() => handleRemove(x.public_id)} >
                        <Avatar
                            className='ml-3'
                            key={x.public_id}
                            src={x.url}
                            shape="square"
                            size={60}
                        />
                    </Badge>)
                }
            </div>
            <div className="row">
                {isShow2 ? <Alert onClose={() => setisShow2(false)} dismissible> Dimension of images must be under 300x400 </Alert> : null}
                <label className='btn btn-primary btn-raised' >
                    Upload Images
                    <input hidden type="file" accept="images/*" multiple onChange={fileUploadAndResize} />
                </label>
            </div>
        </>
    )
}

export default FileUpload