const whitelist = ["https://www.mongflow.com/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: 'GET,PATCH,POST,DELETE,PUT',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;
