const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("./model/db");

app.use(cors());
app.use(express.json({ limit: "4.5mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routers/work_management"));
app.use("/api", require("./routers/tpi"));
app.use("/api", require("./routers/tpi_summary"));
app.use("/api", require("./routers/product"));
app.use("/api", require("./routers/wm_target"));
app.use("/api", require("./routers/favourite_tpi"));
app.use("/api", require("./routers/tpi_info"));
app.use("/api", require("./routers/wm_info"));
app.use("/api", require("./routers/EcommerceCategory"));
app.use("/api", require("./routers/ECommerceItem"));
app.use("/api", require("./routers/Expense"));
app.use("/api", require("./routers/PhotoLibrary"));
app.use("/api", require("./routers/OnlineStore"));
app.use("/api", require("./routers/HomeRental"));
app.use("/api", require("./routers/Tpi_Items"));


app.listen(port, (req, res) => {
  console.log("Server connected");
});
