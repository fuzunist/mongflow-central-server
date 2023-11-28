const whitelist = ["http://localhost:5173", "https://www.mongflow.com/"];
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE,PUT',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;
