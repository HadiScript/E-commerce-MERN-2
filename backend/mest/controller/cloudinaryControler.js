import cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name: 'dn8eat7qp',
    api_key: '373842539682416',
    api_secret: 'fpSKVj04tZYQlxw0AAtN0SU2ObY',
});




const Uploads = async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: "auto", // jpeg, png
        });
        res.json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } catch (error) {
        res.json(error)
    }
};

const Removes = (req, res) => {
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.send("ok");
    });
};

export {
    Uploads,
    Removes
}