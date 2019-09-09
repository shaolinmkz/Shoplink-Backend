import app from './api/v1';

const { log } = console;

// Set Port
const port = process.env.PORT;

app.listen(port, () => log(`🔌 Connected on port ${port}`));

export default app;
