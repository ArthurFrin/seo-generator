import express from "express";
import cors from "cors";
import schemaRoutes from "./routes/schema.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schemaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
