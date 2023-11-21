function Availability(app, db) {
  app.post("/CheckAvailability", async (req, res, next) => {
    console.log("inside");
    const pickDate = req.body.pickDate;
    const dropDate = req.body.dropDate;
    const vehicleType = req.body.vehicleType;

    db.query(
      `SELECT v.registration_number, v.model, v.image, v.make, v.rental_rate, v.vehicle_type, ar.end_date 
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
          res.json({
            results: filteredResults,
            totalCount: results[0].totalCount,
          });
        }
      }
    );
  });

  app.post("/allVehicles", async (req, res, next) => {
    db.query(
      `SELECT model, make, image, rental_rate 
        FROM cars`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          // console.log(results);
          res.json({
            results: results,
          });
        }
      }
    );
  });

  app.post("/fetchCount", async (req, res, next) => {
    db.query(
      `SELECT COUNT(*) as vehicle_count
        FROM cars`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          // console.log("here are the count results", results);
          res.json({
            results: results,
          });
        }
      }
    );
  });

  app.post("/fetchTotalVehicleCount", async (req, res, next) => {
    db.query(
      `select sum(rental_count) as total_rental_count from (select rental_count from cars UNION all select rental_count from bikes UNION all select rental_count from scooters) as all_rentals_count`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          // console.log("here are the count results", results);
          res.json({
            results: results,
          });
        }
      }
    );
  });

  app.post("/procedureCall", (req, res, next) => {
    const pickDate = req.body.pickDate;
    const dropDate = req.body.dropDate;
    const registrationNumber = req.body.registrationNumber;
    const rentalRate = req.body.rentalRate;
    const customerId = req.body.customerId;
    const vehicleType = req.body.vehicleType;

    console.log(vehicleType);

    const updateRentalsQuery = `
      CALL updateRentals('${customerId}', '${registrationNumber}', '${pickDate}', ${rentalRate}, '${dropDate}' , '${vehicleType}');
    `;

    db.query(updateRentalsQuery, (err, result) => {
      if (err) {
        console.error("Error executing stored procedure:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }

      res
        .status(200)
        .json({ success: true, message: "Procedure executed successfully." });
    });
  });
}

module.exports = Availability;
