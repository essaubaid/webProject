const { getFileStream } = require("./S3");

const router = require("express").Router();



router.get("/:key", async (req, res) => {

    const key = req.params.key
    if (!(key === "undefined")) {
        const readStream = getFileStream(key)
        readStream.pipe(res)
    }
    else { }

});

module.exports = router