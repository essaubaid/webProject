const { getFileStream } = require("./S3");

const router = require("express").Router();



router.get("/:key", async (req, res) => {

    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
});

module.exports = router