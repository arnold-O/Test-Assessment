const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config({ path: "./.env" });
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorController");

        // Swagger documentation
        const swaggerUi = require("swagger-ui-express");
        const YAML = require("yamljs");
        const swaggerDocument = YAML.load("./swagger.yaml")

        
        
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/fews", (req, res)=>{
  res.status(200).json({
    message:"we live now"
  })
})

app.get("/flights", async (req, res, next) => {
  const filters = req.query;
  const options = {
    method: "GET",
    url: process.env.MOCK_API,
  };

  const response = await axios.request(options);

  const queryObj = { ...filters};

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`);

  //   const filters = req.query;
  const filteredUsers = response.data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      //   console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });

  if (filteredUsers.length > 0) {
    return res.status(200).json(filteredUsers);
  } else {
    return next(
      new AppError(
        `The ${Object.keys(filters)} field of value ${Object.values(
          filters
        )} is not valid`,
        400
      )
    );
  }
});
app.get("/flights/query", async (req, res, next) => {
  const filters = req.query;
  const options = {
    method: "GET",
    url: process.env.MOCK_API,
  };

  const response = await axios.request(options);

  const queryObj = { ...filters};

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`);

  //   const filters = req.query;
  const filteredUsers = response.data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      //   console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });

  if (filteredUsers.length > 0) {
    return res.status(200).json(filteredUsers);
  } else {
    return next(
      new AppError(
        `The ${Object.keys(filters)} field of value ${Object.values(
          filters
        )} is not valid`,
        400
      )
    );
  }
});

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});


