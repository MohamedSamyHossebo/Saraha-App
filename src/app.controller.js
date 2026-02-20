
const bootstrap = async (app, express) => {
    app.use(express.json())
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.all("/*dummy", (req, res) => {
        res.status(404).json({
            status: "fail",
            message: "Route not found",
        });
    });
    
}
export default bootstrap