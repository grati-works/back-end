import { logger } from '@utils/logger';
import { app } from './app';

const { PORT } = process.env;

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}!`));
