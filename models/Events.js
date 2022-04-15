const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const EventSchema = new mongoose.Schema({

    event_title: { type: String, require: true },
    event_subtext: { type: String, require: true },
    event_image_thumb: { type: String, require: true },
    event_image_banner: { type: String, require: true },
    event_dates: { type: String, require: true },
    event_category: { type: String, require: true },
    event_detail_text: { type: String, require: true },
    event_fee: { type: String, require: true },
    event_apply_now_url: { type: String, require: true },
},
    { timestamps: true }
);

module.exports = mongoose.model("Events", EventSchema);