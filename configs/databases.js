const Sequelize = require("sequelize");
const config = require("./app");

const sequelizePST = new Sequelize(
  config.pstDB,
  config.pstDBUser,
  config.pstDBPassword,
  {
    host: config.pstDBHost,
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
    },
  }
);

const sequelizeIU = new Sequelize(
  config.pstIU_A,
  config.pstIUUser,
  config.pstIUPassword,
  {
    host: config.pstIUDBHost,
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
    },
  }
);

async function checkDatabaseConnection() {
  try {
    const databases = [
      { sequelize: sequelizePST, name: "PST Database", host: config.pstDBHost },
      // { sequelize: sequelizeIU, name: "IU Database", host: config.pstIUDBHost },
    ];

    const results = await Promise.all(
      databases.map(async (db) => {
        try {
          await db.sequelize.authenticate();
          return {
            connect: db.host,
            status: "success",
            message: "Database connected successfully.",
          };
        } catch (error) {
          return {
            connect: db.host,
            status: "error",
            message: "Database connection failed.",
            error: error.message,
          };
        }
      })
    );

    return results;


  } catch (error) {
    return {
      connect: "Failed",
      status: "error",
      message: "Database connection failed.",
      error: error.message,
    };
  }
}

async function checkDatabaseLock() {
  try {
    await sequelizePST.authenticate();

    const [result] = await sequelizePST.query("EXEC sp_who2");
    const lockedProcesses = result.filter((row) => row.BlkBy.trim() !== ".");

    // const lockedProcesses = [
    //   {
    //     SPID: "123",
    //     Status: "SUSPENDED",
    //     BlkBy: "55",
    //     DBName: "Fund",
    //     Command: "INSERT INTO     ",
    //   },
    //   {
    //     SPID: "124",
    //     Status: "SUSPENDED",
    //     BlkBy: "55",
    //     DBName: "UTPrice",
    //     Command: "SELECT INTO     ",
    //   },
    //   {
    //     SPID: "127",
    //     Status: "sleeping                      ",
    //     BlkBy: "  .",
    //     DBName: "TestDB",
    //     Command: "DELETE",
    //   },
    // ];

    const processedData = lockedProcesses.map((row) => ({
      ...row,
      Command: row.Command.trim(),
      Status: row.Status.trim(),
    }));

    const blockedProcesses = processedData.filter(
      (row) => row.BlkBy.trim() !== "."
    );
    const countLocked = blockedProcesses.length;

    if (countLocked > 0) {
      return {
        status: "Lock",
        message: "locked processes. (DATABASE)",
        DataCount: countLocked,
        data: blockedProcesses,
      };
    } else {
      return {
        status: "No Lock",
        message: "No locked processes. (DATABASE)",
        DataCount: countLocked,
        data: blockedProcesses,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "Failed to check locked processes.",
      error: error.message,
    };
  }
}

module.exports = { sequelizePST, checkDatabaseConnection, checkDatabaseLock };
