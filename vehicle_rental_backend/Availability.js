function Availability(app, db) {
  app.post("/CheckAvailability", async (req, res, next) => {
    console.log("inside");
    const pickDate = req.body.pickDate;
    const dropDate = req.body.dropDate;
    const vehicleType = req.body.vehicleType;

    db.query(
      `SELECT v.registration_number, v.model, ar.end_date 
        FROM ${vehicleType} AS v 
        LEFT OUTER JOIN active_rentals AS ar ON v.registration_number = ar.registration_number`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log(results);
          var db_endDate;
          var db_pickDate;

          // Filter results where model is "GLS"
          const filteredResults = results.filter((result) => {
            db_pickDate = new Date(pickDate);
            db_endDate = new Date(result.end_date);
            // console.log("inside debug moment");
            // console.log(db_pickDate);
            // console.log(result.end_date);
            // console.log(db_pickDate.getDate() - db_endDate.getDate());
            return !db_endDate || db_pickDate > db_endDate;
          });

          // Send response
          res.json(filteredResults);
        }
      }
    );
  });
}

module.exports = Availability;
