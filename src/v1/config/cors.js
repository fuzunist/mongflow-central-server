const whitelist = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];
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
