import 'dotenv/config';

import { eventsQueue } from '@traqory/queue';

async function main() {
  await eventsQueue.obliterate({
    force: true,
  });

  console.log(
    'Queue cleared',
  );

  process.exit(0);
}

main().catch(console.error);